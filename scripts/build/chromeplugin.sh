#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
ROOT=$DIR/../..
APPROOT=$ROOT/app
CHROMEROOT=$ROOT/chromeplugin
BUILDROOT=$ROOT/build
DEPLOYROOT=$ROOT/deploy

echo Packaging Chrome plugin...
pushd $CHROMEROOT
zip -r -u -o $DEPLOYROOT/chromeplugin.zip *
popd
