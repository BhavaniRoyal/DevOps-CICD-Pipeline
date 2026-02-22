#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: ./scripts/kubeconfig_to_base64.sh /path/to/kubeconfig"
  exit 1
fi

base64 -w 0 "$1"
echo
