define([
  'core/js/adapt'
], function(Adapt) {

  const CloseView = Backbone.View.extend({

    initialize: function() {
      this.listenTo(Adapt, {
        'navigation:closeButton': this.onCloseButton,
        'close:confirm': this.onCloseConfirm,
        'app:languageChanged': this.remove
      }).render();
    },

    render: function() {
      const data = this.model.toJSON();
      data._globals = Adapt.course.get('_globals');

      const template = Handlebars.templates.close;

      this.setElement(template(data)).$el.appendTo('.nav__inner');
    },

    onCloseButton: function() {
      const prompt = !Adapt.course.get('_isComplete') ?
        this.model.get('_notifyPromptIfIncomplete') :
        this.model.get('_notifyPromptIfComplete');

      if (!prompt || !prompt._isEnabled) return Adapt.trigger('close:confirm');

      Adapt.notify.prompt({
        title: prompt.title,
        body: prompt.body,
        _prompts: [
          {
            promptText: prompt.confirm,
            _callbackEvent: 'close:confirm'
          },
          {
            promptText: prompt.cancel
          }
        ]
      });
    },

    onCloseConfirm: function() {
      // ensure that the browser prompt doesn't get triggered as well
      const config = Adapt.course.get('_close');
      config.browserPromptIfIncomplete = config.browserPromptIfComplete = false;

      const scormWrapper = require('extensions/adapt-contrib-spoor/js/scorm/wrapper');
      if (scormWrapper) {
        const scormWrapperInstance = scormWrapper.getInstance();
        if (scormWrapperInstance.lmsConnected && !scormWrapperInstance.finishCalled) {
          scormWrapperInstance.finish();
        }
      }

      if (config._button._closeViaLMSFinish) return;

      top.window.close();
    }

  });

  function onBeforeUnload(config) {
    return !Adapt.course.get('_isComplete') ?
      config.browserPromptIfIncomplete || undefined :
      config.browserPromptIfComplete || undefined;
  }

  function initialise() {
    const config = Adapt.course.get('_close');

    if (!config || !config._isEnabled) return;

    const button = config._button;

    if (button && button._isEnabled) {
      new CloseView({ model: new Backbone.Model(button) });
    }

    if (config.browserPromptIfIncomplete || config.browserPromptIfComplete) {
      $(window).off('beforeunload');// stop spoor from handling beforeunload - if it handles the event first, LMSFinish will get called regardless of what the user selects in the prompt
      $(window).on('beforeunload.close', _.partial(onBeforeUnload, config));
    }
  }

  Adapt.once('adapt:start', function() {
    initialise();

    Adapt.on('app:languageChanged', function () {
      $(window).off('beforeunload.close');
      // have to wait until the navbar is ready
      Adapt.once('router:location', initialise);
    });
  });
});
