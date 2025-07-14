/* eslint-disable no-restricted-globals */
/* global chrome */

async function createOffscreen() {
  await chrome.offscreen.createDocument({
    url: './background-script/offscreen.html',
    reasons: ['BLOBS'],
    justification: 'keep service worker running',
  }).catch(() => {});
}

chrome.runtime.onStartup.addListener(createOffscreen);
self.onmessage = (e) => {};

createOffscreen();
