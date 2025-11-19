#!/usr/bin/env python3
"""
Infrastructure Compliance Scanner
Automated security and compliance scanning for Azure and AWS
"""

import argparse
import sys
from pathlib import Path
from scanner import AzureScanner, AWSScanner, ReportGenerator
from scanner.frameworks import ComplianceFramework

def main():
    parser = argparse.ArgumentParser(
        description='Infrastructure Compliance Scanner for Azure and AWS'
    )

    # Cloud provider selection
    subparsers = parser.add_subparsers(dest='cloud', help='Cloud provider')

    # Azure scanner
    azure_parser = subparsers.add_parser('azure', help='Scan Azure resources')
    azure_parser.add_argument(
        '--subscription',
        required=True,
        help='Azure subscription ID or "all" for all subscriptions'
    )
    azure_parser.add_argument(
        '--framework',
        choices=['cis', 'nist', 'pci', 'iso27001', 'all'],
        default='cis',
        help='Compliance framework to use'
    )
    azure_parser.add_argument(
        '--severity',
        choices=['critical', 'high', 'medium', 'low'],
        nargs='+',
        default=['critical', 'high', 'medium', 'low'],
        help='Severity levels to include'
    )
    azure_parser.add_argument(
        '--output',
        type=Path,
        default='compliance-report.html',
        help='Output file path'
    )
    azure_parser.add_argument(
        '--format',
        choices=['html', 'json', 'pdf'],
        default='html',
        help='Report format'
    )

    # AWS scanner
    aws_parser = subparsers.add_parser('aws', help='Scan AWS resources')
    aws_parser.add_argument(
        '--region',
        default='all',
        help='AWS region or "all" for all regions'
    )
    aws_parser.add_argument(
        '--profile',
        help='AWS CLI profile name'
    )
    aws_parser.add_argument(
        '--framework',
        choices=['cis', 'nist', 'pci', 'iso27001', 'all'],
        default='cis',
        help='Compliance framework to use'
    )
    aws_parser.add_argument(
        '--output',
        type=Path,
        default='compliance-report.html',
        help='Output file path'
    )

    args = parser.parse_args()

    if not args.cloud:
        parser.print_help()
        sys.exit(1)

    # Run scanner based on cloud provider
    if args.cloud == 'azure':
        print(f"🔍 Scanning Azure subscription: {args.subscription}")
        scanner = AzureScanner()
        results = scanner.scan(
            subscription_id=args.subscription,
            framework=args.framework,
            severity_filter=args.severity
        )
    elif args.cloud == 'aws':
        print(f"🔍 Scanning AWS region: {args.region}")
        scanner = AWSScanner()
        results = scanner.scan(
            region=args.region,
            profile=args.profile,
            framework=args.framework
        )

    # Generate report
    print(f"📊 Generating {args.format} report...")
    generator = ReportGenerator()

    if args.format == 'html':
        generator.create_html_report(results, args.output)
    elif args.format == 'json':
        generator.create_json_report(results, args.output)
    elif args.format == 'pdf':
        generator.create_pdf_report(results, args.output)

    # Print summary
    summary = results.get_summary()
    print(f"\n✅ Scan complete!")
    print(f"Total checks: {summary['total_checks']}")
    print(f"Passed: {summary['passed']} ({summary['pass_rate']:.1f}%)")
    print(f"Failed: {summary['failed']}")
    print(f"Compliance score: {summary['compliance_score']:.1f}%")
    print(f"\nReport saved to: {args.output}")

    # Exit with error if critical failures found
    if summary['critical_failures'] > 0:
        sys.exit(1)

if __name__ == '__main__':
    main()
