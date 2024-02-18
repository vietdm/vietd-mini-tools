setInterval(async () => {
  const serviceWorker = await navigator.serviceWorker.ready;
  serviceWorker.active.postMessage('keepAlive');
}, 20e3);
