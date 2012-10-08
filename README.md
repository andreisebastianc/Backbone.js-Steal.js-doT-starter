Backbone.js with Steal.js and doT as template system
================================

## Installation ##

Clone this project and start building on top of it. I would discard the `.git`
folder after starting and create a new, initial commit.

## Logic ##

When I started this project, I decided to put all js logic in the app folder.
I would argue that a good structure would be: modules-models-collections-views.
I would create custom modules used mostly as UI components or communication
enablers and use backbone style models-collections to map the application
logic. Layouts-views could be solved by using just some extra folders to
separate between pages and nested views.

Views are get from the server via a sync call. The alternative would be using
deferred, but although this seems more popular at the moment, I decided it
would be easier to do this, because in production the views could be strings
under the same namespace and the handling logic would be the same.

## Components ##

* [Backbone.js](http://backbonejs.org/)
* [Backbone Layout Manager](https://github.com/tbranyen/backbone.layoutmanager)
* [Lo-Dash](https://github.com/bestiejs/lodash)
* [StealJs](http://javascriptmvc.com/docs.html#!stealjs)
* [doT](https://github.com/olado/doT)
* [jQuery++](http://jquerypp.com/)  * only animate and fastfix
