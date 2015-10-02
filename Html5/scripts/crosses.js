(function() {
    
    'use strict';
    
    var turn = 'X',
        cells = $('.board > div:not(.message)');
    
    cells.click(function() {
        var cell = $(this);
        
        if (cell.hasClass('taken')) {
            return;
        }
        
        cell.text(turn);
        cell.addClass('taken');
        cell.addClass(turn);
        
        turn = turn === 'X' ? 'O' : 'X';
        
        checkEnd();
    });
    
    cells.mouseover(function() {
        $(this).attr('data-turn', turn);
    });
    
    cells.mouseout(function() {
        $(this).removeAttr('data-turn');
    });
    
    function checkEnd() {
        var first = $('.board > div:nth-child(1)');
        console.log('First cell: ' + first.text())
    }
    
})();