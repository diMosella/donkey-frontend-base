const { JSDOM: JsDom } = require('jsdom');
const { polyfill: requestAnimationFrame } = require('raf');
const { cancel: cancelAnimationFrame } = require('raf');
const { configure } = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const dirtyChai = require('dirty-chai');
const chaiDom = require('chai-dom');
const chai = require('chai');
process.env.NODE_ENV = 'test';

configure({ adapter: new Adapter() });

function copyProps (src, target) {
  Object.defineProperties(target, {
    ...Object.getOwnPropertyDescriptors(src),
    ...Object.getOwnPropertyDescriptors(target)
  });
}

const dom = new JsDom(`<!doctype html><html><body></body></html>`, {
  url: 'http://localhost/',
  pretendToBeVisual: true
});
const { window } = dom;
const { document } = window;
if (!document.requestAnimationFrame) {
  document.requestAnimationFrame = requestAnimationFrame;
}
if (!document.cancelAnimationFrame) {
  document.cancelAnimationFrame = cancelAnimationFrame;
}

// FIXME: currently all libraries depend on globally availability of window and document objects
// This is not recommended, see: https://github.com/jsdom/jsdom/wiki/Don't-stuff-jsdom-globals-onto-the-Node-global
global.document = document;
global.window = window;
chai.use(chaiDom);
chai.use(dirtyChai);
global.chai = chai;
global.navigator = { userAgent: 'node.js' };

copyProps(window, global);
