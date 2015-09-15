(function () {

    'use strict';

    var codeElements = document.getElementsByTagName('code');
    [].forEach.call(codeElements, function(code) {
        code.addEventListener('mouseenter', onCodeMouseEnter, false);
        code.addEventListener('mouseleave', onCodeMouseLeave, false);
    });

    var selectorInput = document.getElementById('selectorInput');
    selectorInput.addEventListener('keyup', executeUserSelector, false);
    selectorInput.addEventListener('search', executeUserSelector, false);

    function executeUserSelector() {
        clearHighlight();
        actionMatchingElements(selectorInput.value, highlightElement);
    }

    function onCodeMouseEnter() {
        actionMatchingElements(this.innerHTML, highlightElement);
        highlightElement(this);
    }

    function onCodeMouseLeave() {
        actionMatchingElements(this.innerHTML, unhighlightElement);
        unhighlightElement(this);
    }

    function actionMatchingElements(selector, action) {
        var matches = document.querySelectorAll(selector);
        [].forEach.call(matches, action);
    }

    function highlightElement(element) {
        element.className += " highlight";
    }

    function unhighlightElement(element) {
        element.className = element.className.replace(' highlight', '');
    }

    function clearHighlight() {
        actionMatchingElements('.highlight', unhighlightElement);
    }

})();