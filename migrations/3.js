import { describe, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

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

describe('Close - v3.1.0 to v3.1.1', async () => {
  let course, courseCloseGlobals;
  whereFromPlugin('Close - from v3.1.0', { name: 'adapt-close', version: '<3.1.1' });
  mutateContent('Close - add globals if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._extensions._close')) _.set(course, '_globals._extensions._close', {});
    courseCloseGlobals = course._globals._extensions._close;
    return true;
  });
  mutateContent('Close - update navLabel default', async (content) => {
    if (courseCloseGlobals.navLabel === 150) _.set(courseCloseGlobals, 'navLabel', 'Close Course');
    return true;
  });
  checkContent('Close - check globals _close attribute', async content => {
    if (courseCloseGlobals === undefined) throw new Error('Close - globals _close invalid');
    return true;
  });
  checkContent('Close - check navLabel default', async content => {
    if (courseCloseGlobals.navLabel === 150) {
      throw new Error('Close - course navLabel default is invalid');
    }
    return true;
  });
  updatePlugin('Close - update to v3.1.1', { name: 'adapt-close', version: '3.1.1', framework: '>=5.30.3' });

  testSuccessWhere('Close with empty course', {
    fromPlugins: [{ name: 'adapt-close', version: '3.1.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('Close with empty course config', {
    fromPlugins: [{ name: 'adapt-close', version: '3.1.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _close: {} }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-close', version: '3.1.1' }]
  });
});

describe('Close - v3.1.1 to v3.2.0', async () => {
  let course, courseCloseGlobals, courseClose, courseCloseButton, navTooltip;
  whereFromPlugin('Close - from v3.1.1', { name: 'adapt-close', version: '<3.2.0' });
  mutateContent('Close - add globals if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._extensions._close')) _.set(course, '_globals._extensions._close', {});
    courseCloseGlobals = course._globals._extensions._close;
    courseClose = course._close;
    return true;
  });
  mutateContent('Close - remove _button.navigationAriaLabel', async (content) => {
    courseCloseButton = courseClose._button;
    if (_.has(courseCloseButton, 'navigationAriaLabel')) {
      delete courseCloseButton.navigationAriaLabel;
    }
    return true;
  });
  checkContent('Close - check globals _close attribute', async (content) => {
    if (courseCloseGlobals === undefined) throw new Error('Close - globals _close invalid');
    return true;
  });
  checkContent('Close - check _button.navigationAriaLabel removed', async (content) => {
    if (_.has(courseCloseButton, 'navigationAriaLabel')) {
      throw new Error('Close - course _button.navigationAriaLabel was not removed');
    }
    return true;
  });
  updatePlugin('Close - update to v3.2.0', { name: 'adapt-close', version: '3.2.0', framework: '>=5.30.3' });

  testSuccessWhere('Close with empty course', {
    fromPlugins: [{ name: 'adapt-close', version: '3.1.1' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('Close with empty course config', {
    fromPlugins: [{ name: 'adapt-close', version: '3.1.1' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course', _close: {} }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-close', version: '3.2.0' }]
  });
});
