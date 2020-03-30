#!/bin/bash

rm -rf dist

yarn build
cp -r {controller,airconsole-controls,controller.html} dist

zip -r quick-and-dirty.zip dist
