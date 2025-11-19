# Management Group Hierarchy for Azure Enterprise-Scale Landing Zone

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

# Root Management Group
resource "azurerm_management_group" "root" {
  display_name = var.root_name
  name         = var.root_id
}

# Platform Management Group
resource "azurerm_management_group" "platform" {
  display_name               = "${var.root_name}-Platform"
  name                       = "${var.root_id}-platform"
  parent_management_group_id = azurerm_management_group.root.id
}

# Management Subscription Scope
resource "azurerm_management_group" "management" {
  display_name               = "${var.root_name}-Management"
  name                       = "${var.root_id}-management"
  parent_management_group_id = azurerm_management_group.platform.id
}

# Connectivity Subscription Scope
resource "azurerm_management_group" "connectivity" {
  display_name               = "${var.root_name}-Connectivity"
  name                       = "${var.root_id}-connectivity"
  parent_management_group_id = azurerm_management_group.platform.id
}

# Identity Subscription Scope
resource "azurerm_management_group" "identity" {
  display_name               = "${var.root_name}-Identity"
  name                       = "${var.root_id}-identity"
  parent_management_group_id = azurerm_management_group.platform.id
}

# Landing Zones Management Group
resource "azurerm_management_group" "landing_zones" {
  display_name               = "${var.root_name}-LandingZones"
  name                       = "${var.root_id}-landingzones"
  parent_management_group_id = azurerm_management_group.root.id
}

# Corp Landing Zones (Internal workloads)
resource "azurerm_management_group" "corp" {
  display_name               = "${var.root_name}-Corp"
  name                       = "${var.root_id}-corp"
  parent_management_group_id = azurerm_management_group.landing_zones.id
}

# Online Landing Zones (Internet-facing workloads)
resource "azurerm_management_group" "online" {
  display_name               = "${var.root_name}-Online"
  name                       = "${var.root_id}-online"
  parent_management_group_id = azurerm_management_group.landing_zones.id
}

# Sandbox Management Group (Development/Testing)
resource "azurerm_management_group" "sandbox" {
  count                      = var.enable_sandbox ? 1 : 0
  display_name               = "${var.root_name}-Sandbox"
  name                       = "${var.root_id}-sandbox"
  parent_management_group_id = azurerm_management_group.root.id
}

# Decommissioned Management Group
resource "azurerm_management_group" "decommissioned" {
  count                      = var.enable_decommissioned ? 1 : 0
  display_name               = "${var.root_name}-Decommissioned"
  name                       = "${var.root_id}-decommissioned"
  parent_management_group_id = azurerm_management_group.root.id
}

# Subscription associations
resource "azurerm_management_group_subscription_association" "management" {
  for_each            = toset(var.management_subscription_ids)
  management_group_id = azurerm_management_group.management.id
  subscription_id     = "/subscriptions/${each.value}"
}

resource "azurerm_management_group_subscription_association" "connectivity" {
  for_each            = toset(var.connectivity_subscription_ids)
  management_group_id = azurerm_management_group.connectivity.id
  subscription_id     = "/subscriptions/${each.value}"
}

resource "azurerm_management_group_subscription_association" "identity" {
  for_each            = toset(var.identity_subscription_ids)
  management_group_id = azurerm_management_group.identity.id
  subscription_id     = "/subscriptions/${each.value}"
}

resource "azurerm_management_group_subscription_association" "corp" {
  for_each            = toset(var.corp_subscription_ids)
  management_group_id = azurerm_management_group.corp.id
  subscription_id     = "/subscriptions/${each.value}"
}

resource "azurerm_management_group_subscription_association" "online" {
  for_each            = toset(var.online_subscription_ids)
  management_group_id = azurerm_management_group.online.id
  subscription_id     = "/subscriptions/${each.value}"
}
