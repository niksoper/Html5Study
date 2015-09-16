$().ready(function() {

    'use strict';

    var
        forEach = Array.prototype.forEach,
        targetClass = 'over',
        moveCounter = document.getElementById('move-count'),
        moves = 0,
        pegs = document.getElementsByClassName('peg'),
        draggableQuery = '[draggable="true"]',
        allDiscsQuery = '.disc',
        sourceElement = null,
        DISC_HEIGHT = 10,
        PEG_HEIGHT = 250;

    initWidths();
    setDraggableHandlers();
    setDropTargetHandlers();

    function initWidths() {
        forEach.call(document.querySelectorAll(allDiscsQuery), setWidth);
    }

    function setDraggableHandlers() {
        clearDraggableHandlers();

        forEach.call(document.querySelectorAll(draggableQuery), function (disc) {
            disc.addEventListener('dragend', dragEnd, false);
            disc.addEventListener('dragstart', dragStart, false);
        });
    }    

    function clearDraggableHandlers() {
        forEach.call(document.querySelectorAll(allDiscsQuery), function (disc) {
            disc.removeEventListener('dragend', dragEnd, false);
            disc.removeEventListener('dragstart', dragStart, false);
        });
    }

    function setDropTargetHandlers() {
        forEach.call(pegs, function (peg) {
            positionDiscs(peg);
            peg.addEventListener('dragenter', cancel, false);
            peg.addEventListener('dragover', dragOver, false);
            peg.addEventListener('dragleave', dragLeave, false);
            peg.addEventListener('drop', drop, false);
        });
    }

    function dragStart(e) {
        sourceElement = this;

        forEach.call(pegs, function (peg) {
            if (canDrop(peg)) {
                $(peg).addClass(targetClass);
            }
        });
    }

    function drop(e) {
        if (sourceElement == null) {
            return;
        }
        cancel(e);

        if (!canDrop(this)) {
            return;
        }

        if (sourceElement.nextElementSibling) {
            sourceElement.nextElementSibling.setAttribute('draggable', true);
        }

        if (e.target.childElementCount) {
            e.target.children[0].removeAttribute('draggable');
            e.target.insertBefore(sourceElement, e.target.children[0]);
        } else {
            e.target.appendChild(sourceElement);
        }

        forEach.call(pegs, function (peg) {
            positionDiscs(peg);
        });

        setDraggableHandlers();

        incrementMoves();

        sourceElement = null;
    }

    function canDrop(peg) {
        if (peg.childElementCount === 0) {
            return true;
        }

        if (sourceElement == null) {
            return false;
        }

        if (sourceElement === peg.children[0]) {
            return false;
        }

        var topDiscSize = getDiscSize(peg.children[0]),
            sourceDiscSize = getDiscSize(sourceElement);

        return sourceDiscSize <= topDiscSize;
    }

    function dragOver(e) {
        if (sourceElement == null) {
            return;
        }
        cancel(e);
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
        return false;
    }

    function getDiscSize(disc) {
        return Number(disc.getAttribute('data-discsize'));
    }

    function setWidth(disc) {
        var discWidth = getDiscSize(disc) * 25;
        $(disc).width(discWidth + 'px');
    }

    function positionDiscs(peg) {
        var pegWidth = $(peg).width(),
            dy = PEG_HEIGHT - (peg.childElementCount * DISC_HEIGHT),
            dx = null;
        forEach.call(peg.children, function (disc, index) {
            dx = ($(disc).width() / -2) + (pegWidth / 2);
            disc.style.transform = 'translate(' + dx + 'px, ' + dy + 'px)';
        });
    }

    function incrementMoves() {
        moves++;
        moveCounter.innerText = moves;

    }
});