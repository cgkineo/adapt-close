import Adapt from 'core/js/adapt';
import NavigationButtonView from 'core/js/views/NavigationButtonView';
import tooltips from 'core/js/tooltips';

export default class CloseNavigationButtonView extends NavigationButtonView {

  attributes() {
    const attributes = this.model.toJSON();
    return {
      name: attributes._id,
      role: attributes._role === 'button' ? undefined : attributes._role,
      'aria-label': Adapt.adaptclose.config._button.navigationAriaLabel,
      'data-order': attributes._order,
      'data-tooltip-id': 'adaptclose'
    };
  }

  static get template() {
    return 'CloseNavigationButton.jsx';
  }

  className() {
    return 'btn-icon nav__btn nav__adaptclose-btn';
  }

  initialize(options) {
    super.initialize(options);
    this.setUpEventListeners();
    this.render();

    tooltips.register({
      _id: 'adaptclose',
      ...Adapt.course.get('_globals')?._extensions?._close?._navTooltip || {}
    });
  }

  setUpEventListeners() {
    this.listenTo(Adapt, {
      'navigation:closeButton': this.onCloseButton,
      'close:confirm': this.onCloseConfirm,
      'app:languageChanged': this.remove
    });
  }

  onCloseButton() {
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
  }

  onCloseConfirm() {
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

};
