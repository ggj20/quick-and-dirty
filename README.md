# GGJ2020 "Quick & Dirty"

(Based on https://github.com/photonstorm/phaser3-project-template)

## With Docker

`make image`

`make install`

`make start`

`make build`

## Without Docker

Get node.js

`npm install`

`npm start`

`npm build`

## Hints

Use playerCount get parameter to set player count, default = 4

open in airconsole with http://www.airconsole.com/?http=1#http://x.x.x.x:8080/

open in airconsole simulator with www.airconsole.com/simulator/#http://x.x.x.x:8080/


## Publish to AirConsole

Make sure we have a clean build folder

`rm -rf dist/`

Build game with webpack

`npm build`

Copy AirConsole controller files into dist folder

`cp -r {controller.html,controller/,airconsole-controls} dist/`

Create zip file from `dist/` folder

Open https://www.airconsole.com/developers?id=com.github.airship and upload new zip file.
