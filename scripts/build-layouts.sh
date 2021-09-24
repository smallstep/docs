#!/bin/env bash

yarn install --cwd /home/runner/work/practicalzt/web

pushd /home/runner/work/practicalzt/web/packages/step-ui
yarn build
popd

pushd /home/runner/work/practicalzt/web/packages/layouts
yarn build
popd

rm -rf vendor/layouts
mkdir -p vendor/layouts
cp -r /home/runner/work/practicalzt/web/packages/layouts/package.json /home/runner/work/practicalzt/web/packages/layouts/dist  vendor/layouts/
