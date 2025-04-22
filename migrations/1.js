import { describe, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('Close - v2.0.0 to v2.1.0', async () => {
  let course, courseClose, courseCloseButton;
  const bodyDefault = 'Are you sure you want to exit the course?';
  const confirmDefault = 'Exit course';
  whereFromPlugin('Close - from v2.0.0', { name: 'adapt-close', version: '<2.1.0' });
  mutateContent('Close - add course _close if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_close')) _.set(course, '_close', {});
    courseClose = course._close;
    return true;
  });
  mutateContent('Close - add course _close._button if missing', async (content) => {
    if (!_.has(courseClose, '_button')) _.set(courseClose, '_button', {});
    courseCloseButton = courseClose._button;
    return true;
  });
  mutateContent('Close - add _button._notifyPromptIfIncomplete if missing', async (content) => {
    if (!_.has(courseCloseButton, '_notifyPromptIfIncomplete')) _.set(courseCloseButton, '_notifyPromptIfIncomplete', {});
    return true;
  });
  mutateContent('Close - add _button._notifyPromptIfComplete if missing', async (content) => {
    if (!_.has(courseCloseButton, '_notifyPromptIfComplete')) _.set(courseCloseButton, '_notifyPromptIfComplete', {});
    return true;
  });
  mutateContent('Close - update default for _notifyPromptIfIncomplete body', async (content) => {
    if (!_.has(courseCloseButton, '_notifyPromptIfIncomplete.body') || courseCloseButton._notifyPromptIfIncomplete.body !== bodyDefault) {
      _.set(courseCloseButton, '_notifyPromptIfIncomplete.body', bodyDefault);
    }
    return true;
  });
  mutateContent('Close - update default for _notifyPromptIfIncomplete confirm', async (content) => {
    if (!_.has(courseCloseButton, '_notifyPromptIfIncomplete.confirm') || courseCloseButton._notifyPromptIfIncomplete.confirm !== confirmDefault) {
      _.set(courseCloseButton, '_notifyPromptIfIncomplete.confirm', confirmDefault);
    }
    return true;
  });
  mutateContent('Close - update default for _notifyPromptIfComplete body', async (content) => {
    if (!_.has(courseCloseButton, '_notifyPromptIfComplete.body') || courseCloseButton._notifyPromptIfComplete.body !== bodyDefault) {
      _.set(courseCloseButton, '_notifyPromptIfComplete.body', bodyDefault);
    }
    return true;
  });
  mutateContent('Close - update default for _notifyPromptIfComplete confirm', async (content) => {
    if (!_.has(courseCloseButton, '_notifyPromptIfComplete.confirm') || courseCloseButton._notifyPromptIfComplete.confirm !== confirmDefault) {
      _.set(courseCloseButton, '_notifyPromptIfComplete.confirm', confirmDefault);
    }
    return true;
  });
  checkContent('Close - check course _close attribute', async content => {
    if (courseClose === undefined) throw new Error('Close - course _close invalid');
    return true;
  });
  checkContent('Close - check _close._button attribute', async content => {
    if (courseCloseButton === undefined) throw new Error('Close - _close._button invalid');
    return true;
  });
  checkContent('Close - check _notifyPromptIfIncomplete body default value', async content => {
    if (courseCloseButton._notifyPromptIfIncomplete.body !== bodyDefault) {
      throw new Error('Close - _notifyPromptIfIncomplete body default invalid');
    }
    return true;
  });
  checkContent('Close - check _notifyPromptIfIncomplete confirm default value', async content => {
    if (courseCloseButton._notifyPromptIfIncomplete.confirm !== confirmDefault) {
      throw new Error('Close - _notifyPromptIfIncomplete confirm default invalid');
    }
    return true;
  });
  checkContent('Close - check _notifyPromptIfComplete body default value', async content => {
    if (courseCloseButton._notifyPromptIfComplete.body !== bodyDefault) {
      throw new Error('Close - _notifyPromptIfComplete body default invalid');
    }
    return true;
  });
  checkContent('Close - check _notifyPromptIfComplete confirm default value', async content => {
    if (courseCloseButton._notifyPromptIfComplete.confirm !== confirmDefault) {
      throw new Error('Close - _notifyPromptIfComplete confirm default invalid');
    }
    return true;
  });
  updatePlugin('Close - update to v2.1.0', { name: 'adapt-close', version: '2.1.0', framework: '>=5' });

  testSuccessWhere('Close with empty course', {
    fromPlugins: [{ name: 'adapt-close', version: '2.0.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('Close with empty course config', {
    fromPlugins: [{ name: 'adapt-close', version: '2.0.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _close: {} }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-close', version: '2.1.0' }]
  });
});

describe('Close - v2.1.1 to v2.1.2', async () => {
  let course, courseCloseGlobals;
  whereFromPlugin('Close - from v2.1.1', { name: 'adapt-close', version: '<2.1.2' });
  mutateContent('Close - add globals if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._extensions._close')) _.set(course, '_globals._extensions._close', {});
    courseCloseGlobals = course._globals._extensions._close;
    return true;
  });
  mutateContent('Close - add globals _close _navOrder', async (content) => {
    _.set(courseCloseGlobals, '_navOrder', 150);
    return true;
  });
  checkContent('Close - check globals _close attribute', async content => {
    if (courseCloseGlobals === undefined) throw new Error('Close - globals _close invalid');
    return true;
  });
  checkContent('Close - check globals _close _navOrder', async content => {
    const isValid = courseCloseGlobals._navOrder === 150;
    if (!isValid) throw new Error('Close - globals _close _navOrder invalid');
    return true;
  });
  updatePlugin('Close - update to v2.1.2', { name: 'adapt-close', version: '2.1.2', framework: '>=5' });

  testSuccessWhere('Close with empty course', {
    fromPlugins: [{ name: 'adapt-close', version: '2.1.1' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('Close with empty course config', {
    fromPlugins: [{ name: 'adapt-close', version: '2.1.1' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _close: {} }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-close', version: '2.1.2' }]
  });
});

describe('Close - v2.2.0 to v3.0.0', async () => {
  let course, courseCloseGlobals, courseClose, courseCloseButton, navTooltip;
  whereFromPlugin('Close - from v2.2.0', { name: 'adapt-close', version: '<3.0.0' });
  mutateContent('Close - add globals if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._extensions._close')) _.set(course, '_globals._extensions._close', {});
    courseCloseGlobals = course._globals._extensions._close;
    return true;
  });
  mutateContent('Close - add globals _close navLabel', async (content) => {
    _.set(courseCloseGlobals, 'navLabel', 'Close Course');
    return true;
  });
  mutateContent('Close - add globals _close _navTooltip', async (content) => {
    _.set(courseCloseGlobals, '_navTooltip', {});
    navTooltip = courseCloseGlobals._navTooltip;
    return true;
  });
  mutateContent('Close - add globals _close _navTooltip _isEnabled', async (content) => {
    _.set(navTooltip, '_isEnabled', true);
    return true;
  });
  mutateContent('Close - add globals _close _navTooltip text', async (content) => {
    _.set(navTooltip, 'text', 'Close');
    return true;
  });
  mutateContent('Close - add course _close if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_close')) _.set(course, '_close', {});
    courseClose = course._close;
    return true;
  });
  mutateContent('Close - add course _close._button if missing', async (content) => {
    if (!_.has(courseClose, '_button')) _.set(courseClose, '_button', {});
    courseCloseButton = courseClose._button;
    return true;
  });
  mutateContent('Close - Add _button._isEnabled', async (content) => {
    _.set(courseCloseButton, '_isEnabled', true);
    return true;
  });
  mutateContent('Close - Add _button.navigationAriaLabel', async (content) => {
    _.set(courseCloseButton, 'navigationAriaLabel', 'Close course button');
    return true;
  });
  checkContent('Close - check globals _close attribute', async content => {
    if (courseCloseGlobals === undefined) throw new Error('Close - globals _close invalid');
    return true;
  });
  checkContent('Close - check globals _close navLabel', async content => {
    const isValid = courseCloseGlobals.navLabel === 'Close Course';
    if (!isValid) throw new Error('Close - globals _close navLabel invalid');
    return true;
  });
  checkContent('Close - check globals _close _navTooltip', async content => {
    const isValid = courseCloseGlobals._navTooltip !== undefined;
    if (!isValid) throw new Error('Close - globals _close _navTooltip invalid');
    return true;
  });
  checkContent('Close - check globals _close _navTooltip _isEnabled', async content => {
    const isValid = navTooltip._isEnabled === true;
    if (!isValid) throw new Error('Close - globals _close _navTooltip _isEnabled invalid');
    return true;
  });
  checkContent('Close - check globals _close _navTooltip text', async content => {
    const isValid = navTooltip.text === 'Close';
    if (!isValid) throw new Error('Close - globals _close _navTooltip text invalid');
    return true;
  });
  checkContent('Close - check course _close attribute', async content => {
    if (courseClose === undefined) throw new Error('Close - course _close invalid');
    return true;
  });
  checkContent('Close - check _close._button attribute', async content => {
    if (courseCloseButton === undefined) throw new Error('Close - _close._button invalid');
    return true;
  });
  checkContent('Close - check _button._isEnabled value', async content => {
    if (courseCloseButton._isEnabled !== true) {
      throw new Error('Close - course _button._isEnabled invalid');
    }
    return true;
  });
  checkContent('Close - check _button.navigationAriaLabel value', async content => {
    if (courseCloseButton.navigationAriaLabel !== 'Close course button') {
      throw new Error('Close - course _button.navigationAriaLabel invalid');
    }
    return true;
  });
  updatePlugin('Close - update to v3.0.0', { name: 'adapt-close', version: '3.0.0', framework: '>=5.30.3' });

  testSuccessWhere('Close with empty course', {
    fromPlugins: [{ name: 'adapt-close', version: '2.2.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('Close with empty course config', {
    fromPlugins: [{ name: 'adapt-close', version: '2.2.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _close: {} }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-close', version: '3.0.0' }]
  });
});
