/*global chrome*/

import { useEffect, useState } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { InstanceId } from "../instance-id";
import { Keys, useStorage } from "../../hooks/storage";
import { useToast } from "../../hooks/toast";
import { Checkbox } from "../../components/input/checkbox";

export const HoatHinh3D = () => {
  const [instanceId, setInstanceId] = useState('');
  const [domain, setDomain] = useState('');
  const [isActive, setActive] = useState(false);
  const storage = useStorage();
  const toast = useToast();

  useEffect(() => {
    if (!storage.isReady) return;
    const init = async () => {
      const id = await storage.get(Keys.hh3d.instanceId) ?? '';
      const isActive = await storage.get(Keys.hh3d.isActive) ?? false;
      const domain = await storage.get(Keys.hh3d.domain) ?? '';

      setInstanceId(id);
      setDomain(domain);
      setActive([true, 'true'].includes(isActive));
    }
    init();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storage.isReady]
  )

  const useCurrentInstanceId = async () => {
    if (!chrome || !chrome.instanceID) {
      setInstanceId('Unknown');
      return;
    };
    const id = await chrome.instanceID.getID();
    setInstanceId(id);
  }

  const saveSetting = async () => {
    await storage.set(Keys.hh3d.instanceId, instanceId);
    await storage.set(Keys.hh3d.isActive, isActive);
    await storage.set(Keys.hh3d.domain, domain);
    toast.success('Save success!');
  }

  const reRunAuto = async () => {
    const counter = parseInt(await storage.get(Keys.hh3d.reRun) ?? '0');
    await storage.set(Keys.hh3d.reRun, counter + 1);
    toast.success('Re-Run success!');
  }

  return (
    <div className="rounded-lg py-[1rem] px-[1.5rem] bg-[rgba(255,255,255,0.7)] flex flex-wrap justify-between">
      <h2 className="font-bold text-[24px] border-b-2 border-[#a9a9a9] w-full py-1 mb-5">
        Setting Auto for HoatHinh3D
      </h2>
      <div className="w-full">
        <div className="mb-3">
          <InstanceId />
        </div>
        <div className="mb-3 pt-2">
          <Checkbox
            fullWidth
            id="is-active-auto"
            labelClassName="font-medium"
            label="Is active auto?"
            checked={isActive}
            onChange={() => setActive(!isActive)}
          />
        </div>
        <div className="flex w-full items-end justify-between">
          <Input
            id="instance-id"
            placeholder="Chrome Instance ID"
            label="Instance ID"
            rootClass="w-[calc(100%-100px)]"
            value={instanceId}
            onChange={(e) => setInstanceId(e.target.value)}
          />
          <div className="w-[90px] pb-[16px]">
            <Button
              onClick={useCurrentInstanceId}
              color="green"
              size="sm">
              Current ID
            </Button>
          </div>
        </div>
        <Input
          id="domain"
          placeholder="HH3D Domain"
          label="HH3D Domain"
          rootClass="w-[calc(100%-100px)]"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <div className="flex gap-3">
        <Button color="primary" onClick={saveSetting}>
          Save
        </Button>
        <Button color="purple" onClick={reRunAuto} className="w-[100px]">
          Re-Run
        </Button>
        </div>
      </div>
    </div>
  );
}
