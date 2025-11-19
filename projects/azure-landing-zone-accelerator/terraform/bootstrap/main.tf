# Bootstrap Terraform State Management
# This creates the backend storage for Terraform state files

terraform {
  required_version = ">= 1.5.0"
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~> 2.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {
    key_vault {
      purge_soft_delete_on_destroy = false
    }
    resource_group {
      prevent_deletion_if_contains_resources = false
    }
  }
}

# Random string for unique naming
resource "random_string" "suffix" {
  length  = 6
  special = false
  upper   = false
}

# Resource Group for Terraform state
resource "azurerm_resource_group" "tfstate" {
  name     = "rg-tfstate-${var.location}-${var.environment}"
  location = var.location

  tags = merge(var.default_tags, {
    Purpose = "Terraform State Management"
  })
}

# Storage Account for Terraform state
resource "azurerm_storage_account" "tfstate" {
  name                     = "sttfstate${random_string.suffix.result}"
  resource_group_name      = azurerm_resource_group.tfstate.name
  location                = azurerm_resource_group.tfstate.location
  account_tier            = "Standard"
  account_replication_type = "GRS"
  min_tls_version         = "TLS1_2"

  blob_properties {
    versioning_enabled = true

    delete_retention_policy {
      days = 30
    }
    container_delete_retention_policy {
      days = 30
    }
  }

  network_rules {
    default_action = "Deny"
    bypass         = ["AzureServices"]
  }

  tags = merge(var.default_tags, {
    Purpose = "Terraform State Storage"
  })
}

# Storage Container for state files
resource "azurerm_storage_container" "tfstate" {
  name                  = "tfstate"
  storage_account_name  = azurerm_storage_account.tfstate.name
  container_access_type = "private"
}

# Key Vault for secrets
resource "azurerm_key_vault" "tfstate" {
  name                       = "kv-tfstate-${random_string.suffix.result}"
  location                   = azurerm_resource_group.tfstate.location
  resource_group_name        = azurerm_resource_group.tfstate.name
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  sku_name                   = "standard"
  soft_delete_retention_days = 90
  purge_protection_enabled   = true

  network_acls {
    default_action = "Deny"
    bypass         = "AzureServices"
  }

  tags = merge(var.default_tags, {
    Purpose = "Terraform Secrets"
  })
}

# Current Azure context
data "azurerm_client_config" "current" {}

# Grant Key Vault access to current user
resource "azurerm_key_vault_access_policy" "current_user" {
  key_vault_id = azurerm_key_vault.tfstate.id
  tenant_id    = data.azurerm_client_config.current.tenant_id
  object_id    = data.azurerm_client_config.current.object_id

  secret_permissions = [
    "Get", "List", "Set", "Delete", "Purge", "Recover"
  ]

  certificate_permissions = [
    "Get", "List", "Create", "Import", "Delete", "Purge", "Recover"
  ]

  key_permissions = [
    "Get", "List", "Create", "Delete", "Purge", "Recover"
  ]
}

# Log Analytics Workspace for audit logs
resource "azurerm_log_analytics_workspace" "tfstate" {
  name                = "log-tfstate-${var.location}-${var.environment}"
  location            = azurerm_resource_group.tfstate.location
  resource_group_name = azurerm_resource_group.tfstate.name
  sku                 = "PerGB2018"
  retention_in_days   = 90

  tags = merge(var.default_tags, {
    Purpose = "Terraform State Audit Logs"
  })
}

# Diagnostic settings for storage account
resource "azurerm_monitor_diagnostic_setting" "storage" {
  name                       = "diag-storage-tfstate"
  target_resource_id         = azurerm_storage_account.tfstate.id
  log_analytics_workspace_id = azurerm_log_analytics_workspace.tfstate.id

  enabled_log {
    category = "StorageRead"
  }
  enabled_log {
    category = "StorageWrite"
  }
  enabled_log {
    category = "StorageDelete"
  }

  metric {
    category = "Transaction"
    enabled  = true
  }
}
