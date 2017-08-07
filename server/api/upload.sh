#!/bin/bash

echo "" | ./hacky shadergif_http_wrap.native

# Create working folder
if [ ! -d ~/shadergif-images ];
then
	mkdir ~/shadergif-images
fi

cd ~/shadergif-images

# extract data
cat - > file.txt
fname=$(cat file.txt | sed "s/\=.*//")
cat file.txt | sed "s/.*base64,//" > $fname.txt
rm file.txt
cat $fname.txt | base64 -d > $fname.png
rm $fname.txt
