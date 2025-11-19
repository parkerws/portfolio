variable "root_name" {
  description = "Display name for the root management group"
  type        = string
}

variable "root_id" {
  description = "ID for the root management group"
  type        = string
}

variable "enable_sandbox" {
  description = "Enable sandbox management group for dev/test"
  type        = bool
  default     = true
}

variable "enable_decommissioned" {
  description = "Enable decommissioned management group"
  type        = bool
  default     = true
}

variable "management_subscription_ids" {
  description = "List of subscription IDs for management scope"
  type        = list(string)
  default     = []
}

variable "connectivity_subscription_ids" {
  description = "List of subscription IDs for connectivity scope"
  type        = list(string)
  default     = []
}

variable "identity_subscription_ids" {
  description = "List of subscription IDs for identity scope"
  type        = list(string)
  default     = []
}

variable "corp_subscription_ids" {
  description = "List of subscription IDs for corp landing zones"
  type        = list(string)
  default     = []
}

variable "online_subscription_ids" {
  description = "List of subscription IDs for online landing zones"
  type        = list(string)
  default     = []
}
