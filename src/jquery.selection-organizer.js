// TODO:
//  1. "add new element" functionality
//  2. animation -> animationType
//     animationSpeed -> animationDuration
//  3. unite concepts (e.g. child vs element)

(function(factory) {
  if(typeof module === "object" && typeof module.exports === "object") {
    factory(require("jquery"));
  } else {
    factory(jQuery);
  }
}(function($) {
  "use strict";

  var animationDefault = {
    opacity: "toggle"
  };

  $.fn.selectionOrganizer = function(options) {
    var dataField = "data-selection-organizer-selected";
    var eventNameSpace = ".selection-organizer";
    var settings = $.extend($.fn.selectionOrganizer.settings, options);

    function repositionElement($el, behavior, target, cb) {
      if(hasAnimation()) {
        var animationProperties = getAnimationProperties();
        $el.animate(animationProperties.start, settings.animationSpeed, function() {
          $el.toggleClass(settings.selectedChildClass)
              .detach()[behavior](target)
              .animate(animationProperties.finish, settings.animationSpeed, function () {
                cb();
                settings.callback();
              });
        });
      }
      else {
        $el.detach()[behavior](target);
      }

      return $el;
    }

    function hasAnimation() {
      if(!settings.showAnimation || $.isEmptyObject(settings.animation)) {
        return false;
      }

      return true;
    }

    function getAnimationProperties() {
      if(settings.animation.start && settings.animation.finish) {
        return {start: settings.animation.start, finish: settings.animation.finish};
      }

      if(!settings.animation.start && !settings.animation.finish) {
        return {start: settings.animation, finish: settings.animation};
      }

      return {start: settings.animation.start || animationDefault, finish: settings.animation.finish || animationDefault};
    }

    return this.each(function(index, element) {
      var $listContainer = $(element);
      var $allChildrenList = getCurrentOrderedListOfChildren();

      // initialize
      $allChildrenList.each(function(index, element) {
        $(element).attr(dataField, false);
        $(element).on("click"+eventNameSpace, clickEventHandler);
      });

      function clickEventHandler(event) {
        removeClickEventHandlers();

        var $this = $(this);
        var hasRepositioned = false;

        // toggle data
        $this.attr(dataField, ($this.attr(dataField) == "true" ? false : true));

        // update list of selected children
        var $selectedChildrenList = $listContainer.find("["+dataField+"=true"+"]");
        var numSelectedChildren = $selectedChildrenList.length;
        var lastSelectedChild = getElementAtEndOfList($selectedChildrenList, numSelectedChildren);

        // reposition clicked element based on case
        if($this.attr(dataField) == "true") {
          // change since the current lastSelectedChild is the one we just clicked
          numSelectedChildren = numSelectedChildren - 1;
          lastSelectedChild = getElementAtEndOfList($selectedChildrenList, numSelectedChildren);

          if(numSelectedChildren > 0) {
            if(!settings.reverse) {
              // append to end of list of selected children
              if(!($this.prev().is(lastSelectedChild))) {
                repositionElement($this, "insertAfter", lastSelectedChild, addClickEventHandlers);
                hasRepositioned = true;
              }
            }
            else {
              // append to start of list of selected children
              if(!($this.next().is(lastSelectedChild))) {
                repositionElement($this, "insertBefore", lastSelectedChild, addClickEventHandlers);
                hasRepositioned = true;
              }
            }
          }
          // bring to front of whole list
          else {
            var $currentList = getCurrentOrderedListOfChildren();
            if(!settings.reverse) {
              // only detach and bring to front if it wasn't originally in front
              var $firstChildInListContainer = $currentList[0];
              if(!($this.is($firstChildInListContainer))) {
                repositionElement($this, "prependTo", $listContainer, addClickEventHandlers);
                hasRepositioned = true;
              }
            }
            else {
              // only detach and bring to end if it wasn't originally in end
              var $lastChildInListContainer = $currentList[$currentList.length-1];
              if(!($this.is($lastChildInListContainer))) {
                repositionElement($this, "appendTo", $listContainer, addClickEventHandlers);
                hasRepositioned = true;
              }
            }
          }
        }
        else {
          // remove from list of selected children
          if(numSelectedChildren > 0) {
            if(!settings.reverse) {
              // only detach if it wasn't already at end of list of selected children
              if(!($this.prev().is(lastSelectedChild))) {
                repositionElement($this, "insertAfter", lastSelectedChild, addClickEventHandlers);
                hasRepositioned = true;
              }
            }
            else {
              // only detach if it wasn't already at first of list of selected children
              if(!($this.next().is(lastSelectedChild))) {
                repositionElement($this, "insertBefore", lastSelectedChild, addClickEventHandlers);
                hasRepositioned = true;
              }
            }
          }
        }

        if(!hasAnimation() || (hasAnimation() && !hasRepositioned)) {
          $this.toggleClass(settings.selectedChildClass);
          addClickEventHandlers();
          settings.callback();
        }
      }

      function getElementAtEndOfList(list, numElements) {
        if(settings.reverse) {
          return list[list.length - numElements] || null;
        }
        return list[numElements-1] || null;
      }

      function getCurrentOrderedListOfChildren() {
        return $listContainer.children(settings.childSelector);
      }

      function removeClickEventHandlers() {
        $allChildrenList.each(function(index, element) {
          $(element).off("click"+eventNameSpace);
        });
      }

      function addClickEventHandlers() {
        $allChildrenList.each(function(index, element) {
          $(element).on("click"+eventNameSpace, clickEventHandler);
        });
      }
    });
  };

  $.fn.selectionOrganizer.settings = {
    childSelector: "li",
    selectedChildClass: "selection-organizer-selected",
    showAnimation: true,
    animation: animationDefault,
    animationSpeed: 300,
    reverse: false,
    callback: function () {}
  };
}));
