import { JSDOM as JsDom } from 'jsdom';
import { requestAnimationFrame } from 'request-animation-frame';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

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

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key];
  }
});
