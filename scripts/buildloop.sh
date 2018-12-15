#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
ROOT=$DIR/..
APPROOT=$ROOT/app
BUILDROOT=$ROOT/build
DEPLOYROOT=$ROOT/deploy

chsum1=""
while [[ true ]]
do
    chsum2=`find $APPROOT -type f -exec md5 {} \;`
    if [[ $chsum1 != $chsum2 ]] ; then      
        $DIR/build/build.sh
        chsum1=$chsum2
    fi
    sleep 3
done
