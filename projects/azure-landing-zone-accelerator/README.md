# Azure Landing Zone Accelerator

Enterprise-Scale Azure Landing Zone built with Terraform, following Microsoft Cloud Adoption Framework (CAF) best practices.

## Overview

This accelerator deploys a production-ready Azure Enterprise-Scale Landing Zone with hub-and-spoke network topology, governance policies, security controls, and identity management.

## Architecture

```
├── Management Group Hierarchy
│   ├── Root
│   │   ├── Platform
│   │   │   ├── Management
│   │   │   ├── Connectivity
│   │   │   └── Identity
│   │   └── Landing Zones
│   │       ├── Corp
│   │       └── Online
```

## Features

### Network Architecture
- ✅ Hub-and-spoke topology with Azure Virtual WAN option
- ✅ Azure Firewall with threat intelligence
- ✅ Network Security Groups with baseline rules
- ✅ DDoS Protection Standard
- ✅ Private DNS zones for Azure services
- ✅ ExpressRoute/VPN Gateway integration

### Security & Governance
- ✅ Azure Policy assignments (CIS, NIST, PCI-DSS)
- ✅ Azure Security Center/Defender for Cloud
- ✅ Centralized logging to Log Analytics
- ✅ Azure Sentinel integration ready
- ✅ Key Vault for secrets management
- ✅ Managed Identities for Azure resources

### Identity & Access
- ✅ Azure AD integration
- ✅ Role-Based Access Control (RBAC)
- ✅ Privileged Identity Management (PIM) ready
- ✅ Conditional Access policies
- ✅ Service Principal automation

### Cost Management
- ✅ Budget alerts and notifications
- ✅ Resource tagging enforcement
- ✅ Cost allocation by environment
- ✅ Azure Advisor integration

## Prerequisites

- Azure Subscription with Owner access
- Terraform >= 1.5.0
- Azure CLI >= 2.50.0
- Service Principal with appropriate permissions

## Quick Start

```bash
# Clone the repository
git clone https://github.com/parkerws/azure-landing-zone-accelerator.git
cd azure-landing-zone-accelerator

# Login to Azure
az login

# Initialize Terraform
cd terraform/bootstrap
terraform init

# Plan the deployment
terraform plan -out=tfplan

# Apply the configuration
terraform apply tfplan
```

## Project Structure

```
azure-landing-zone-accelerator/
├── terraform/
│   ├── bootstrap/              # Initial setup and state management
│   ├── modules/
│   │   ├── management-groups/  # Management group hierarchy
│   │   ├── networking/         # Hub and spoke networks
│   │   ├── policies/           # Azure Policy definitions
│   │   ├── security/           # Security Center and Defender
│   │   ├── logging/            # Log Analytics and monitoring
│   │   ├── identity/           # Azure AD and RBAC
│   │   └── governance/         # Budgets, tags, and compliance
│   ├── environments/
│   │   ├── dev/                # Development environment
│   │   ├── staging/            # Staging environment
│   │   └── prod/               # Production environment
│   └── examples/               # Usage examples
├── policies/                   # Custom Azure Policy definitions
├── scripts/                    # Automation scripts
├── docs/                       # Architecture documentation
└── .github/workflows/          # CI/CD pipelines
```

## Configuration

### Environment Variables

```bash
export ARM_SUBSCRIPTION_ID="your-subscription-id"
export ARM_TENANT_ID="your-tenant-id"
export ARM_CLIENT_ID="your-client-id"
export ARM_CLIENT_SECRET="your-client-secret"
```

### Terraform Variables

Create a `terraform.tfvars` file:

```hcl
# Organization Configuration
organization_name = "contoso"
environment       = "prod"
location          = "eastus"
location_short    = "eus"

# Network Configuration
hub_vnet_address_space    = ["10.0.0.0/16"]
firewall_subnet_prefix    = "10.0.0.0/26"
gateway_subnet_prefix     = "10.0.1.0/27"
bastion_subnet_prefix     = "10.0.2.0/27"

# Spoke Networks
spoke_vnets = {
  corp = {
    address_space = ["10.1.0.0/16"]
    subnets = {
      web = "10.1.0.0/24"
      app = "10.1.1.0/24"
      data = "10.1.2.0/24"
    }
  }
  online = {
    address_space = ["10.2.0.0/16"]
    subnets = {
      aks = "10.2.0.0/23"
      apim = "10.2.2.0/24"
    }
  }
}

# Security Configuration
enable_ddos_protection  = true
enable_azure_firewall   = true
enable_bastion          = true
enable_defender         = true

# Tags
default_tags = {
  Environment   = "Production"
  ManagedBy     = "Terraform"
  CostCenter    = "IT"
  Classification = "Internal"
}
```

## Modules

### Management Groups Module

```hcl
module "management_groups" {
  source = "./modules/management-groups"

  root_name        = var.organization_name
  root_id          = var.organization_name
  subscription_ids = var.subscription_ids
}
```

### Hub Network Module

```hcl
module "hub_network" {
  source = "./modules/networking/hub"

  resource_group_name    = azurerm_resource_group.connectivity.name
  location              = var.location
  vnet_address_space    = var.hub_vnet_address_space
  firewall_subnet_prefix = var.firewall_subnet_prefix
  enable_azure_firewall  = var.enable_azure_firewall
  enable_bastion        = var.enable_bastion
  tags                  = var.default_tags
}
```

### Policy Assignment Module

```hcl
module "policy_assignments" {
  source = "./modules/policies"

  management_group_id = module.management_groups.corp_mg_id

  policies = {
    cis_benchmark     = true
    nist_800_53       = true
    pci_dss_3_2_1     = false
    require_tags      = true
    allowed_locations = ["eastus", "westus"]
  }
}
```

## Deployment Steps

### 1. Bootstrap State Management

```bash
cd terraform/bootstrap
terraform init
terraform apply
```

This creates:
- Storage account for Terraform state
- Container for state files
- Service Principal for automation
- Key Vault for secrets

### 2. Deploy Management Groups

```bash
cd terraform/environments/prod
terraform init \
  -backend-config="storage_account_name=<storage_account>" \
  -backend-config="container_name=tfstate" \
  -backend-config="key=management-groups.tfstate"

terraform apply -target=module.management_groups
```

### 3. Deploy Hub Network

```bash
terraform apply -target=module.hub_network
```

### 4. Deploy Spoke Networks

```bash
terraform apply -target=module.spoke_networks
```

### 5. Apply Policies and Governance

```bash
terraform apply -target=module.policies
terraform apply -target=module.governance
```

### 6. Configure Security

```bash
terraform apply -target=module.security_center
terraform apply -target=module.logging
```

## Compliance Frameworks

Included Azure Policy initiatives:

- ✅ **CIS Microsoft Azure Foundations Benchmark v1.4.0**
- ✅ **NIST SP 800-53 Rev. 5**
- ✅ **PCI DSS 3.2.1**
- ✅ **ISO 27001:2013**
- ✅ **HIPAA HITRUST 9.2**
- ✅ **Azure Security Benchmark**

## Monitoring & Logging

### Log Analytics Workspace

All logs centralized to Log Analytics:
- Activity Logs
- Resource Logs
- Security Logs
- Network Flow Logs
- Firewall Logs

### Dashboards

Pre-built Azure Monitor dashboards:
- Security Overview
- Network Traffic
- Cost Analysis
- Compliance Status

### Alerts

Pre-configured alerts for:
- Budget thresholds exceeded
- Security Center recommendations
- Network anomalies
- Policy violations
- Resource health issues

## Cost Optimization

### Budget Configuration

```hcl
module "budgets" {
  source = "./modules/governance/budgets"

  budgets = {
    monthly = {
      amount    = 10000
      time_grain = "Monthly"
      notifications = {
        forecast_80  = { threshold = 80, operator = "GreaterThan" }
        actual_90    = { threshold = 90, operator = "GreaterThan" }
        actual_100   = { threshold = 100, operator = "GreaterThan" }
      }
    }
  }

  contact_emails = ["cloud-team@example.com"]
}
```

### Tagging Strategy

Required tags enforced by policy:
- `Environment` (dev, staging, prod)
- `CostCenter` (IT, Engineering, Marketing)
- `Owner` (team or individual)
- `Application` (app name)

## Security Best Practices

### Network Security

- ✅ All internet traffic routed through Azure Firewall
- ✅ Network Security Groups on all subnets
- ✅ DDoS Protection enabled
- ✅ Private endpoints for PaaS services
- ✅ No public IP addresses in spoke networks

### Identity Security

- ✅ Managed Identities for all Azure resources
- ✅ No service principal credentials in code
- ✅ Secrets stored in Key Vault
- ✅ RBAC with least privilege
- ✅ PIM for privileged roles

### Data Security

- ✅ Encryption at rest (Azure Storage Service Encryption)
- ✅ Encryption in transit (TLS 1.2+)
- ✅ Private DNS for Azure services
- ✅ No public storage account access
- ✅ Soft delete enabled

## CI/CD Pipeline

GitHub Actions workflow for automated deployment:

```yaml
name: Deploy Landing Zone

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2

      - name: Terraform Init
        run: terraform init

      - name: Terraform Plan
        run: terraform plan -out=tfplan

      - name: Terraform Apply
        if: github.ref == 'refs/heads/main'
        run: terraform apply -auto-approve tfplan
```

## Disaster Recovery

### Backup Strategy

- Azure Backup for VMs
- Geo-redundant storage for state files
- Cross-region replication for critical data
- Regular restore testing

### High Availability

- Multiple availability zones
- Cross-region failover ready
- Load balancers for redundancy
- Auto-scaling configured

## Troubleshooting

### Common Issues

**Issue: State lock error**
```bash
# Release state lock
terraform force-unlock <lock-id>
```

**Issue: Policy assignment failures**
```bash
# Check policy compliance
az policy state list --resource <resource-id>
```

**Issue: Network connectivity**
```bash
# Check effective routes
az network nic show-effective-route-table \
  --resource-group <rg> --name <nic-name>
```

## Testing

```bash
# Run Terraform validation
terraform validate

# Run security scan
checkov -d terraform/

# Run compliance check
terraform-compliance -p tfplan
```

## Roadmap

- [ ] Azure Virtual WAN option
- [ ] Multi-region deployment
- [ ] Terraform Cloud integration
- [ ] Automated compliance reporting
- [ ] Self-service portal integration

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT License - See LICENSE file

## Resources

- [Azure Cloud Adoption Framework](https://docs.microsoft.com/azure/cloud-adoption-framework/)
- [Azure Enterprise-Scale](https://github.com/Azure/Enterprise-Scale)
- [Terraform Azure Provider](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs)

## Author

**Will Parker**
- LinkedIn: [parkerws](https://linkedin.com/in/parkerws)
- GitHub: [@parkerws](https://github.com/parkerws)
- Website: [willparker.dev](https://willparker.dev)

---

⭐ Star this repository if you find it helpful!
