# Azure Naming Convention Generator

Web-based tool for generating Azure resource names following Microsoft Cloud Adoption Framework (CAF) best practices and custom organizational standards.

## Overview

Ensure consistent, compliant Azure resource naming across your organization with an intuitive web interface that generates names following CAF guidelines.

## Live Demo

**🌐 [Try it now](https://willparker.dev/naming-generator)**

## Features

- ✅ **Microsoft CAF Compliance**: Follows Azure CAF naming conventions
- ✅ **100+ Resource Types**: Support for all Azure services
- ✅ **Custom Rules**: Define organization-specific naming patterns
- ✅ **Bulk Generation**: Generate multiple names at once
- ✅ **Export Options**: JSON, Terraform variables, PowerShell, CLI
- ✅ **Validation**: Real-time name validation and conflict checking
- ✅ **Team Presets**: Save and share naming conventions
- ✅ **Dark Mode**: Modern, accessible UI

## Quick Start

```bash
# Run locally
git clone https://github.com/parkerws/azure-naming-generator.git
cd azure-naming-generator
npm install
npm run dev
```

Visit `http://localhost:3000`

## Usage

### Web Interface

1. **Select Resource Type** (e.g., Virtual Machine, Storage Account)
2. **Enter Details**:
   - Environment (dev, staging, prod)
   - Region (eastus, westus, etc.)
   - Application/Project name
   - Instance number
3. **Generate Name**: Click "Generate"
4. **Copy or Export**: Use generated name in your deployment

### Example Outputs

```plaintext
Resource: Virtual Machine
Environment: prod
Region: eastus
App: webserver
Instance: 01

Generated Name: vm-webserver-prod-eus-01
✅ Valid (15 characters, alphanumeric + hyphens)

Resource: Storage Account
Environment: prod
Region: eastus
App: data
Purpose: logs

Generated Name: stdatalogsprodeus001
✅ Valid (24 characters, lowercase alphanumeric)
```

## Naming Convention Format

### Default Pattern

```
{resource-type}-{app-name}-{environment}-{region}-{instance}
```

### Examples by Resource Type

| Resource Type | Pattern | Example |
|--------------|---------|---------|
| Resource Group | `rg-{app}-{env}-{region}` | `rg-webapp-prod-eus` |
| Virtual Machine | `vm-{app}-{env}-{region}-{instance}` | `vm-webserver-prod-eus-01` |
| Storage Account | `st{app}{purpose}{env}{region}{instance}` | `stweblogsprodeus001` |
| Key Vault | `kv-{app}-{env}-{region}` | `kv-secrets-prod-eus` |
| AKS Cluster | `aks-{app}-{env}-{region}` | `aks-platform-prod-eus` |
| App Service | `app-{app}-{env}-{region}` | `app-webapp-prod-eus` |
| Function App | `func-{app}-{env}-{region}` | `func-processor-prod-eus` |
| SQL Database | `sql-{app}-{env}-{region}` | `sql-customers-prod-eus` |
| Cosmos DB | `cosmos-{app}-{env}-{region}` | `cosmos-catalog-prod-eus` |
| Virtual Network | `vnet-{purpose}-{env}-{region}` | `vnet-hub-prod-eus` |

## API Usage

```javascript
// JavaScript/TypeScript
import { AzureNamingGenerator } from 'azure-naming-generator';

const generator = new AzureNamingGenerator();

const name = generator.generate({
  resourceType: 'virtualMachine',
  environment: 'prod',
  region: 'eastus',
  appName: 'webserver',
  instance: 1
});

console.log(name); // vm-webserver-prod-eus-01
```

```python
# Python
from azure_naming_generator import NamingGenerator

generator = NamingGenerator()

name = generator.generate(
    resource_type='storage_account',
    environment='prod',
    region='eastus',
    app_name='data',
    purpose='logs'
)

print(name)  # stdatalogsprodeus001
```

## Export Formats

### Terraform Variables

```hcl
variable "resource_names" {
  type = map(string)
  default = {
    resource_group    = "rg-webapp-prod-eus"
    virtual_machine   = "vm-webserver-prod-eus-01"
    storage_account   = "stweblogsprodeus001"
    key_vault         = "kv-secrets-prod-eus"
  }
}
```

### PowerShell

```powershell
$resourceNames = @{
    ResourceGroup  = "rg-webapp-prod-eus"
    VirtualMachine = "vm-webserver-prod-eus-01"
    StorageAccount = "stweblogsprodeus001"
    KeyVault       = "kv-secrets-prod-eus"
}
```

### Azure CLI Script

```bash
#!/bin/bash
RG_NAME="rg-webapp-prod-eus"
VM_NAME="vm-webserver-prod-eus-01"
ST_NAME="stweblogsprodeus001"
KV_NAME="kv-secrets-prod-eus"

az group create --name $RG_NAME --location eastus
az vm create --resource-group $RG_NAME --name $VM_NAME ...
```

## Custom Rules

Define organization-specific rules in `naming-rules.json`:

```json
{
  "company": "contoso",
  "rules": {
    "environments": {
      "dev": "d",
      "staging": "s",
      "production": "p"
    },
    "regions": {
      "eastus": "eus",
      "westus": "wus",
      "centralus": "cus"
    },
    "patterns": {
      "virtualMachine": "{company}-vm-{app}-{env}-{region}-{instance:03d}",
      "storageAccount": "st{company}{app}{env}{region}{instance:03d}"
    },
    "validation": {
      "requireCostCenter": true,
      "allowedRegions": ["eastus", "westus"],
      "mandatoryTags": ["Owner", "Environment", "CostCenter"]
    }
  }
}
```

## Bulk Generation

Generate names for entire infrastructure:

```yaml
# Input YAML
infrastructure:
  - type: resourceGroup
    app: webapp
    env: prod
    region: eastus

  - type: virtualMachine
    app: webserver
    env: prod
    region: eastus
    instances: 3

  - type: storageAccount
    app: data
    purpose: logs
    env: prod
    region: eastus

# Output
rg-webapp-prod-eus
vm-webserver-prod-eus-01
vm-webserver-prod-eus-02
vm-webserver-prod-eus-03
stdatalogsprodeus001
```

## CLI Tool

```bash
# Install CLI
npm install -g azure-naming-generator-cli

# Generate name
azure-naming generate \
  --type vm \
  --app webserver \
  --env prod \
  --region eastus \
  --instance 1

# Output: vm-webserver-prod-eus-01

# Validate existing name
azure-naming validate "vm-webserver-prod-eus-01" --type vm
# ✅ Valid Azure VM name

# Generate from template
azure-naming bulk --template infrastructure.yaml --output names.json
```

## Integration

### CI/CD Pipeline

```yaml
# GitHub Actions
- name: Generate Azure Names
  run: |
    names=$(azure-naming bulk --template ./infrastructure.yaml --format json)
    echo "RESOURCE_NAMES=$names" >> $GITHUB_ENV

- name: Deploy with Generated Names
  run: |
    terraform apply -var="names=${{ env.RESOURCE_NAMES }}"
```

### Terraform Module

```hcl
module "naming" {
  source = "parkerws/naming/azure"

  environment = "prod"
  region      = "eastus"
  app_name    = "webapp"
}

resource "azurerm_resource_group" "example" {
  name     = module.naming.resource_group
  location = module.naming.region
}
```

## Tech Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Validation**: Zod
- **Export**: File-saver
- **Deployment**: Vercel/GitHub Pages

## Validation Rules

The tool validates names against Azure constraints:

- **Character limits** (e.g., storage: 3-24 chars)
- **Allowed characters** (alphanumeric, hyphens, underscores)
- **Uniqueness requirements** (globally unique vs. resource group scope)
- **Case sensitivity** (lowercase for storage, mixed for others)
- **Reserved words** (avoids Azure reserved names)

## Roadmap

- [ ] AWS resource naming support
- [ ] GCP resource naming support
- [ ] Name conflict checker (query Azure to check if name exists)
- [ ] Integration with Azure Resource Graph
- [ ] Browser extension
- [ ] VS Code extension
- [ ] API endpoint for programmatic access

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT License

## Author

**Will Parker**
- LinkedIn: [parkerws](https://linkedin.com/in/parkerws)
- GitHub: [@parkerws](https://github.com/parkerws)
- Website: [willparker.dev](https://willparker.dev)
