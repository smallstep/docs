#!/bin/env bash

yarn install --cwd deps/web

pushd deps/web/packages/step-ui
yarn build
popd

pushd deps/web/packages/layouts
yarn build
popd

rm -rf vendor/layouts
mkdir -p vendor/layouts
cp -r deps/web/packages/layouts/package.json deps/web/packages/layouts/dist  vendor/layouts/
