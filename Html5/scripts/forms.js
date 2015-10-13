(function () {

    'use strict'

    jsPlay();
    
    function jsPlay() {
        
        var form = $('#js-test'),
            logger = new Logger('#output'),
            decode = $('#decode')[0],
            reset = form.find('button[type="reset"]'),
            multiselect = $('.multiselect');

        multiselect.mouseup(logSelectedNumbers)
        
        $('#send').click(function(e) {

            logSelectedNumbers();
            
            e.preventDefault();
            return false;
        });
        
        function logSelectedNumbers() {
            var selected = multiselect.find('option:selected');
            
            logger.append('Selected ' + selected.length + ' items');
            for (var i=0; i<selected.length; i++) {
                logger.append(selected[i].value);
            }
            
            logger.write();
        }
        
        $('#serialize').click(function(e) {
            
            logFormSerialized();
            
            e.preventDefault();
            return false;
        })
        
        $('input[name="message"]').on('keyup', logFormSerialized);
        
        decode.addEventListener('change', logFormSerialized, false);
        
        $('.output-container > .clear').click(function(){
            logger.write(''); 
        });
        
        reset.click(function() {
            logger.write(''); 
        });
        
        function logFormSerialized() {
            var formData = form.serialize();
            logger.write(formData);
        }
        
    }
    
    function Logger(selector) {
        
        var element = $(selector),
            msg = '';
        
        this.append = function(line) {
            msg += line + '\n';
        }
        
        this.write = function(m) {
            
            var _m = m || msg;
            
            var finalMsg = decode.checked ? decodeURIComponent(_m) : _m; 
            
            element.text(finalMsg);
            msg = '';
        }
    }
    
    function handlerPlay() {
        var handlers = new Map()
    
        document.addEventListener('click', clickHandler('document'), false)
        handleClickForAll('button', document.getElementsByTagName('button'))
        handleClickForAll('input', document.getElementsByTagName('input'))
        handleClickForAll('fieldset', document.getElementsByTagName('fieldset'))
        handleClickForAll('.invalid', document.getElementsByClassName('invalid'))

        let form = document.querySelector('form.track')

        document.querySelector('input[list]').addEventListener('change', function() {
           console.log('Second input changed') 
           console.dir(form)
           form.dispatchFormChange()
        });

        document.querySelector('input').addEventListener('formchange', function() {
           console.log('Form change handled by first input with value of ${this.value}') 
        });

        function clickHandler(name) {
            let f = function (e) {
                console.log('Click handler for ' + name)
                //dirLog('this', this)
                //dirLog('e', e)
                e.preventDefault()
                e.stopPropagation()
                //this.removeEventListener('click', handlers.get(name), false)
            }

            handlers.set(name, f)

            return f
        }

        function handleClickForAll(name, collection) {
            for (let i = 0; i < collection.length; i++) {
                collection[i].addEventListener('click', clickHandler(name + i), false)
            }
        }

        function dirLog(name, value) {
            console.log(name)
            console.dir(value)
        }
    }
})()
