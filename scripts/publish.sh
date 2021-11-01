#!/usr/bin/env bash

npm run build

cp LICENSE dist/
cp CHANGELOG.md dist/
cp README.md dist/
cp package.json dist/