(function() {
    
    'use strict';
    
    var outlined = $('[data-outline]'),
        outlineClass = 'outline';
    
    $('#toggle-outline').change(function() {
        if (this.checked) {
            outlined.addClass(outlineClass);
        } else {
            outlined.removeClass(outlineClass);    
        }         
    });
    
})();