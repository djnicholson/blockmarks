#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
ROOT=$DIR/../..
APPROOT=$ROOT/app
BUILDROOT=$ROOT/build
DEPLOYROOT=$ROOT/deploy

echo Copying images...
cp $APPROOT/images/* $BUILDROOT/
cp $APPROOT/images/* $DEPLOYROOT/
