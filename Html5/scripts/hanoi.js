(function ($) {

    'use strict';

    var
        forEach = Array.prototype.forEach,
        targetClass = 'over',
        pegs = document.getElementsByClassName('peg'),
        draggables = document.querySelectorAll('.disc'),
        sourceElement = null;

    forEach.call(draggables, function (draggable) {
        draggable.addEventListener('dragend', dragEnd, false);
        draggable.addEventListener('dragstart', dragStart, false);
        draggable.addEventListener('mouseover', mouseOver, false);
    });

    forEach.call(pegs, function (peg) {
        peg.addEventListener('dragenter', cancel, false);
        peg.addEventListener('dragover', dragOver, false);
        peg.addEventListener('dragleave', dragLeave, false);
        peg.addEventListener('drop', drop, false);
    });

    function mouseOver(e) {
        console.log('mouseover');
    }

    function dragStart(e) {
        sourceElement = this;
    }

    function drop(e) {
        cancel(e);
        e.target.appendChild(sourceElement);
        sourceElement = null;
    }

    function dragOver(e) {
        cancel(e);
        $(this).addClass(targetClass);
    }

    function dragLeave(e) {
        cancel(e);
        $(this).removeClass(targetClass);
    }

    function dragEnd(e) {
        cancel(e);
        $('.' + targetClass).removeClass(targetClass);
    }

    function cancel(e) {
        e.stopPropagation();
        e.preventDefault();
    }

})($);