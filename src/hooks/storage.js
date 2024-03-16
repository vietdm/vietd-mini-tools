/*global chrome*/
import { useEffect, useState } from "react"

const StorageType = {
  web: 'localStorage',
  extension: 'chromeStorage'
}

export const Keys = {
  lastTab: 'last-tab',
  passwordConfig: {
    lastPw: 'last-password',
    lastPwLen: 'last-password-length',
    lastPwUp: 'last-password-uppercase',
    lastPwLow: 'last-password-lowercase',
    lastPwNum: 'last-password-numbers',
    lastPwSym: 'last-password-symbols'
  },
  uuidConfig: {
    lastUuid: 'last-uuid'
  },
  hh3d: {
    domain: 'hh3d-domain',
    instanceId: 'hh3d-instance-id',
    isActive: 'hh3d-is-active',
    reRun: 'hh3d-rerun-counter',
  }
}

export const useStorage = () => {
  const [isReady, setReady] = useState(false);
  const [manager, setManager] = useState(null);
  const [storageType, setStorageType] = useState(null);

  useEffect(() => {
    if (chrome?.storage?.local) {
      setManager(chrome.storage.local);
      setStorageType(StorageType.extension);
    } else {
      setManager(localStorage)
      setStorageType(StorageType.web);
    }
    setReady(true);
  }, []);

  const isCorrectStorageManage = () => {
    if (!manager) {
      throw new Error('Not found Storage Manager');
    }
    if (Object.keys(StorageType).includes(storageType)) {
      throw new Error('Storage Type not Supported!');
    }
  }

  const chromeStorageGet = async (name) => {
    const result = await manager.get([name]);
    return result[name] ?? null;
  }

  const chromeStorageSet = async (name, value) => {
    return await manager.set({[name]: value});
  }

  const chromeStorageRemove = async (name) => {
    return await manager.remove([name]);
  }

  const localStorageGet = (name) => {
    return new Promise((resolve) => {
      resolve(manager.getItem(name));
    });
  }

  const localStorageSet = (name, value) => {
    if (value === null || value === undefined) {
      return localStorageRemove(name);
    }
    return new Promise((resolve) => {
      resolve(manager.setItem(name, value));
    });
  }

  const localStorageRemove = (name) => {
    return new Promise((resolve) => {
      resolve(manager.removeItem(name));
    });
  }

  const get = (name) => {
    isCorrectStorageManage();
    if (storageType === StorageType.web) {
      return localStorageGet(name);
    }
    if (storageType === StorageType.extension) {
      return chromeStorageGet(name);
    }
  };

  const set = (name, value) => {
    isCorrectStorageManage();
    if (storageType === StorageType.web) {
      return localStorageSet(name, value);
    }
    if (storageType === StorageType.extension) {
      return chromeStorageSet(name, value);
    }
  };

  const remove = (name) => {
    isCorrectStorageManage();
    if (storageType === StorageType.web) {
      return localStorageRemove(name);
    }
    if (storageType === StorageType.extension) {
      return chromeStorageRemove(name);
    }
  }

  return {
    isReady,
    get,
    set,
    remove
  }
}
