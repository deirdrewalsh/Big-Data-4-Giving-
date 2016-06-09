#!/usr/bin/env bash

set -ex

rm -rf bundle bundle.zip

mkdir -p bundle

cp lambda_handler.py BigDataDBs.py bundle

cd bundle

zip -rq9 ../bundle.zip *

cd ..
