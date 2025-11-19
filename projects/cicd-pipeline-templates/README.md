# CI/CD Pipeline Templates

Production-ready CI/CD pipeline templates for Azure DevOps, GitHub Actions, and GitLab CI. Accelerate your DevOps workflows with battle-tested templates.

## Overview

A comprehensive library of reusable CI/CD pipeline templates for Terraform, Kubernetes, containerized applications, and Infrastructure as Code deployments.

## Features

- ✅ **Azure DevOps YAML pipelines**
- ✅ **GitHub Actions workflows**
- ✅ **GitLab CI/CD pipelines**
- ✅ **Multi-stage deployment (dev/staging/prod)**
- ✅ **Terraform validation and deployment**
- ✅ **Container image building and scanning**
- ✅ **Kubernetes deployments with Helm**
- ✅ **Security scanning (SAST/DAST)**
- ✅ **Automated testing integration**
- ✅ **Blue-green and canary deployments**

## Quick Start

```bash
git clone https://github.com/parkerws/cicd-pipeline-templates.git
cd cicd-pipeline-templates

# Copy template to your project
cp azure-devops/terraform-deployment.yml ../.azurepipelines/
cp github-actions/terraform-deploy.yml ../.github/workflows/
```

## Templates

### Azure DevOps Templates

#### 1. Terraform Deployment Pipeline

**File**: `azure-devops/terraform-deployment.yml`

```yaml
# Multi-stage Terraform deployment with validation and approval gates

trigger:
  branches:
    include:
      - main
      - develop

stages:
  - stage: Validate
    jobs:
      - job: TerraformValidate
        steps:
          - task: TerraformInstaller@0
            inputs:
              terraformVersion: '1.5.0'

          - task: TerraformTaskV4@4
            displayName: 'Terraform Init'
            inputs:
              command: 'init'
              backendServiceArm: 'Azure-Service-Connection'

          - task: TerraformTaskV4@4
            displayName: 'Terraform Validate'
            inputs:
              command: 'validate'

          - script: |
              terraform fmt -check -recursive
            displayName: 'Terraform Format Check'

          - script: |
              tflint --init
              tflint
            displayName: 'TFLint Scan'

  - stage: Plan
    dependsOn: Validate
    jobs:
      - job: TerraformPlan
        steps:
          - task: TerraformTaskV4@4
            displayName: 'Terraform Plan'
            inputs:
              command: 'plan'
              environmentServiceNameAzureRM: 'Azure-Service-Connection'

          - task: PublishPipelineArtifact@1
            inputs:
              targetPath: '$(System.DefaultWorkingDirectory)/tfplan'
              artifact: 'terraform-plan'

  - stage: Deploy
    dependsOn: Plan
    condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/main'))
    jobs:
      - deployment: DeployInfrastructure
        environment: 'production'
        strategy:
          runOnce:
            deploy:
              steps:
                - task: TerraformTaskV4@4
                  displayName: 'Terraform Apply'
                  inputs:
                    command: 'apply'
                    environmentServiceNameAzureRM: 'Azure-Service-Connection'
```

#### 2. Container Build and Push

**File**: `azure-devops/container-build.yml`

```yaml
# Build, scan, and push container images to ACR

stages:
  - stage: Build
    jobs:
      - job: BuildImage
        steps:
          - task: Docker@2
            displayName: 'Build Docker Image'
            inputs:
              command: 'build'
              repository: '$(imageRepository)'
              dockerfile: '$(dockerfilePath)'
              tags: |
                $(Build.BuildId)
                latest

          - task: Trivy@1
            displayName: 'Security Scan with Trivy'
            inputs:
              image: '$(imageRepository):$(Build.BuildId)'
              severityThreshold: 'HIGH'

          - task: Docker@2
            displayName: 'Push to ACR'
            inputs:
              command: 'push'
              repository: '$(imageRepository)'
              containerRegistry: 'ACR-Service-Connection'
              tags: |
                $(Build.BuildId)
                latest
```

### GitHub Actions Templates

#### 1. Terraform Deployment Workflow

**File**: `github-actions/terraform-deploy.yml`

```yaml
name: Terraform Deployment

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  TF_VERSION: '1.5.0'
  ARM_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}
  ARM_CLIENT_SECRET: ${{ secrets.AZURE_CLIENT_SECRET }}
  ARM_SUBSCRIPTION_ID: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
  ARM_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}

jobs:
  terraform-validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2
        with:
          terraform_version: ${{ env.TF_VERSION }}

      - name: Terraform Format Check
        run: terraform fmt -check -recursive

      - name: Terraform Init
        run: terraform init

      - name: Terraform Validate
        run: terraform validate

      - name: TFSec Security Scan
        uses: aquasecurity/tfsec-action@v1.0.0

  terraform-plan:
    needs: terraform-validate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2

      - name: Terraform Init
        run: terraform init

      - name: Terraform Plan
        run: terraform plan -out=tfplan

      - name: Upload Plan
        uses: actions/upload-artifact@v3
        with:
          name: tfplan
          path: tfplan

  terraform-apply:
    needs: terraform-plan
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3

      - name: Download Plan
        uses: actions/download-artifact@v3
        with:
          name: tfplan

      - name: Setup Terraform
        uses: hashicorp/setup-terraform@v2

      - name: Terraform Init
        run: terraform init

      - name: Terraform Apply
        run: terraform apply -auto-approve tfplan
```

#### 2. Kubernetes Deployment with Helm

**File**: `github-actions/k8s-helm-deploy.yml`

```yaml
name: Deploy to AKS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}

      - name: Set AKS Context
        uses: azure/aks-set-context@v3
        with:
          resource-group: 'myResourceGroup'
          cluster-name: 'myAKSCluster'

      - name: Helm Deploy
        run: |
          helm upgrade --install myapp ./helm \
            --namespace production \
            --create-namespace \
            --set image.tag=${{ github.sha }} \
            --wait \
            --timeout 5m

      - name: Verify Deployment
        run: |
          kubectl rollout status deployment/myapp -n production
```

### GitLab CI Templates

#### 1. Terraform Pipeline

**File**: `gitlab-ci/terraform-pipeline.yml`

```yaml
# .gitlab-ci.yml for Terraform

stages:
  - validate
  - plan
  - apply

variables:
  TF_VERSION: "1.5.0"

before_script:
  - cd terraform/
  - terraform --version

validate:
  stage: validate
  image: hashicorp/terraform:$TF_VERSION
  script:
    - terraform init
    - terraform validate
    - terraform fmt -check
  only:
    - merge_requests
    - main

plan:
  stage: plan
  image: hashicorp/terraform:$TF_VERSION
  script:
    - terraform init
    - terraform plan -out=tfplan
  artifacts:
    paths:
      - terraform/tfplan
  only:
    - merge_requests
    - main

apply:
  stage: apply
  image: hashicorp/terraform:$TF_VERSION
  script:
    - terraform init
    - terraform apply -auto-approve tfplan
  dependencies:
    - plan
  only:
    - main
  when: manual
```

## Advanced Features

### Multi-Environment Deployment

```yaml
# Deploy to dev, staging, prod with approvals

stages:
  - stage: DeployDev
    jobs:
      - deployment: Dev
        environment: development

  - stage: DeployStaging
    dependsOn: DeployDev
    jobs:
      - deployment: Staging
        environment: staging

  - stage: DeployProd
    dependsOn: DeployStaging
    jobs:
      - deployment: Production
        environment: production
```

### Security Scanning

```yaml
# Integrated security scanning

steps:
  - name: Trivy Container Scan
    run: trivy image --severity HIGH,CRITICAL myapp:latest

  - name: Snyk Security Scan
    uses: snyk/actions/node@master
    env:
      SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  - name: OWASP Dependency Check
    run: dependency-check --project myapp --scan .
```

## Usage Examples

### Using in Your Project

```bash
# Azure DevOps
mkdir -p .azurepipelines
cp cicd-pipeline-templates/azure-devops/terraform-deployment.yml .azurepipelines/

# GitHub Actions
mkdir -p .github/workflows
cp cicd-pipeline-templates/github-actions/terraform-deploy.yml .github/workflows/

# GitLab CI
cp cicd-pipeline-templates/gitlab-ci/terraform-pipeline.yml .gitlab-ci.yml
```

### Customization

```yaml
# Extend templates with your specific needs

# In your pipeline
resources:
  repositories:
    - repository: templates
      type: github
      name: parkerws/cicd-pipeline-templates

extends:
  template: azure-devops/terraform-deployment.yml@templates
  parameters:
    environmentName: 'production'
    terraformVersion: '1.5.0'
```

## Best Practices

1. ✅ **Use approval gates for production**
2. ✅ **Run security scans on every build**
3. ✅ **Store secrets in secure vaults**
4. ✅ **Implement automated testing**
5. ✅ **Use semantic versioning for artifacts**
6. ✅ **Enable branch protection rules**
7. ✅ **Maintain separate environments**

## Contributing

Contributions welcome! Please submit PRs with new templates or improvements.

## License

MIT License

## Author

**Will Parker**
- LinkedIn: [parkerws](https://linkedin.com/in/parkerws)
- GitHub: [@parkerws](https://github.com/parkerws)
