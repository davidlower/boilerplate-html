# Welcome to this custom starter build.

This is a simple website build that uses gulp to maximise the workflow, while helping produce a solid website at the end. The aim is to reduce the time needed to setup the dev environment to begin any project.

I have tried to add as many things to this build without adding unnecessary bloat.

Note this is a build for simple **one pager websites**, **landing pages** or **splash pages**.

This is not really design for a website that will use multiple HTML files.

# To start

1) You need node.js. 
2) Pull this repo or download the zip file.
3) In terminal check if you have gulp.
```
$ gulp -v
$ CLI version 3.9.1
```
If you don't see a version popup then you need to install it.
```
$ npm install gulp -g
```
For mac users you may have to do 
```
$ sudo npm install gulp -g
```
4) In terminal 
```
$ npm install
``` 
This will download all the files you need to make gulp work (node-mdoules). Note it will also download the newest versions of the frameworks/addons used. See Frameworks section below.
5)


# How the gulp file works

Gulp will

# Gitignore files

You must remove the hashtags from the top files that are listed, so that they *ARE* ignored. We do not want to have gulp files or package json files when we push our website to the project branch or live.

# Framework and asset addons

This build uses
   JQuery
   SlicK Carousel
   Simple Grid

If you only want to use some of these addons or none - simple go to src>assets>js and remove the file and also src>assets>sass and remove
