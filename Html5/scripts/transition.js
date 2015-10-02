(function() {
    document.querySelector('.horse').addEventListener(
        'click', 
        function() {
            $(this).toggleClass('animate')
        },
        false);
})();