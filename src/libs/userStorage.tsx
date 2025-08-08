type StorageType = 'session' | 'local';

type UseStorageReturnValue = {

  getItem: (key: string, type?: StorageType) => string;

  setItem: (key: string, value: string, type?: StorageType) => boolean;

  removeItem: (key: string, type?: StorageType) => boolean;

};

const UseStorage = (): UseStorageReturnValue => {
    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();
    const storageType = (type?:string) =>  {
        if (!type || type == 'local') {
            return 'localStorage'
        }
        return 'sessionStorage'
    }

    const getItem = (key: string, type?: StorageType): string => {
      return isBrowser ? window[storageType(type)][key] : '';
    };
  

    const setItem = (key: string, value: string, type?: StorageType): boolean => {
        if (isBrowser) {
            window[storageType(type)].setItem(key, value);
        return true;
        }
        return false;
    }

    const removeItem = (key: string, type?: StorageType): boolean => {
        if (isBrowser) {
            window[storageType(type)].removeItem(key);
            return true;
        }
        return false;
    }
    return {
    getItem,
    setItem,
    removeItem,
  };
}

export default UseStorage;
