import { JSDOM as JsDom } from 'jsdom';
import chai from 'chai';
import { requestAnimationFrame } from 'request-animation-frame';
import chaiImmutable from 'chai-immutable';

const dom = new JsDom(`<!doctype html><html><body></body></html>`);
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

chai.use(chaiImmutable);
