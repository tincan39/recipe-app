#!/bin/bash

SSL_CONFIGURED=true

if $SSL_CONFIGURED; then
    echo "Files exist"
    rm "/etc/nginx/conf.d/temp.conf"
else
    echo "Files don't exist"
    rm "/etc/nginx/conf.d/app.conf"
fi

rm "/etc/nginx/conf.d/default.conf"
