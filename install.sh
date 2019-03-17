#!/bin/sh

npm run build

cp -r dist/* /git/gvrchathtml
#cp -r static/* /git/static
#cp index.html /git/html/

echo OK
