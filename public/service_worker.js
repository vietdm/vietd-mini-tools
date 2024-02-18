/* eslint-disable no-restricted-globals */
/* global chrome */
import { HoatHinh3D } from "./background-script/hoathinh3d.js";

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
HoatHinh3D();

chrome.storage.onChanged.addListener((dataChanged) => {
  let isHh3dChanged = false;
  for (const key of Object.keys(dataChanged)) {
    if (key.startsWith('hh3d')) {
      isHh3dChanged = true;
      break;
    }
  }
  if (isHh3dChanged) {
    HoatHinh3D();
  }
});
