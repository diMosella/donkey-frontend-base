import { JSDOM as JsDom } from 'jsdom';
import { requestAnimationFrame } from 'request-animation-frame';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import dirtyChai from 'dirty-chai';
import chaiDom from 'chai-dom';
import chai from 'chai';
chai.use(chaiDom);
chai.use(dirtyChai);

configure({ adapter: new Adapter() });
const dom = new JsDom(`<!doctype html><html><body></body></html>`, {
  url: 'http://localhost/'
});
const win = dom.window;
const doc = win.document;
if (!doc.requestAnimationFrame) {
  doc.requestAnimationFrame = requestAnimationFrame;
}

global.document = doc;
global.window = win;
global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};
global.chai = chai;

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});