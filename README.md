# FullMod
FullMod is a tiny jQuery full-screen modal component.

* [Dependencies](#dependencies)
* [Usage](#usage)
* [Events](#events)
* [Methods](#methods)
* [CSS classes](#css-classes)

## Dependencies
* [jQuery](https://jquery.com/)

## Usage
Inside your `head`, add the following code:

    <link href="fullmod.min.css" rel="stylesheet" type="text/css">

Before closing the `body` element, add the following code:

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
    <script src="fullmod.min.js"></script>
    
Add this HTML in your page:

    <div id="myFullMod" class="fullmod">
        <div class="fullmod-content">
    
            <!--FullMod Header-->
            <div class="fullmod-head">
                <h2 class="title">This is my title</h2>
                <div class="buttons">
                    <a href="#" class="btn-close">&times;</a>
                </div>
            </div>
    
            <!--FullMod Body-->
            <div class="fullmod-body">
                <p>This is the content of the modal.</p>
            </div>
    
        </div>
    </div>

Then you can show the modal using:

    <script>
        var myFullMod = $('#myFullMod').fullmod();  
        myFullMod.show();
    </script>
    
## Events
You can attach events passing them as options in the fullmod constructor.
    
    $('#myFullMod').fullmod({
        onShowing: function(params) {
            console.log('showing');
        }
    });
    
You can access to the fullmod instance from all events using the `this` object.

**onShowing(params)** _(type: `function`, default value: `null`)_

Function executed when the modal is hidden and the `show` method is called. If return `false`, the modal will never show.
The `params` parameter is the one specified when the `show` method is called.

**onShown** _(type: `function`, default value: `null`)_

Function executed when the modal is completely shown after the `show` method is called.

**onHiding(params)** _(type: `function`, default value: `null`)_

Function executed when the modal is shown and the `hide` method is called. If return `false`, the modal will never hidden.
The `params` parameter is the one specified when the `hide` method is called.


**onHidden** _(type: `function`, default value: `null`)_

Function executed when the modal is completely hidden after the `hide` method is called.

## Methods

**show(params)**

Shows the modal unless the `onShowing` function call returns `false`. If the modal is already shown and the `show` method is called, nothing happens (the `onShowing` function won't be called).

The `params` parameter is the object to pass to the `onShowing` event.

**hide(params)**

Shows the modal unless the `onHiding` function call returns `false`. If the modal is already hidden and the `hide` method is called, nothing happens (the `onHiding` function won't be called).

The `params` parameter is the object to pass to the `onHiding` event.

## CSS classes

| Action                | Description                                                                                                 | Classes           |
|-----------------------|-------------------------------------------------------------------------------------------------------------|-------------------|
| Page loaded.          | The modal is hidden.                                                                                        | `fullmod-hidden`  |
| `show` method called. | The modal is hidden. If the `onShowing` function is null or returns `false`, the animation will be started. | `fullmod-showing` |
|                       | Show animation completed.                                                                                   | `fullmod-shown`   |
| `hide` method called. | The modal is shown. If the `onHiding` function is null or returns `false`, the animation will be started.   | `fullmod-hiding`  |
|                       | Hide animation completed.                                                                                   | `fullmod-hidden`  |
