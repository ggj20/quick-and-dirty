#!/bin/bash

rm -rf dist
rm -f quick-and-dirty*.zip

yarn build
cp -r {controller,airconsole-controls,controller.html} dist

zip -r "quick-and-dirty-$(date +"%Y-%m-%d-%H-%M-%S").zip" dist
