(function() {
    
    'use strict';
    
    var turn = 'X',
        cells = $('.board > .cell');
    
    cells.click(function() {
        var cell = $(this);
        
        if (cell.hasClass('taken')) {
            return;
        }
        
        cell.text(turn);
        cell.addClass('taken');
        cell.addClass(turn);
        
        turn = turn === 'X' ? 'O' : 'X';
    });
    
    cells.mouseover(function() {
        $(this).attr('data-turn', turn);
    });
    
    cells.mouseout(function() {
        $(this).removeAttr('data-turn');
    });
    
})();