#!/bin/env bash

yarn install --cwd deps/web

pushd deps/web/packages/step-ui
yarn build
popd

pushd deps/web/packages/internal
yarn build
popd

rm -rf vendor/internal
mkdir -p vendor/internal
cp -r deps/web/packages/internal/{package.json,dist} vendor/internal/
