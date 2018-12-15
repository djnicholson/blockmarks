#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
ROOT=$DIR/../..
APPROOT=$ROOT/app
BUILDROOT=$ROOT/build
DEPLOYROOT=$ROOT/deploy

$DIR/html.sh
$DIR/javascript.sh
$DIR/css.sh
$DIR/images.sh
