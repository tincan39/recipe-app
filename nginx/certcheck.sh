#!/bin/bash

if [ -e "/etc/letsencrypt/live/samplesapp.net/privkey.pem"] && [-e "/etc/letsencrypt/live/samplesapp.net/fullchain.pem"]; then 
    echo "Files exist"
    rm "/etc/nginx/conf.d/temp.conf"
else
    echo "Files don't exist"
    rm "/etc/nginx/conf.d/app.conf"
fi 

rm "/etc/nginx/conf.d/default.conf"