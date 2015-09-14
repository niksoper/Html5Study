(function () {

    'use strict';

    var messageElement = document.getElementById('message');
    var forEach = Array.prototype.forEach;

    registerHandlers();

    //window.addEventListener(
    //    'beforeonload',
    //    function () {
    //        registerHandlers();
    //    },
    //    false)

    function registerHandlers() {

        document.addEventListener(
            'keydown',
            function (e) {
                if (e.which === 27) {
                    messageElement.innerHTML = '';
                }
                e.stopPropagation();
            },
            false);


        var videos = document.getElementsByTagName('video');
        var sources = document.getElementsByTagName('source');
        var allVideoEvents = getAllEvents(videos[0]);
        var audio = document.querySelector('audio');
        var allAudioEvents = getAllEvents(audio);

        forEach.call(videos, function (video) {

            allVideoEvents.forEach(function (event) {
                video.addEventListener(
                    event,
                    function () {
                        handleMessage('Handled ' + event + ' on ' + this.id);
                    },
                    false);
            });
        });

        allAudioEvents.forEach(function (event) {
            audio.addEventListener(
                event,
                function () {
                    handleMessage('Handled ' + event + ' on ' + this.id);
                },
                false);
        });

        forEach.call(sources, function (source) {
            source.addEventListener(
                'error',
                function (e) {
                    handleMessage('Error loading ' + this.src);
                },
                false);
        });
    }

    function getAllEvents(element) {

        //return ['loadeddata'];

        var exceptions = ['mousemove', 'timeupdate', 'error'];

        var events = [];
        for (var member in element) {
            if (member.indexOf('on') === 0) {
                events.push(member.substring(2));
            }
        }
        return events.filter(e => exceptions.indexOf(e) === -1);
    }

    function handleMessage(msg) {
        addMessage(msg);
        logMessage(msg);
    }

    function logMessage(message) {
        console.log(message);
    }

    function setMessage(message) {
        messageElement.innerHTML = message;
    }

    function addMessage(message) {
        var now = new Date(Date.now()),
            parts = [now.getHours(), now.getMinutes(), now.getSeconds()];

        var paragraph = '<p>' + parts.map(padTime).join(':') + ' ' + message + '<p>';

        messageElement.innerHTML =  paragraph + (messageElement.innerHTML || '');
    }

    function padTime(part) {
        return String(part).length === 1 ? '0' + part : part;
    }

})();