import { JSDOM as JsDom } from 'jsdom';
import { requestAnimationFrame } from 'request-animation-frame';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import dirtyChai from 'dirty-chai';
import chaiDom from 'chai-dom';
import chai from 'chai';

process.env.NODE_ENV = 'test';

configure({ adapter: new Adapter() });
const dom = new JsDom(`<!doctype html><html><body></body></html>`, {
  url: 'http://localhost/',
  pretendToBeVisual: true
});
const { window } = dom;
const { document } = window;
if (!document.requestAnimationFrame) {
  document.requestAnimationFrame = requestAnimationFrame;
}

// FIXME: currently all libraries depend on globally availability of window and document objects
// This is not recommended, see: https://github.com/jsdom/jsdom/wiki/Don't-stuff-jsdom-globals-onto-the-Node-global
global.document = document;
global.window = window;
chai.use(chaiDom);
chai.use(dirtyChai);
global.chai = chai;
global.navigator = { userAgent: 'node.js' };

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});
