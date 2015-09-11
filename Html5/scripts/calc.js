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
    handleOperation('btnPlus', (a, b) => a + b)
    handleOperation('btnMinus', (a, b) => a - b)
    handleOperation('btnTimes', (a, b) => a * b)
    handleOperation('btnDivide', (a, b) => a / b)
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
            let currentResult = Number(txtResult.value)
            let currentInput = Number(txtInput.value)
            txtResult.value = txtResult.value === '' ? currentInput : operation(currentResult, currentInput)
            txtInput.value = ''
        },
        false)
}

function numberClick() {
    txtInput.value = txtInput.value == '0'
        ? this.innerText
        : txtInput.value + this.innerText
}

function handleNumberInputs() {
    for (let i = 0; i < 10; i++) {
        document.getElementById('btn' + i).addEventListener('click', numberClick, false)
    }
}