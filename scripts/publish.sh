#!/usr/bin/env bash

npm run build

cp LICENSE dist/
cp CHANGELOG.md dist/
cp README.md dist/
cp package.json dist/

echo ${NPM_TOKEN:0:1}

npm publish ./dist/ --dry-run