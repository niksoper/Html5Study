module(
    'Calculator tests',
    {
        setup: function () {
            initialize();
        }
    });

test('Btn5 Click Test', function () {
    expect(1);
    var btn = document.getElementById('btn5');
    QUnit.triggerEvent(btn, 'click');
    var result = txtInput.value;
    var expected = '5';
    equal(result, expected, 'Expected value: ' + expected + ' Actual value: ' + result);
});