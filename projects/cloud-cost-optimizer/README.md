# Cloud Cost Optimizer

Real-time cloud cost analysis and optimization tool for Azure and AWS with ML-based anomaly detection and automated recommendations.

## Overview

Monitor, analyze, and optimize cloud spending across Azure and AWS. Get actionable insights, detect cost anomalies, and automatically implement cost-saving measures.

## Features

### Cost Analysis
- ✅ Real-time cost tracking across subscriptions/accounts
- ✅ Historical trend analysis
- ✅ Cost attribution by service, resource group, tags
- ✅ Budget forecasting with ML predictions
- ✅ Multi-cloud cost aggregation

### Anomaly Detection
- ✅ ML-based spending anomaly detection
- ✅ Alert on unusual cost spikes
- ✅ Automatic root cause analysis
- ✅ Slack/Teams notifications

### Optimization Recommendations
- ✅ Idle resource detection
- ✅ Rightsizing recommendations
- ✅ Reserved Instance/Savings Plan analysis
- ✅ Storage tier optimization
- ✅ Unused disk cleanup
- ✅ Auto-shutdown scheduling

### Dashboards & Reports
- ✅ Interactive cost dashboards
- ✅ Executive summary reports
- ✅ Department/team cost allocation
- ✅ Chargebacks and showbacks
- ✅ Export to PDF, Excel, CSV

## Quick Start

```bash
# Install
git clone https://github.com/parkerws/cloud-cost-optimizer.git
cd cloud-cost-optimizer
pip install -r requirements.txt

# Configure
cp config.example.yaml config.yaml
# Edit config.yaml with your credentials

# Run analyzer
python cost_optimizer.py analyze --cloud azure --days 30

# Generate dashboard
python cost_optimizer.py dashboard --port 8080

# Get recommendations
python cost_optimizer.py recommend --auto-apply

# Start monitoring
python cost_optimizer.py monitor --alert-threshold 20%
```

## Architecture

```
┌──────────────┐       ┌──────────────┐
│ Azure Cost   │       │  AWS Cost    │
│ Management   │       │  Explorer    │
└──────┬───────┘       └──────┬───────┘
       │                      │
       └──────────┬───────────┘
                  │
          ┌───────▼────────┐
          │  Data Ingestion │
          │  - API Polling  │
          │  - Caching      │
          └───────┬─────────┘
                  │
          ┌───────▼─────────┐
          │  ML Engine       │
          │  - Anomaly Detect│
          │  - Forecasting   │
          └───────┬──────────┘
                  │
       ┌──────────┴──────────┐
       │                     │
┌──────▼─────┐      ┌────────▼────────┐
│  Dashboard │      │  Recommendations│
│  (React)   │      │   Engine        │
└────────────┘      └─────────────────┘
```

## Cost Optimization Examples

### 1. Idle VM Detection

```python
# Detect VMs with <5% CPU usage over 7 days
idle_vms = analyzer.find_idle_resources(
    resource_type='VirtualMachine',
    cpu_threshold=5,
    days=7
)

# Estimated monthly savings
print(f"Potential savings: ${idle_vms.calculate_savings()}/month")

# Auto-shutdown or delete
idle_vms.apply_action('shutdown', schedule='weekends')
```

###2. Storage Tier Optimization

```python
# Find hot storage with infrequent access
cold_storage = analyzer.find_storage_candidates(
    access_frequency='low',
    tier='hot'
)

# Migrate to cool/archive tier
savings = cold_storage.migrate_to_cool_tier()
print(f"Annual savings: ${savings * 12}")
```

### 3. Reserved Instance Recommendations

```python
# Analyze RI coverage
ri_analysis = analyzer.analyze_ri_coverage(
    lookback_days=90
)

# Get recommendations
recommendations = ri_analysis.get_recommendations()
for rec in recommendations:
    print(f"{rec.instance_type}: {rec.quantity} RIs")
    print(f"Estimated savings: ${rec.annual_savings}")
```

## Dashboard Features

![Cost Dashboard](docs/images/dashboard.png)

- **Real-time Metrics**: Current spend, budget status, forecasts
- **Trend Charts**: Historical cost trends by service
- **Top Spenders**: Most expensive resources and services
- **Anomaly Alerts**: Cost spikes and unusual patterns
- **Recommendations**: Actionable cost-saving opportunities

## Configuration

```yaml
# config.yaml
azure:
  subscriptions:
    - id: "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
      name: "Production"
    - id: "yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy"
      name: "Development"

aws:
  accounts:
    - id: "123456789012"
      name: "Production"
      profile: "prod"

budgets:
  monthly_limit: 50000
  alert_thresholds:
    - 50  # percent
    - 80
    - 100

notifications:
  slack:
    webhook_url: "https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
  email:
    recipients:
      - "finance@example.com"
      - "engineering@example.com"

optimization:
  auto_shutdown:
    enabled: true
    schedule:
      weekdays: "19:00-07:00"
      weekends: "all"
    excluded_tags:
      - "AlwaysOn=true"

  rightsizing:
    enabled: true
    cpu_threshold: 20  # percent
    lookback_days: 14
```

## API Usage

```python
from cost_optimizer import CostAnalyzer, AzureProvider, AWSProvider

# Initialize
analyzer = CostAnalyzer()
analyzer.add_provider(AzureProvider(subscription_id="..."))
analyzer.add_provider(AWSProvider(account_id="..."))

# Get current month costs
costs = analyzer.get_costs(period='current_month')
print(f"Total spend: ${costs.total}")

# Find savings opportunities
recommendations = analyzer.get_recommendations()
for rec in recommendations:
    print(f"{rec.category}: ${rec.potential_savings}/month")
    print(f"Action: {rec.action}")
    print(f"Impact: {rec.impact}")

# Detect anomalies
anomalies = analyzer.detect_anomalies(sensitivity=0.95)
for anomaly in anomalies:
    print(f"Anomaly detected: {anomaly.resource}")
    print(f"Expected: ${anomaly.expected}, Actual: ${anomaly.actual}")
    print(f"Increase: {anomaly.percentage_change}%")

# Generate forecast
forecast = analyzer.forecast_costs(days=30)
print(f"Projected 30-day cost: ${forecast.total}")
```

## CI/CD Integration

```yaml
# .github/workflows/cost-check.yml
name: Cost Analysis

on:
  schedule:
    - cron: '0 8 * * *'  # Daily at 8 AM

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run cost analysis
        run: |
          python cost_optimizer.py analyze \
            --cloud azure,aws \
            --format json \
            --output cost-report.json

      - name: Check budget
        run: |
          python cost_optimizer.py check-budget \
            --fail-on-exceed \
            --threshold 90

      - name: Post to Slack
        if: always()
        run: |
          python cost_optimizer.py notify \
            --channel #finance \
            --report cost-report.json
```

## Roadmap

- [ ] GCP support
- [ ] Azure Hybrid Benefit analysis
- [ ] Commitment-based discount optimization
- [ ] FinOps dashboards
- [ ] Integration with Terraform for cost estimation
- [ ] Cost allocation rules engine

## License

MIT License

## Author

**Will Parker**
- LinkedIn: [parkerws](https://linkedin.com/in/parkerws)
- GitHub: [@parkerws](https://github.com/parkerws)
