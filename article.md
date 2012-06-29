# Building a Google News Feed Reader as a Chrome App

## Introduction

TBA

## Design

**Tokyo to write**

## The application architecture

Starting a Google Chrome app requires only one file in addition to normal web application files. The manifest file contains all of the information Chrome needs to launch your application. The [manifest file][manifest] is written in JSON so should be familiar to most JavaScript developers already. It is used to configure such things as the default language to use, the apps icons, permissions and the file to load.

The app has been written using the [Backbone.js][backbone] framework as it's one of the most popular JavaScript frameworks available today and should appeal to many developers. In general the [backbone patterns][bb_patterns] have been used so that a common convention is used throughout the code base.

For ease of development the source files have been split up into individual files containing specific parts of functionality. The applications folder structure looks like this...

    app/                    # this is where the applications code lives
      _locals/              # contains all of the localization files
      javascripts/
        lib/                # library code including the Google new feed parser
        models/             # backbone models and collections
        templates/          # underscore template source files
        vendor/             # external libraries required by the application
        views/              # backbone views
        app.js              # defines the application namespace and other application level code
        background-setup.js # code to initialize the background process
        foreground-setup.js # code to initialize the foreground process
        background.js       # this launches the main application
        settings.json       # settings requires for the application to run
        setup.js            # application initialization code
        templates.js        # the compiled underscore templates
      stylesheets/          # stylesheet files
      main.html             # html file that runs the application
      manifest.json         # this is the file that Google Chrome uses to install and run the application
    spec/                   # the Jasmine test suit
    tasks/                  # code for jake tasks
    Jakefile                # Jake tasks are included in this file

The individual source files are then compiled and minified into a single file using a [Jake][jake] task.

* Settings
* i18n
* etc.

## Considerations

When developing a Chrome App there are certain issues that need to be taken into consideration. One of these issues is security, as Chrome Apps can provide much greater access to the local computer than a normal page loaded into a browser Google have tightened the security in certain areas. One of these being the ability to load remote assets. As our App needs to load remote images and save them to the filesystem for offline usage we need to load images using an `XMLHttpRequest`. This is covered in more detail later in the article.

Chrome Apps are able to run in the background even when the App's window itself is not open, in fact the App's main window is launched from the background process. In the news reader App we use this background process to download new articles when the main App window is closed and also notify users when there are new articles to read.

When unit testing this Chrome App we decided to use [Jasmine][jasmine] as it's a popular and well featured testing framework. The tests has been setup to run in a standard Chrome browser using the Jasmine gem's Rake task, although this does not allow us to test all of the Chrome App specific code it does allow use to run the tests frequently and easily, in this instance it was thought more important to be able to run the tests easily and stub out any Chrome App specific code as this only makes up a very small part of the code base. As you probably know, if a test suite is hard to run it won't get run very often!

## Processing the news feeds

Processing  google news feeds is one of the main tasks the App needed accomplish and is a good place to start, without any articles there is nothing to display. As the App is using [jQuery][jquery] it made sense to use the [jFeed][jfeed] plugin to take case of some of the low level tasks involved in getting and processing the feeds. The jFeed library handles requesting and downloading the feed as well as parsing it into objects that are easy to work with. A small modification to the library was made as the Google feeds return a category element we need to work with, adding the `category` property to the `JFeedItem.prototype` object and parsing the category from the feed for both Atom and RSS feed was all that's needed.

    item.category = jQuery(this).find('category').eq(0).text();

Once we had the feed in a manageable format we needed to extract the image from the `descriptionn` element and split the article title from the source in the `title` element. To extract the image a jQuery selector is used as it's a very robust way to parse HTML. The downside if that when HTML is loaded into a jQuery the browser will request any assets linked within the code. In our case this isn't so much of a problem as the requests are blocked by Chrome and the only side effect is lots of warnings in the console. Lastly, the images returned by the Google feed are much smaller than we need, Google does generate larger images so we have a regex to replace the default image `0.jpg` with `11.jpg` which is 150 x 150 pixels.

    imageUrl = $('img', item.description).eq(0).attr('src');
    if (imageUrl) {
      image = imageUrl.replace(/\/0\.jpg$/, '/11.jpg').replace(/^\/\//, 'http://');
    }else{
      image = "";
    }

* Stumbling blocks
* How it was done

## Displaying the articles

## Filtering categories

* Using the displayed articles collection
* Re-rendering the view

## i18n

## Dealing with settings

* Overriding the language
* Changing the name of the country on language change
* Setting default categories

## Web intents(sharing)

**Chris to write**

## Searching

## Notifications

## Keyboard navigation

**Chris to write**

[manifest]: http://code.google.com/chrome/extensions/manifest.html
[backbone]: http://backbonejs.org/
[bb_patterns]: http://ricostacruz.com/backbone-patterns/
[jake]: https://github.com/mde/jake
[jasmine]: http://pivotal.github.com/jasmine/
[jquery]: http://jquery.com/
[jfeed]: https://github.com/jfhovinne/jFeed
