(function () {

    'use strict'

    var handlers = new Map()
    
    document.addEventListener('click', clickHandler('document'), false)
    handleClickForAll('button', document.getElementsByTagName('button'))
    handleClickForAll('input', document.getElementsByTagName('input'))
    handleClickForAll('fieldset', document.getElementsByTagName('fieldset'))
    handleClickForAll('.invalid', document.getElementsByClassName('invalid'))
    
    let form = document.querySelector('form')
    
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

})()
