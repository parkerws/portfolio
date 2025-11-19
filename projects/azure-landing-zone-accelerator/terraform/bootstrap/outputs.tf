output "storage_account_name" {
  description = "Name of the storage account for Terraform state"
  value       = azurerm_storage_account.tfstate.name
}

output "container_name" {
  description = "Name of the storage container for Terraform state"
  value       = azurerm_storage_container.tfstate.name
}

output "resource_group_name" {
  description = "Name of the resource group containing Terraform state resources"
  value       = azurerm_resource_group.tfstate.name
}

output "key_vault_name" {
  description = "Name of the Key Vault for secrets"
  value       = azurerm_key_vault.tfstate.name
}

output "key_vault_id" {
  description = "ID of the Key Vault"
  value       = azurerm_key_vault.tfstate.id
}

output "log_analytics_workspace_id" {
  description = "ID of the Log Analytics workspace"
  value       = azurerm_log_analytics_workspace.tfstate.id
}

output "backend_config" {
  description = "Backend configuration for use in other Terraform configurations"
  value = {
    storage_account_name = azurerm_storage_account.tfstate.name
    container_name       = azurerm_storage_container.tfstate.name
    resource_group_name  = azurerm_resource_group.tfstate.name
  }
}
