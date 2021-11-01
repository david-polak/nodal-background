#!/usr/bin/env bash

npm run build

cp LICENSE dist/
cp CHANGELOG.md dist/
cp README.md dist/
cp package.json dist/

npm config set //registry.npmjs.org/:_authToken "${NPM_TOKEN}"

npm publish ./dist/ --dry-run