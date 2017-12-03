stereostream-angular
====================

StereoStream web frontend (Angular 5; `@angular/material` and `@angular/flex-layout`).

Uses WebSockets (socket.io) and WebRTC.

## Update version

    sed -i "/    version:/c\    version: 'App $(jq -r .version package.json); \'" src/app/server-status/server-status.component.ts

## Deploy distribution
Clone [stereostream-angular-dist](https://github.com/stereostream/stereostream-angular-dist) one directory above, then:

    rm -rf dist; ng build -prod && d=../stereostream-angular-dist && rm -rf "$d/dist" && mv "$PWD/dist" "$d" && cd "$d" && (git add .; git status) || ( >&2 echo BUILD FAILED )
