#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
ROOT=$DIR/../..
APPROOT=$ROOT/app
BUILDROOT=$ROOT/build
DEPLOYROOT=$ROOT/deploy

echo Crunching JavaScript...
cat $APPROOT/js/*.js > $BUILDROOT/all.js
cat $BUILDROOT/all.js | uglifyjs --compress --mangle > $DEPLOYROOT/all.js
