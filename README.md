stereostream-angular
====================

StereoStream web frontend (Angular 4 and @angular/material).

## Update version

    sed -i "/this.serverStatus =/c\    this.serverStatus = {version: 'App $(jq -r .version package.json); '};" src/app/server-status/server-status.component.ts

## Deploy distribution
Clone [stereostream-angular-dist](https://github.com/stereostream/stereostream-angular-dist) one directory above, then:

    rm -rf dist; ng build -prod; d=../stereostream-angular-dist; rm -rf "$d/dist"; mv "$PWD/dist" "$d"; cd "$d"; git add .; git status
