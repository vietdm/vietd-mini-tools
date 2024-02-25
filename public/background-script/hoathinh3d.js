/*global chrome*/

const makeId = (length = 5) => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const getAllTabs = () => {
  return new Promise((resolve) => {
    chrome.tabs.query({}, function (tabs) {
      resolve(tabs);
    });
  })
}

const getStorage = async (name) => {
  const result = await chrome.storage.local.get([name]);
  return result[name] ?? null;
}

export const HoatHinh3D = async () => {
  const isActiveAuto = [true, 'true'].includes(await getStorage('hh3d-is-active'));
  if (!isActiveAuto) return;

  const workerId = await getStorage('hh3d-instance-id');
  const domain = await getStorage('hh3d-domain');
  const instanceID = await chrome.instanceID.getID();

  if (instanceID !== workerId) {
    return;
  }

  if (!domain || domain === '') return;

  const domainLogin = domain + 'login?t=' + makeId();
  const domainPhucLoi = domain + 'phuc-loi?t=' + makeId();
  const domainTruyenThua = domain + 'mo-ra-truyen-thua?t=' + makeId();
  const domainThiLuyen = domain + 'thi-luyen-tong-mon?t=' + makeId();

  const createTab = async (url, index = null) => {
    await chrome.tabs.create({
      url,
      active: false,
      ...(typeof index === 'number' ? { index } : {})
    });
  }

  const removeAllTab = async() => {
    for (const tab of await getAllTabs()) {
      if (!tab.url.startsWith('chrome://')) {
        await chrome.tabs.remove(tab.id);
      }
    }
  }

  const main = async () => {
    let retryTime = 0, logined = false;

    await createTab('chrome://newtab');
    await removeAllTab();
    await createTab(domainLogin);

    while (true) {
      if (retryTime >= 30) return;

      retryTime++;
      logined = false;

      for (const tab of await getAllTabs()) {
        if (tab.url.includes('bypass_cache') || tab.url.includes('swcfpc=1')) {
          logined = true;
          break;
        }
      }

      if (logined) break;

      await sleep(1000);
    }

    await removeAllTab();
    await createTab(domainPhucLoi, 0);
    await createTab(domainTruyenThua, 1);
    await createTab(domainThiLuyen, 2);
  }

  main();
  setInterval(main, 60 * 60 * 1000);
}
