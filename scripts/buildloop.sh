#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

while [[ true ]]
do
    $DIR/build/build.sh
    sleep 3
done
