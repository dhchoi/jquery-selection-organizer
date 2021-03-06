[![built with gulp](https://raw.github.com/cyparu/artwork/master/builtwith.png)](http://gulpjs.com)

[jquery-selection-organizer](http://dhchoi.github.io/jquery-selection-organizer)
=====================================

A jQuery plugin that organizes selectable elements by separating the selected elements from the unselected ones. This plugin can be used for any container that contains elements that are intended to be selectable by the user.

Getting Started
---------------

* Either by downloading the [latest source](https://github.com/dhchoi/jquery-selection-organizer/releases/latest) and including the script:

    ```html
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
    <!-- be sure to include after jQuery -->
    <script src="dist/jquery.selection-organizer.min.js"></script>
    ```

* Either by using NPM (`npm install jquery-selection-organizer`) and requiring the module:

    ```javascript
    var $ = require("jquery");
    // be sure to require after jQuery
    require("jquery-selection-organizer");
    ```

* Either by using bower:

        bower install jquery-selection-organizer

Documentation
-------------

* How to Initialize:

    ```javascript
    // how it will look
    var organizer = $(".container").selectionOrganizer({..settings..});

    // actual example
    var organizer = $(".container").selectionOrganizer({
      selector: "li",
      animationProperties: {
        finish: {"height": "toggle"}
      },
      classSelected: "unordered-list-selected",
      callback: function($target) {
        console.log("toggled element: " + $target);
      }
    });
    ```

* How to Change Settings After Initializing:

    ```javascript
    // how it will look
    var organizer = $(".container").selectionOrganizer({..settings..});
    organizer.settings.field = value;

    // actual example
    var organizer = $(".container").selectionOrganizer({sendToEnd: false});
    organizer.settings.sendToEnd = true;
    ```

* Available Settings Fields:
  * selector: selector for elements that will be organized by the plugin
    * *default:* `".selection-organizer-child"`
  * classSelected: class name that will be added to the selected elements
    * *default:* `"selection-organizer-selected"`
  * showAnimation
    * `true`: turns on animations
    * `false`: turns off animations
    * *default:* `true`
  * animationProperties: any [jQuery-compatible](http://api.jquery.com/animate/) animation property value
    * *default:* `{opacity: "toggle"}`
  * animationDuration: any [jQuery-compatible](http://api.jquery.com/animate/) animation duration value
    * *default:* `300`
  * sendToEnd
    * `true`: sends selected elements to end of container
    * `false`: sends selected elements to front of container
    * *default:* `false`
  * callback: callback function that will be called with the selected child's jQuery object after the selection is made
    * *default:* function($target) {}

Examples
--------

If you want to try out examples or interact with the plugin, check out the live [demo](http://dhchoi.github.io/jquery-selection-organizer) page.

Issues
------

If you discover any bugs or happen to come up with ideas that you wish to have implemented, feel free to create an issue on GitHub at:

https://github.com/dhchoi/jquery-selection-organizer/issues

License
-------

Licensed under the ISC license.
