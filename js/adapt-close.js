define([ "coreJS/adapt" ], function(Adapt) {

	var CloseView = Backbone.View.extend({

		initialize: function() {
			this.listenTo(Adapt, {
				"navigation:closeButton": this.onCloseButton,
				"close:confirm": this.onCloseConfirm
			}).render();
		},

		render: function() {
			var data = this.model.toJSON();
			data._globals = Adapt.course.get("_globals");
			
			var template = Handlebars.templates.close;

			this.setElement(template(data)).$el.prependTo($(".navigation-inner"));
		},

		onCloseButton: function() {
			var prompt = !Adapt.course.get("_isComplete") ?
				this.model.get("_notifyPromptIfIncomplete") :
				this.model.get("_notifyPromptIfComplete");

			if (!prompt || !prompt._isEnabled) return Adapt.trigger("close:confirm");

			Adapt.trigger("notify:prompt", {
				title: prompt.title,
				body: prompt.body,
				_prompts: [
					{
						promptText: prompt.confirm,
						_callbackEvent: "close:confirm"
					},
					{
						promptText: prompt.cancel
					}
				]
			});
		},

		onCloseConfirm: function() {
			//ensure that the browser prompt doesn't get triggered as well
			var config = Adapt.course.get("_close");
			config.browserPromptIfIncomplete = config.browserPromptIfComplete = false;

			top.window.close();
		}

	});

	function onBeforeUnload(config) {
		return !Adapt.course.get("_isComplete") ?
			config.browserPromptIfIncomplete || undefined :
			config.browserPromptIfComplete || undefined;
	}

	Adapt.once("adapt:initialize", function() {
		var config = Adapt.course.get("_close");

		if (!config || !config._isEnabled) return;

		var button = config._button;

		if (button && button._isEnabled) {
			new CloseView({ model: new Backbone.Model(button) });
		}

		if (config.browserPromptIfIncomplete || config.browserPromptIfComplete) {
			$(window).on("beforeunload", _.partial(onBeforeUnload, config));
		}
	});

});