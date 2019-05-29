#!/usr/bin/env bash

#初始化 nvm
set -e
CURDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
buidPath="$CURDIR/../signin_ui/front"
ossPath="$CURDIR/../oss-upload"

# 上次资源到 oss
if [[ ! -d $ossPath ]];then
    cd ../
    git clone git@github.com:tech-gsteps/oss-upload.git
    cd $ossPath
    yarn install
else
    cd $ossPath
    git pull
    yarn install
fi
cd $CURDIR

git checkout .

git pull

npm install

npm run build

if [[ ! -d $buidPath ]];then
    mkdir $buidPath
fi

# 上传静态资源
node $ossPath/index.js --name=front --filepath=$CURDIR/dist/

rm -rf $buidPath/*
cp -r $CURDIR/dist/index.html $buidPath
