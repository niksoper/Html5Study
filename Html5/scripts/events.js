(function () {

    'use strict'

    var handlers = new Map()
    
    document.addEventListener('click', handler('document'), false)
    handleClickForAll('button', document.getElementsByTagName('button'))
    handleClickForAll('input', document.getElementsByTagName('input'))
    handleClickForAll('fieldset', document.getElementsByTagName('fieldset'))
    handleClickForAll('.invalid', document.getElementsByClassName('invalid'))

    
    function handler(name) {
        let f = function (e) {
            console.log('Handler for ' + name)
            //dirLog('this', this)
            //dirLog('e', e)
            e.preventDefault()
            e.stopPropagation()
            this.removeEventListener('click', handlers.get(name), false)
        }
        
        handlers.set(name, f)
        
        return f
    }

    function handleClickForAll(name, collection) {
        for (let i = 0; i < collection.length; i++) {
            collection[i].addEventListener('click', handler(name + i), false)
        }
    }

    function dirLog(name, value) {
        console.log(name)
        console.dir(value)
    }

})()
