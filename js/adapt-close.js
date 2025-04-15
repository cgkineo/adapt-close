import Backbone from 'backbone';
import Adapt from 'core/js/adapt';
import navigation from 'core/js/navigation';
import NavigationButtonModel from 'core/js/models/NavigationButtonModel';
import CloseNavigationButtonView from './CloseNavigationButtonView';

class AdaptClose extends Backbone.Controller {

  initialize() {
    this.onBeforeUnload = this.onBeforeUnload.bind(this);
    this.listenToOnce(Adapt, 'adapt:start', this.onStart);
  }


  get config () {
    return Adapt.course.get('_close');
  }

  static get globalsConfig() {
    return Adapt.course.get('_globals')?._extensions?._close;
  }

  onLanguageChange() {
    $(window).off('beforeunload.close');
    // have to wait until the navbar is ready
    Adapt.once('navigationView:postRender', this.onStart);
  }

  onStart() {
    if (!this.config?._isEnabled) return;

    const button = this.config._button;

    if (button && button._isEnabled) {
      this.setupNavigationButton();
    }

    if (this.config.browserPromptIfIncomplete || this.config.browserPromptIfComplete) {
      $(window).off('beforeunload');// stop spoor from handling beforeunload - if it handles the event first, LMSFinish will get called regardless of what the user selects in the prompt
      $(window).on('beforeunload.close', this.onBeforeUnload);
    }

    this.listenTo(Adapt, 'app:languageChanged', this.onLanguageChange);
  }

  setupNavigationButton() {
    if (!this.config?._isEnabled) return;

    const {
      _navOrder = 100,
      _showLabel = true,
      navLabel = '',
      closeButton = ''
    } = AdaptClose.globalsConfig ?? {};

    const model = new NavigationButtonModel({
      _id: 'adaptclose',
      _order: _navOrder,
      _showLabel,
      _classes: 'btn-icon nav__btn nav__close-btn',
      _iconClasses: '',
      _role: 'button',
      ariaLabel: closeButton,
      text: navLabel,
      config: this.config
    });

    navigation.addButton(new CloseNavigationButtonView({ model }));
  }

  onBeforeUnload() {
    return !Adapt.course.get('_isComplete') ?
      this.config.browserPromptIfIncomplete || undefined :
      this.config.browserPromptIfComplete || undefined;
  }
}

export default (Adapt.adaptclose = new AdaptClose());
