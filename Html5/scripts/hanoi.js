$().ready(function() {

    'use strict';

    var
        forEach = Array.prototype.forEach,
        targetClass = 'over',
        pegs = document.getElementsByClassName('peg'),
        discs = document.querySelectorAll('.disc'),
        sourceElement = null,
        DISC_HEIGHT = 10,
        PEG_WIDTH = 15,
        PEG_HEIGHT = 250;

    forEach.call(discs, function (disc) {
        setWidth(disc);
        disc.addEventListener('dragend', dragEnd, false);
        disc.addEventListener('dragstart', dragStart, false);
        disc.addEventListener('mouseover', mouseOver, false);
    });

    forEach.call(pegs, function (peg) {
        positionDiscs(peg);
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

        forEach.call(pegs, function (peg) {
            positionDiscs(peg);
        });
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

    function setWidth(disc) {
        var discWidth = Number(disc.getAttribute('data-discsize')) * 37.5;
        $(disc).width(discWidth + 'px');
    }

    function positionDiscs(peg) {
        var dy = PEG_HEIGHT - (peg.childElementCount * DISC_HEIGHT),
            dx = null;
        forEach.call(peg.children, function (disc, index) {
            dx = ($(disc).width() / -2) + (PEG_WIDTH / 2);
            disc.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
        });
    }

});