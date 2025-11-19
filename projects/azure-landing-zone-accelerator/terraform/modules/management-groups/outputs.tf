output "root_mg_id" {
  description = "ID of the root management group"
  value       = azurerm_management_group.root.id
}

output "platform_mg_id" {
  description = "ID of the platform management group"
  value       = azurerm_management_group.platform.id
}

output "management_mg_id" {
  description = "ID of the management management group"
  value       = azurerm_management_group.management.id
}

output "connectivity_mg_id" {
  description = "ID of the connectivity management group"
  value       = azurerm_management_group.connectivity.id
}

output "identity_mg_id" {
  description = "ID of the identity management group"
  value       = azurerm_management_group.identity.id
}

output "landing_zones_mg_id" {
  description = "ID of the landing zones management group"
  value       = azurerm_management_group.landing_zones.id
}

output "corp_mg_id" {
  description = "ID of the corp management group"
  value       = azurerm_management_group.corp.id
}

output "online_mg_id" {
  description = "ID of the online management group"
  value       = azurerm_management_group.online.id
}

output "all_management_groups" {
  description = "Map of all management group IDs"
  value = {
    root          = azurerm_management_group.root.id
    platform      = azurerm_management_group.platform.id
    management    = azurerm_management_group.management.id
    connectivity  = azurerm_management_group.connectivity.id
    identity      = azurerm_management_group.identity.id
    landing_zones = azurerm_management_group.landing_zones.id
    corp          = azurerm_management_group.corp.id
    online        = azurerm_management_group.online.id
  }
}
