/*
* Close
* License - https://github.com/adaptlearning/adapt_framework/blob/master/LICENSE
* Maintainers - Tom Greenfield
*/

define(function(require) {

	var Adapt = require("coreJS/adapt");
	var Backbone = require("backbone");

	var CloseView = Backbone.View.extend({

		initialize: function() {
			this.listenTo(Adapt, "remove", this.remove);
			this.listenTo(Adapt, "navigation:close", this.onCloseButton);
			this.listenTo(Adapt, "confirmClose", this.close);
			this.render();
		},

		render: function() {
			var template = Handlebars.templates.close;
			var data = this.model.toJSON();

			this.$el = $(template(data));
			$(".navigation-inner").prepend(this.$el);

			return this;
		},

		onCloseButton: function() {
			var prompt = !Adapt.course.get("_isComplete") ?
				this.model.get("_promptIfIncomplete") :
				this.model.get("_promptIfComplete");

			if (prompt) {
				Adapt.trigger("notify:prompt", {
					title: prompt.title,
					body: prompt.body,
					_prompts: [
						{
							promptText: prompt.okButton,
							_callbackEvent: "confirmClose"
						},
						{
							promptText: prompt.cancelButton
						}
					]
				});
			} else {
				Adapt.trigger("confirmClose");
			}
		},

		close: function() {
			top.window.close();
		}

	});

	function onCloseWindow() {
		if (!Adapt.course.get("_isComplete")) {
			return Adapt.course.get("_close").promptIfIncomplete || undefined;
		} else {
			return Adapt.course.get("_close").promptIfComplete || undefined;
		}
	}

	Adapt.on("app:dataReady", function() {
		var prompts = Adapt.course.get("_close") &&
			(Adapt.course.get("_close").promptIfIncomplete || 
			Adapt.course.get("_close").promptIfComplete);

		if (prompts) $(window).on("beforeunload.close", onCloseWindow);
	});

	Adapt.on("router:menu router:page", function() {
		var button = Adapt.course.get("_navigation") &&
			Adapt.course.get("_navigation")._extensions &&
			Adapt.course.get("_navigation")._extensions._close;
		
		button = button ? Adapt.course.get("_navigation")._extensions._close : "";
		if (button._isEnabled) new CloseView({ model: new Backbone.Model(button) });
	});

});