/* 
 This file was generated by Dashcode.  
 You may edit this file to customize your widget or web page 
 according to the license.txt file included in the project.
 */

//
// Function: load()
// Called by HTML body element's onload event when the widget is ready to start
//
function load()
{
    dashcode.setupParts();
}

//
// Function: remove()
// Called when the widget has been removed from the Dashboard
//
function remove()
{
    // Stop any timers to prevent CPU usage
    // Remove any preferences as needed
    // widget.setPreferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
}

//
// Function: hide()
// Called when the widget has been hidden
//
function hide()
{
    // Stop any timers to prevent CPU usage
}

//
// Function: show()
// Called when the widget has been shown
//
function show()
{
    // Restart any timers that were stopped on hide
}

//
// Function: sync()
// Called when the widget has been synchronized with .Mac
//
function sync()
{
    // Retrieve any preference values that you need to be synchronized here
    // Use this for an instance key's value:
    // instancePreferenceValue = widget.preferenceForKey(null, dashcode.createInstancePreferenceKey("your-key"));
    //
    // Or this for global key's value:
    // globalPreferenceValue = widget.preferenceForKey(null, "your-key");
}

//
// Function: showBack(event)
// Called when the info button is clicked to show the back of the widget
//
// event: onClick event from the info button
//
function showBack(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToBack");
    }

    front.style.display = "none";
    back.style.display = "block";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

//
// Function: showFront(event)
// Called when the done button is clicked from the back of the widget
//
// event: onClick event from the done button
//
function showFront(event)
{
    var front = document.getElementById("front");
    var back = document.getElementById("back");

    if (window.widget) {
        widget.prepareForTransition("ToFront");
    }

    front.style.display="block";
    back.style.display="none";

    if (window.widget) {
        setTimeout('widget.performTransition();', 0);
    }
}

if (window.widget) {
    widget.onremove = remove;
    widget.onhide = hide;
    widget.onshow = show;
    widget.onsync = sync;
}


function onkeydown_rgb(event)
{
    if (event && event.which) {
       var key = event.which;    
       var char = String.fromCharCode(key);
       if (/[a-f0-9]/i.test(char)) {
           window.setTimeout(calcRatio, 1);
       } else if (
           key != 8/*backspace*/ && key != 9/*tab*/ && key != 13/*enter*/ && key != 46/*del*/
           && !(key == 86 && (event.metaKey || event.ctrlKey))
       ) {
           event.preventDefault();
       }
    }
}

function onpaste_rgb(event) {
    var input = event.target;
    var oldValue = input.value;
    window.setTimeout(function(){
        if (WCAGColorContrast.validRGB(input.value)) {
            calcRatio();
        } else {
            input.value = oldValue;
        }
    });
}

function calcRatio() {
    var rgb1 = document.getElementById('rgb1').value;
    var rgb2 = document.getElementById('rgb2').value;
    if (WCAGColorContrast.validRGB(rgb1) && WCAGColorContrast.validRGB(rgb2)) {
        var result = WCAGColorContrast.ratio(rgb1, rgb2);
        document.getElementById('result').innerHTML = result.toFixed(1) + ':1';

        var text1 = document.getElementById('example-text1');
        text1.style.color = '#' + rgb1
        if (result > 7) {
            text1.innerHTML = 'Удовлетворяет';
        } else {
            text1.innerHTML = 'Не удовлетворяет';
        }

        var text2 = document.getElementById('example-text2');
        text2.style.color = '#' + rgb1;
        if (result > 4.5) {
            text2.innerHTML = 'Удовлетворяет';
        } else {
            text2.innerHTML = 'Не удовлетворяет';
        }

        document.getElementById('example1').style.backgroundColor = '#' + rgb2;
        document.getElementById('example1').style.border = '1px solid #c6c6c6';

        document.getElementById('example2').style.backgroundColor = '#' + rgb2;
        document.getElementById('example2').style.border = '1px solid #c6c6c6';

    }
}