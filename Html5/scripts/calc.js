'use strict';

var txtInput,
    txtResult;

window.addEventListener('load', initialize, false)

function initialize() {
    txtInput = document.getElementById('txtInput')
    txtResult = document.getElementById('txtResult')
    handleNumberInputs()
    handleClear()
    handleClearEntry()
    handleOperation('btnPlus', function(a, b) { return a + b })
    handleOperation('btnMinus', function(a, b) { return a - b })
    handleOperation('btnTimes', function(a, b) { return a * b })
    handleOperation('btnDivide', function(a, b) { return a / b })
    handleOperation('btnSquare', function(a) { return a * a })
}

function handleClear() {
    document.getElementById('btnClear').addEventListener(
        'click',
        function () {
            txtInput.value = ''
            txtResult.value = ''
        },
        false)
}

function handleClearEntry() {
    document.getElementById('btnClearEntry').addEventListener(
        'click',
        function () {
            txtInput.value = ''
        },
        false)
}

function handleOperation(buttonId, operation) {
    document.getElementById(buttonId).addEventListener(
        'click',
        function () {
            var currentResult = Number(txtResult.value)
            var currentInput = Number(txtInput.value)
            txtResult.value = txtResult.value === '' ? currentInput : operation(currentResult, currentInput)
            txtInput.value = ''
        },
        false)
}

function numberClick() {
    txtInput.value = txtInput.value == '0'
        ? this.innerHTML
        : txtInput.value + this.innerHTML
}

function handleNumberInputs() {
    for (var i = 0; i < 10; i++) {
        document.getElementById('btn' + i).addEventListener('click', numberClick, false)
    }
}