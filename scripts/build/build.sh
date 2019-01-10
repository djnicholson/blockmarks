#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
ROOT=$DIR/../..
APPROOT=$ROOT/app
CHROMEROOT=$ROOT/chromeplugin
BUILDROOT=$ROOT/build
DEPLOYROOT=$ROOT/deploy

$DIR/html.sh
$DIR/chromeplugin.sh
$DIR/css.sh
$DIR/static.sh
$DIR/javascript.sh
