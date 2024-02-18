/*global chrome*/
import { Tooltip } from "react-tooltip";
import { IoCopyOutline } from "react-icons/io5";
import { useToast } from "../../hooks/toast";
import { useEffect, useState } from "react";

const iconClassName = [
  'p-[6px]',
  'rounded-md',
  'cursor-pointer',
  'transition',
  'hover:bg-[rgba(0,0,0,0.05)]',
  'outline-none',
].join(' ');

export const InstanceId = () => {
  const [id, setId] = useState('Unknown');
  const toast = useToast();

  useEffect(() => {
    const init = async () => {
      if (!chrome || !chrome.instanceID) return;
      const instanceID = await chrome.instanceID.getID();
      setId(instanceID);
    }
    init();
  }, []);

  const copyInstanceId = () => {
    navigator.clipboard.writeText(id);
    toast.success('Copy Instance ID success!');
  }

  return (
    <>
      <div className="rounded-lg py-[.15rem] px-[1.5rem] bg-[rgba(255,255,255,0.7)] flex justify-between mb-3">
        <div className="w-[calc(100%-50px)] py-[.5rem]">
          <span className="text-[22px] font-medium break-words">InstanceID: {id}</span>
        </div>
        <div className="flex justify-center items-center w-[40px]">
          <IoCopyOutline
            size={40}
            className={iconClassName}
            data-tooltip-id="icon-copy-uuid-v4"
            onClick={copyInstanceId}
          />
        </div>
      </div>
      <Tooltip
        id="icon-copy-uuid-v4"
        place="bottom"
        content="Copy"
      />
    </>
  );
}
