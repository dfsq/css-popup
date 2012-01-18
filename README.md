# jQuery imageHalftone plugin

Basic lightweight popup plugin for jQuery. All popup positioning within the screen is done with CSS only. No offset or top calculations, only CSS.

## Available options

* closeBtn: [Boolean:true] Show popup close button or not.
* hideOnOverlayClick: [Boolean:false] Whether to close popup on overlay click.
* hideOnContentClick: [Boolean:false] Whether to close popup on popup area click.
* onShow: [Function:null] Callback fired after popup is opened.
* onClose: [Function:null] Callback fired after popup is closed.

## Example of usage

Use with dynamic DOM elements:

```javascript
$('<div class="toast">Some dynamic content</div>').cssPopup();
```

Pass some options:

```javascript
$('<div class="toast">Settings saved</div>').cssPopup({
    closeBtn: false,
    hideOnOverlayClick: true
});
```

Or add some animation:

```javasscript
$('<div class="toast">Settings saved</div>').cssPopup({
    closeBtn: false,
    hideOnOverlayClick: true,
    onShow: function(popup) {
        popup.delay(2000).fadeOut(function() {
            $.cssPopup.close();
        });
    }
});
```

Display arbitrary HTML content:

```html
<script type="text/template" id="popup-content">
    <!-- Some HTML here -->
    <a class="csspopup-close">Custom close button</a>
</script>
```
```javascript
var content = $('#popup-content').html();
$.cssPopup(content, {
    closeBtn: false
});
```

Close popup:

```javascript
// Just close
$.cssPopup.close();

// Invoke callback on close
$.cssPopup.close(function() {
    // Do something
});
```

At any moment you can change default options:

```javascript
$.cssPopup.defaults.onShow = function() { /* Global onShow callback */ };
$.cssPopup('Hello, local onShow callback', function() { /* Local onShow callback */ });
```