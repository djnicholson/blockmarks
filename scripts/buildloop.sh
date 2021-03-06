#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"
ROOT=$DIR/..
APPROOT=$ROOT/app
CHROMEROOT=$ROOT/chromeplugin
BUILDROOT=$ROOT/build
DEPLOYROOT=$ROOT/deploy

chsum1=""
chromesum1=""
jschsum1=""

while [[ true ]]
do

    chsum2=`find $APPROOT -type f -exec md5 {} \;`
    chromesum2=`find $CHROMEROOT -type f -exec md5 {} \;`
    jschsum2=`find $APPROOT/js -type f -exec md5 {} \;`

    if [[ $chsum1 != $chsum2 ]] ; then      
        $DIR/build/html.sh
        $DIR/build/css.sh
        $DIR/build/static.sh
        chsum1=$chsum2
    fi

    if [[ $chromesum1 != $chromesum2 ]] ; then      
        $DIR/build/chromeplugin.sh
        chromesum1=$chromesum2
    fi
    
    if [[ $jschsum1 != $jschsum2 ]] ; then      
        $DIR/build/javascript.sh
        jschsum1=$jschsum2
    fi

    sleep 3

done
