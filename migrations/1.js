import { describe, whereFromPlugin, mutateContent, checkContent, updatePlugin, getCourse, testStopWhere, testSuccessWhere } from 'adapt-migrations';
import _ from 'lodash';

describe('Close Button - v2.2.0 to v3.0.0', async () => {
  let course, courseCloseGlobals, navTooltip;
  whereFromPlugin('Close Button - from v2.2.0', { name: 'adapt-close', version: '<3.0.0' });
  mutateContent('Close Button - add globals if missing', async (content) => {
    course = getCourse();
    if (!_.has(course, '_globals._extensions._close')) _.set(course, '_globals._extensions._close', {});
    courseCloseGlobals = course._globals._extensions._close;
    return true;
  });
  mutateContent('Close Button - add globals _close _navOrder', async (content) => {
    _.set(courseCloseGlobals, '_navOrder', 150);
    return true;
  });
  mutateContent('Close Button - add globals _close _showLabel', async (content) => {
    _.set(courseCloseGlobals, '_showLabel', true);
    return true;
  });
  mutateContent('Close Button - add globals _close navLabel', async (content) => {
    _.set(courseCloseGlobals, 'navLabel', 'Close Course');
    return true;
  });
  mutateContent('Close Button - add globals _close _navTooltip', async (content) => {
    _.set(courseCloseGlobals, '_navTooltip', {});
    navTooltip = courseCloseGlobals._navTooltip;
    return true;
  });
  mutateContent('Close Button - add globals _close _navTooltip _isEnabled', async (content) => {
    _.set(navTooltip, '_isEnabled', true);
    return true;
  });
  mutateContent('Close Button - add globals _close _navTooltip text', async (content) => {
    _.set(navTooltip, 'text', 'Close');
    return true;
  });
  checkContent('Close Button - check globals _close attribute', async content => {
    if (courseCloseGlobals === undefined) throw new Error('Close Button - globals _close invalid');
    return true;
  });
  checkContent('Close Button - check globals _close _navOrder', async content => {
    const isValid = courseCloseGlobals._navOrder === 150;
    if (!isValid) throw new Error('Close Button - globals _close _navOrder invalid');
    return true;
  });
  checkContent('Close Button - check globals _close _showLabel', async content => {
    const isValid = courseCloseGlobals._showLabel === true;
    if (!isValid) throw new Error('Close Button - globals _close _showLabel invalid');
    return true;
  });
  checkContent('Close Button - check globals _close navLabel', async content => {
    const isValid = courseCloseGlobals.navLabel !== 'Close Course';
    if (!isValid) throw new Error('Close Button - globals _close navLabel invalid');
    return true;
  });
  checkContent('Close Button - check globals _close _navTooltip', async content => {
    const isValid = courseCloseGlobals._navTooltip !== undefined;
    if (!isValid) throw new Error('Close Button - globals _close _navTooltip invalid');
    return true;
  });
  checkContent('Close Button - check globals _close _navTooltip _isEnabled', async content => {
    const isValid = navTooltip._isEnabled === true;
    if (!isValid) throw new Error('Close Button - globals _close _navTooltip _isEnabled invalid');
    return true;
  });
  checkContent('Close Button - check globals _close _navTooltip text', async content => {
    const isValid = navTooltip.text === 'Close';
    if (!isValid) throw new Error('Close Button - globals _close _navTooltip text invalid');
    return true;
  });
  updatePlugin('Close Button - update to v3.0.0', { name: 'adapt-close', version: '3.0.0', framework: '>=5.30.3' });

  testSuccessWhere('Close Button with empty course', {
    fromPlugins: [{ name: 'adapt-close', version: '2.2.0' }],
    content: [
      { _id: 'c-100', _component: 'mcq' },
      { _type: 'course' }
    ]
  });

  testSuccessWhere('Close Button with empty course config', {
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
