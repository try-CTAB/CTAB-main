#!/bin/bash

# I run this from git bash on windows but it should work just fine on any bash terminal on linux

# abort on errors
set -e

# build
npm run build

cd dist
echo '>>> Making git...'
git init
echo '>>> Adding all files to git...'
git add -A
git commit -m 'deploy'

echo '>>> Pushing to remote...'
git remote add origin https://github.com/try-CTAB/try-CTAB.github.io.git
git push -u origin master --force
cd - 