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
            highlightMatchingElements(this.value);
        },
        false);

    function onCodeMouseEnter() {
        highlightMatchingElements(this.innerText);
        highlightElement(this);
    }

    function onCodeMouseLeave() {
        unhighlightMatchingElements(this.innerText);
        unhighlightElement(this);
    }

    function highlightMatchingElements(selector) {
        var matches = document.querySelectorAll(selector);
        [].forEach.call(matches, function (match) {
            highlightElement(match);
        });
    }

    function unhighlightMatchingElements(selector) {
        var matches = document.querySelectorAll(selector);
        [].forEach.call(matches, function (match) {
            unhighlightElement(match);
        });
    }

    function highlightElement(element) {
        element.className += " highlight";
    }

    function unhighlightElement(element) {
        element.className = element.className.replace('highlight', '');
    }

    function clearHighlight() {
        unhighlightMatchingElements('.highlight');
    }

})();