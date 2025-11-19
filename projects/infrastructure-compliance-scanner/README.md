# Infrastructure Compliance Scanner

Automated security and compliance scanning tool for Azure and AWS cloud infrastructure. Validates resources against CIS Benchmarks, NIST, PCI-DSS, and custom security policies.

## Overview

This tool provides automated compliance checking for cloud infrastructure, generating detailed reports on security posture, policy violations, and remediation recommendations.

## Features

### Compliance Frameworks
- ✅ **CIS Azure Foundations Benchmark v1.5.0**
- ✅ **CIS AWS Foundations Benchmark v1.5.0**
- ✅ **NIST SP 800-53 Rev. 5**
- ✅ **PCI DSS 3.2.1**
- ✅ **ISO 27001:2013**
- ✅ **Custom security policies**

### Scanning Capabilities
- ✅ Network security groups and firewall rules
- ✅ Storage account encryption and access
- ✅ IAM policies and permissions
- ✅ Logging and monitoring configuration
- ✅ Data encryption (at rest and in transit)
- ✅ Public exposure detection
- ✅ Compliance posture tracking over time

### Reporting
- ✅ HTML, JSON, and PDF reports
- ✅ Severity scoring (Critical, High, Medium, Low)
- ✅ Remediation recommendations
- ✅ Trend analysis and dashboards
- ✅ Export to Azure Sentinel / AWS Security Hub

## Architecture

```
┌─────────────────┐
│  Cloud Provider │
│   (Azure/AWS)   │
└────────┬────────┘
         │
         │ API Calls
         ▼
┌─────────────────────┐
│  Compliance Scanner │
│   - Resource Query  │
│   - Rule Engine     │
│   - Policy Eval     │
└────────┬────────────┘
         │
         │ Results
         ▼
┌─────────────────────┐
│  Report Generator   │
│   - HTML            │
│   - JSON            │
│   - PDF             │
└─────────────────────┘
```

## Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/parkerws/infrastructure-compliance-scanner.git
cd infrastructure-compliance-scanner

# Install dependencies
pip install -r requirements.txt

# Configure credentials
cp .env.example .env
# Edit .env with your credentials
```

### Azure Scan

```bash
# Scan all subscriptions
python scanner.py azure --framework cis --subscription all

# Scan specific subscription
python scanner.py azure \
  --framework cis \
  --subscription "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" \
  --output report.html

# Scan with multiple frameworks
python scanner.py azure \
  --framework cis,nist,pci \
  --subscription all \
  --format json \
  --output results/
```

### AWS Scan

```bash
# Scan all regions
python scanner.py aws --framework cis --region all

# Scan specific region
python scanner.py aws \
  --framework cis \
  --region us-east-1 \
  --output report.html

# Scan with specific profile
python scanner.py aws \
  --framework nist \
  --profile prod \
  --region all
```

## Configuration

### Environment Variables

```bash
# Azure
export AZURE_SUBSCRIPTION_ID="your-subscription-id"
export AZURE_TENANT_ID="your-tenant-id"
export AZURE_CLIENT_ID="your-client-id"
export AZURE_CLIENT_SECRET="your-client-secret"

# AWS
export AWS_ACCESS_KEY_ID="your-access-key"
export AWS_SECRET_ACCESS_KEY="your-secret-key"
export AWS_DEFAULT_REGION="us-east-1"
```

### Custom Rules

Create custom compliance rules in `rules/custom/`:

```yaml
# rules/custom/require-tags.yaml
name: Require Resource Tags
id: CUSTOM-001
severity: MEDIUM
cloud: azure
resource_types:
  - Microsoft.Compute/virtualMachines
  - Microsoft.Storage/storageAccounts
rule: |
  required_tags = ["Environment", "Owner", "CostCenter"]
  for tag in required_tags:
    if tag not in resource.tags:
      return {
        "compliant": False,
        "message": f"Missing required tag: {tag}"
      }
  return {"compliant": True}
```

## Project Structure

```
infrastructure-compliance-scanner/
├── scanner/
│   ├── __init__.py
│   ├── azure_scanner.py      # Azure resource scanning
│   ├── aws_scanner.py         # AWS resource scanning
│   ├── rule_engine.py         # Compliance rule evaluation
│   └── report_generator.py    # Report generation
├── rules/
│   ├── cis/
│   │   ├── azure/             # CIS Azure rules
│   │   └── aws/               # CIS AWS rules
│   ├── nist/                  # NIST rules
│   ├── pci/                   # PCI-DSS rules
│   └── custom/                # Custom rules
├── reports/                   # Generated reports
├── tests/                     # Unit and integration tests
├── scanner.py                 # Main CLI
├── requirements.txt
└── README.md
```

## Usage Examples

### Full Compliance Scan

```bash
# Comprehensive Azure scan
python scanner.py azure \
  --framework cis,nist,pci \
  --subscription all \
  --output-format html,json \
  --output-dir ./reports \
  --severity high,critical \
  --remediation
```

### Continuous Compliance Monitoring

```bash
# Run as cron job
0 6 * * * /usr/bin/python3 /opt/scanner/scanner.py azure \
  --framework cis \
  --subscription all \
  --output /var/reports/compliance-$(date +\%Y\%m\%d).html \
  --email security@example.com
```

### CI/CD Integration

```yaml
# Azure DevOps Pipeline
steps:
- task: UsePythonVersion@0
  inputs:
    versionSpec: '3.11'

- script: |
    pip install -r requirements.txt
    python scanner.py azure \
      --framework cis \
      --subscription $(AZURE_SUBSCRIPTION_ID) \
      --output-format json \
      --fail-on critical
  displayName: 'Run Compliance Scan'
  env:
    AZURE_CLIENT_ID: $(AZURE_CLIENT_ID)
    AZURE_CLIENT_SECRET: $(AZURE_CLIENT_SECRET)
    AZURE_TENANT_ID: $(AZURE_TENANT_ID)
```

## Compliance Checks

### Azure CIS Benchmark Examples

**1.1 - Ensure security contact email is set**
```python
def check_security_contact(subscription):
    security_contacts = get_security_contacts(subscription)
    if not security_contacts or not security_contacts.email:
        return FAIL
    return PASS
```

**2.1 - Ensure Azure Defender is enabled**
```python
def check_defender_enabled(subscription):
    pricing = get_security_pricing(subscription)
    for service in CRITICAL_SERVICES:
        if pricing[service].pricing_tier != "Standard":
            return FAIL
    return PASS
```

**4.1.3 - Ensure storage accounts use encryption**
```python
def check_storage_encryption(storage_account):
    if not storage_account.encryption.services.blob.enabled:
        return FAIL
    if storage_account.encryption.key_source != "Microsoft.Storage":
        return WARN
    return PASS
```

### AWS CIS Benchmark Examples

**1.4 - Ensure no root account access keys exist**
```python
def check_root_access_keys():
    credential_report = iam.get_credential_report()
    root_user = credential_report[credential_report['user'] == '<root_account>']
    if root_user['access_key_1_active'] or root_user['access_key_2_active']:
        return FAIL
    return PASS
```

**2.1.1 - Ensure S3 bucket encryption is enabled**
```python
def check_s3_encryption(bucket):
    try:
        encryption = s3.get_bucket_encryption(Bucket=bucket)
        return PASS
    except ClientError:
        return FAIL
```

## Report Example

### HTML Report

![Compliance Report](docs/images/report-example.png)

Features:
- Executive summary dashboard
- Severity breakdown chart
- Detailed finding tables
- Remediation steps
- Resource inventory

### JSON Output

```json
{
  "scan_time": "2024-11-19T10:30:00Z",
  "cloud_provider": "azure",
  "subscription_id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "framework": "cis",
  "summary": {
    "total_checks": 156,
    "passed": 128,
    "failed": 24,
    "warnings": 4,
    "compliance_score": 82.1
  },
  "findings": [
    {
      "check_id": "CIS-2.1",
      "title": "Ensure Azure Defender is enabled",
      "severity": "HIGH",
      "status": "FAIL",
      "resource": "/subscriptions/.../providers/Microsoft.Security/pricings/VirtualMachines",
      "message": "Azure Defender for Virtual Machines is not enabled",
      "remediation": "Enable Azure Defender: az security pricing create -n VirtualMachines --tier Standard",
      "references": [
        "https://docs.microsoft.com/azure/security-center/security-center-pricing"
      ]
    }
  ]
}
```

## Remediation

### Auto-Remediation (Optional)

```bash
# Generate remediation scripts
python scanner.py azure \
  --framework cis \
  --remediate \
  --dry-run

# Apply remediations
python scanner.py azure \
  --framework cis \
  --remediate \
  --auto-approve \
  --backup
```

### Manual Remediation

The scanner generates specific remediation commands:

```bash
# Azure CLI
az storage account update \
  --name mystorageaccount \
  --resource-group myresourcegroup \
  --https-only true

# Terraform
resource "azurerm_storage_account" "example" {
  name                     = "mystorageaccount"
  enable_https_traffic_only = true
}

# PowerShell
Set-AzStorageAccount \
  -ResourceGroupName "myresourcegroup" \
  -Name "mystorageaccount" \
  -EnableHttpsTrafficOnly $true
```

## CI/CD Integration

### GitHub Actions

```yaml
name: Compliance Scan

on:
  schedule:
    - cron: '0 6 * * *'  # Daily at 6 AM
  workflow_dispatch:

jobs:
  scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: pip install -r requirements.txt

      - name: Run compliance scan
        run: |
          python scanner.py azure \
            --framework cis \
            --subscription all \
            --output-format html,json \
            --output-dir ./reports
        env:
          AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}
          AZURE_CLIENT_SECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
          AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}

      - name: Upload reports
        uses: actions/upload-artifact@v3
        with:
          name: compliance-reports
          path: reports/

      - name: Notify on failures
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: 'Compliance scan failed'
```

## API Usage

```python
from scanner import AzureScanner, ComplianceFramework

# Initialize scanner
scanner = AzureScanner(
    subscription_id="your-subscription-id",
    tenant_id="your-tenant-id",
    client_id="your-client-id",
    client_secret="your-client-secret"
)

# Run scan
results = scanner.scan(
    frameworks=[ComplianceFramework.CIS, ComplianceFramework.NIST],
    severity_filter=["HIGH", "CRITICAL"]
)

# Generate report
from scanner import ReportGenerator

generator = ReportGenerator()
generator.create_html_report(results, "compliance-report.html")
generator.create_json_report(results, "compliance-results.json")

# Get compliance score
score = results.calculate_compliance_score()
print(f"Compliance Score: {score}%")
```

## Performance

- Scans 1000 Azure resources in ~5 minutes
- Scans 1000 AWS resources in ~8 minutes
- Supports parallel scanning for faster results
- Caching for repeated scans

## Roadmap

- [ ] GCP support
- [ ] Real-time monitoring with webhooks
- [ ] Integration with ServiceNow/Jira for ticketing
- [ ] Machine learning for anomaly detection
- [ ] Automated remediation workflows
- [ ] SOC 2 compliance framework
- [ ] Kubernetes security scanning

## Contributing

Contributions welcome! See [CONTRIBUTING.md](CONTRIBUTING.md)

## License

MIT License

## Author

**Will Parker**
- LinkedIn: [parkerws](https://linkedin.com/in/parkerws)
- GitHub: [@parkerws](https://github.com/parkerws)
- Website: [willparker.dev](https://willparker.dev)
