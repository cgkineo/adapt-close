# Close

An extension to add a close button and/or prompts.

## Installation

* Add the [example JSON](example.json) to `course.json`.
* With [Adapt CLI](https://github.com/adaptlearning/adapt-cli) installed, run `adapt install close`. Alternatively, download the ZIP and extract into the src > extensions directory.
* Run an appropriate Grunt task.

## Usage

* A close button can be added to the navigation bar.
* Prompts using notify can be triggered on this button.
* In addition, browser dialogs can be displayed if you close the window in a normal fashion.

## Attributes

<table>
	<tr>
		<th colspan="3">Attribute<br></th>
		<th>Type</th>
		<th>Description</th>
		<th>Default</th>
	</tr>
	<tr>
		<td colspan="3"><code>_isEnabled</code></td>
		<td>Boolean</td>
		<td>Set to <code>false</code> to completely disable the extension</td>
		<td><code>false</code></td>
	</tr>
	<tr>
		<td rowspan="11"><code>_button</code></td>
		<td colspan="2"><code>_isEnabled</code></td>
		<td>Boolean</td>
		<td>Adds a close button to the navigation bar</td>
		<td><code>false</code></td>
	</tr>
	<tr>
		<td rowspan="5"><code>_notifyPromptIfIncomplete</code></td>
		<td><code>_isEnabled</code></td>
		<td>Boolean</td>
		<td>Displays a notify prompt if the close button is selected while the course is incomplete</td>
		<td><code>false</code></td>
	</tr>
	<tr>
		<td><code>title</code></td>
		<td>String</td>
		<td>Prompt title</td>
		<td><code>"Confirm close"</code></td>
	</tr>
	<tr>
		<td><code>body</code></td>
		<td>String</td>
		<td>Prompt message<br></td>
		<td><code>"Are you sure you want to close the window?"</code></td>
	</tr>
	<tr>
		<td><code>confirm</code></td>
		<td>String</td>
		<td>Confirm button text</td>
		<td><code>"Close window"</code></td>
	</tr>
	<tr>
		<td><code>cancel</code></td>
		<td>String</td>
		<td>Cancel button text<br></td>
		<td><code>"Cancel"</code></td>
	</tr>
	<tr>
		<td rowspan="5"><code>_notifyPromptIfComplete</code></td>
		<td><code>_isEnabled</code></td>
		<td>Boolean</td>
		<td>Displays a notify prompt if the close button is selected after the course has been completed</td>
		<td><code>false</code></td>
	</tr>
	<tr>
		<td><code>title</code></td>
		<td>String</td>
		<td>Prompt title</td>
		<td><code>"Confirm close"</code></td>
	</tr>
	<tr>
		<td><code>body</code></td>
		<td>String</td>
		<td>Prompt message</td>
		<td><code>"Are you sure you want to close the window?"</code></td>
	</tr>
	<tr>
		<td><code>confirm</code></td>
		<td>String</td>
		<td>Confirm button text</td>
		<td><code>"Close window"</code></td>
	</tr>
	<tr>
		<td><code>cancel</code></td>
		<td>String</td>
		<td>Cancel button text</td>
		<td><code>"Cancel"</code></td>
	</tr>
	<tr>
		<td colspan="3"><code>browserPromptIfIncomplete</code></td>
		<td>String</td>
		<td>Populate with text to display a browser dialog if the window is closed while the course is incomplete</td>
		<td><code>""</code></td>
	</tr>
	<tr>
		<td colspan="3"><code>browserPromptIfComplete</code></td>
		<td>String<br></td>
		<td>Populate with text to display a browser dialog if the window is closed after the course has been completed</td>
		<td><code>""</code></td>
	</tr>
</table>

* Note: Firefox doesn’t currently support custom messages in its dialogs.