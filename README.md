# Close

An extension to add a close button and/or prompts.

As of v2.1.0 this extension will now call `LMSFinish` on close if the [Spoor extension](https://github.com/adaptlearning/adapt-contrib-spoor) is installed, enabled and connected to an LMS. This can be used as a workaround for those Learning Management Systems that are affected by the [disallow sync XHR in page dismissal](https://www.chromestatus.com/feature/4664843055398912) change to Chromium-based browsers (such as Chrome, Edge and Opera) and which have yet to be updated to avoid being affected by this change.

## Installation
* Add the [example JSON](example.json) to `course.json`.
* With [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run `adapt install close`. Alternatively, [download the ZIP](https://github.com/cgkineo/adapt-close/archive/master.zip) and extract into the src > extensions directory.
* Run an appropriate Grunt task.

## Usage
* A close button can be added to the navigation bar.
* When the learner clicks the close button, a [Notify](https://github.com/adaptlearning/adapt_framework/wiki/Core-modules#notify) prompt can be shown that asks the learner to confirm they want to exit (or return to the course)
* A browser dialog can be displayed if the learner closes the window/tab in a normal fashion i.e. using the browser window/tab close button/using an equivalent keyboard shortcut

## Attributes
### \_isEnabled (boolean):
Enables/disables this extension. The default value is `false`. Set this to `true` to enable this extension.

### browserPromptIfIncomplete (string):
Populate with text to display a browser dialog if the learner attempts to close the course window/tab when the course hasn't yet been completed

### browserPromptIfComplete (string):
Populate with text to display a browser dialog if the learner attempts to close the course window/tab when the course has been completed

**Note:** Firefox, Chrome and Edge do not allow custom text to be included in the browser dialog. Additionally, most 'evergreen' browsers now seem to ignore any attempt to display a dialog in response to the `beforeunload` event if the user hasn't interacted with the page.

### \_button (object):
Contains the following settings:

### \_isEnabled (boolean):
Controls whether a close button should be added to the top navigation bar or not. Set this to `false` if you just want to have the browser dialog (see above) show on exit. The default value is `false`.

### \_closeViaLMSFinish (boolean):
Set to `true` to let the SCORM `LMSFinish` routine handle closing the course. This can be useful when the course hasn't been opened in a new window or where the course window can't be closed via JavaScript. This setting should only be enabled if the course will be launched from a SCORM-conformant Learning Management System that supports this functionality. The default value is `false`.

### \_notifyPromptIfIncomplete (object):
Contains the following settings:

#### \_isEnabled (boolean):
Controls whether a prompt should be displayed if the learner clicks the close button when the course hasn't yet been completed. The default value is `false`.

#### title (string):
Title of the prompt e.g. "Confirm close"

#### body (string):
Body text of the prompt e.g. "Are you sure you want to exit the course? You have not yet completed all the content."

#### confirm (string):
Confirm button text e.g. "Exit course".

#### cancel (string):
Cancel button text e.g. "Cancel".

### \_notifyPromptIfComplete (object):
Contains the following settings:

#### \_isEnabled (boolean):
Controls whether a prompt should be displayed if the learner clicks the close button when the course has been completed. The default value is `false`.

#### title (string):
Title of the prompt e.g. "Confirm close"

#### body (string):
Body text of the prompt e.g. "Are you sure you want to exit the course?"

#### confirm (string):
Confirm button text e.g. "Exit course".

#### cancel (string):
Cancel button text e.g. "Cancel".
