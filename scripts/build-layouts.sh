#!/bin/env bash

yarn install --cwd ~/work/practicalzt/web

pushd ~/work/practicalzt/web/packages/step-ui
yarn build
popd

pushd ~/work/practicalzt/web/packages/layouts
yarn build
popd

rm -rf vendor/layouts
mkdir -p vendor/layouts
cp -r ~/work/practicalzt/web/packages/layouts/package.json ~/work/practicalzt/web/packages/layouts/dist  vendor/layouts/
