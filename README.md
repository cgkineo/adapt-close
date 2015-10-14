# adapt-close

An extension to add a close button and/or prompts.

## Installation

* Copy the extension folder into the src > extensions directory and run an appropriate Grunt task.

### Navigation bar

* To add a close button to Adapt’s navigation bar, insert the following into the `_navigation._extensions` object in `course.json`:
```json
"_close": {
	"_isEnabled": true,
	"_iconTypeClass": "icon-cross",
	"_tooltip": "Close",
	"_showTooltip": true,
	"_layout": "right",
	"_promptIfIncomplete": null,
	"_promptIfComplete": null
}
```
* To enable Notify prompts for this button, populate `_promptIfIncomplete` and/or `_promptIfComplete` with:
```json
{
	"title": "Confirm close",
	"body": "Are you sure you want to close the window?",
	"okButton": "OK",
	"cancelButton": "Cancel"
}
```

### Title bar

* For prompts upon selecting the close button in the browser title bar, add the following to `course.json`:
```json
"_close": {
	"promptIfIncomplete": "",
	"promptIfComplete": ""
}
```
* Populate `promptIfIncomplete` and/or `promptIfComplete` with a custom message to enable browser dialogs.
* Note: Firefox doesn’t currently support custom messages in its dialogs.
