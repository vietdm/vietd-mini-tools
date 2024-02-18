import { Tooltip } from "react-tooltip";
import { IoCopyOutline } from "react-icons/io5";
import { IoReload } from "react-icons/io5";
import { useToast } from "../../hooks/toast";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Keys, useStorage } from "../../hooks/storage";

const iconClassName = [
  'p-[6px]',
  'rounded-md',
  'cursor-pointer',
  'transition',
  'hover:bg-[rgba(0,0,0,0.05)]',
  'outline-none',
].join(' ');

export const RandomUuidV4 = () => {
  const [isReady, setReady] = useState(false);
  const [allowRandomUuid, setAllowRandomUuid] = useState(true);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [uuid, setUuid] = useState('');
  const toast = useToast();
  const storage = useStorage();

  useEffect(() => {
    if (!isReady) return;
    if (!allowRandomUuid) {
      setAllowRandomUuid(true);
      return;
    }
    const uuid = uuidv4();
    setUuid(uuid);
    storage.set(Keys.uuidConfig.lastUuid, uuid);
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [refreshCounter, isReady]
  );

  useEffect(() => {
    if (!storage.isReady) return;
    const init = async () => {
      const lastUuid = await storage.get(Keys.uuidConfig.lastUuid);
      if (lastUuid) {
        setUuid(lastUuid);
        setAllowRandomUuid(false);
      }
      setReady(true);
    }
    init();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storage.isReady]
  );

  const copyUuidV4 = () => {
    navigator.clipboard.writeText(uuid);
    toast.success('Copy UUID success!');
  }

  const refreshUuidV4 = () => {
    setRefreshCounter(refreshCounter + 1);
  }

  return (
    <div>
      <div className="rounded-lg py-[1rem] px-[1.5rem] bg-[rgba(255,255,255,0.7)] flex justify-between mb-3">
        <div className="w-[calc(100%-70px)] py-[.5rem]">
          <span className="text-[22px] font-medium break-words">{uuid}</span>
        </div>
        <div className="flex justify-center items-center w-[80px]">
          <IoCopyOutline
            size={40}
            className={iconClassName}
            data-tooltip-id="icon-copy-uuid-v4"
            onClick={copyUuidV4}
          />
          <IoReload
            size={40}
            className={iconClassName}
            data-tooltip-id="icon-refresh-uuid-v4"
            onClick={refreshUuidV4}
          />
        </div>
      </div>
      <Tooltip
        id="icon-copy-uuid-v4"
        place="bottom"
        content="Copy"
      />
      <Tooltip
        id="icon-refresh-uuid-v4"
        place="bottom"
        content="Refresh"
      />
    </div>
  )
}
