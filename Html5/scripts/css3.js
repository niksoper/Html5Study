(function () {

    'use strict';

    var codeElements = document.getElementsByTagName('code');
    [].forEach.call(codeElements, function(code) {
        code.addEventListener('mouseenter', onCodeMouseEnter, false);
        code.addEventListener('mouseleave', onCodeMouseLeave, false);
    });

    document.getElementById('selectorInput').addEventListener(
        'keyup',
        function () {
            clearHighlight();
            actionMatchingElements(this.value, highlightElement);
        },
        false);

    function onCodeMouseEnter() {
        actionMatchingElements(this.innerText, highlightElement);
        highlightElement(this);
    }

    function onCodeMouseLeave() {
        actionMatchingElements(this.innerText, unhighlightElement);
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
        element.className = element.className.replace('highlight', '');
    }

    function clearHighlight() {
        actionMatchingElements('.highlight', unhighlightElement);
    }

})();