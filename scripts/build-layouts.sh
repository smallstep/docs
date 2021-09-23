#!/bin/env bash

yarn install --cwd web

pushd web/packages/step-ui
yarn build
popd

pushd web/packages/layouts
yarn build
popd

rm -rf vendor/layouts
mkdir -p vendor/layouts
cp -r web/packages/layouts/package.json web/packages/layouts/dist  vendor/layouts/
