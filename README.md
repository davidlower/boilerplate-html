# Welcome to this custom starter build.

This is a simple website build that uses gulp to maximise the workflow, while helping produce a solid website at the end. The aim is to reduce the time needed to setup the dev environment to begin any project.

I have tried to add as many things to this build without adding unnecessary bloat.

   ~ Favicons.

   ~ Google / twitter / facebook metatags in the `<head>` section of the HTML file.

Note this is a build for simple **one pager websites**, **landing pages** or **splash pages**.

This is not really design for a website that will use multiple HTML files.


# To start

### You need node.js.
### Pull this repo or download the zip file.
### In terminal check if you have gulp.
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
### In terminal
```
$ npm install
```
This will download all the files you need to make gulp work (node-modules). Note it will also download the newest versions of the frameworks/addons used. See Frameworks section below.
### Your work environment is ready.
Read the next section about gulp to understand how to run browserSync.
### Updating your favicons
Visit this site  - https://www.favicon-generator.org/.

Generate your favicons. You **do not** need to add the links in the html file. That has been taken care of. Download your favicons and put **all** the files inside of your favicon.ico folder into the favicon.ico folder found in `src > assets`.

### Updating metatags
You can use this website to update your metatags to save repetition - https://www.heymeta.com/.
But I have added the code and reminders of what you need in the HTML file already for you.

### Finishing the project
When your project is finished and you are ready to launch - you simply push the `production folder` to the host repo or give it to your hosting provider. **important** - read notes on gitignore file below.


# How the gulp file works

I have set up gulp with 3 commands. Type any one of these commands into terminal.
```
$ gulp
$ gulp minify
$ gulp all
```
'gulp' is the generic command to start the basic everyday use case - this will kick start browerSync.

'gulp minify' is the command to minify all your files in the production folder.

'gulp all' is the command to run **ALL** tasks together.

In short I have removed the minify tasks from the generic 'gulp' command because these tasks are not necessary to constantly update with every save. This will speed up your browserSync and gulp performance. However you will need to remember to minify your code when pushing to development. If you would rather not have the hassle to remember this, you can simply cover it all with 'gulp all'.

```
$ ctrl + c
```
will quit any of the actively running gulp commands.


# Gitignore files

You must remove the hashtags from the top files that are listed (clearly marked in the file), so that they **ARE** ignored. You do not want to have gulp files or package-json files when we push your website to the project branch or live.


# Framework and Assets

This build uses

   ~ JQuery

   ~ Slick Carousel

   ~ Simple Grid

If you only want to use some of these addons or none - simple go to `src > assets > js or sass`. Files are clearly named so delete which ever you don't need and if you don't want any, delete both the js and sass folder all together. Make sure you check both js and sass folders.
