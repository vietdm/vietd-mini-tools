import { Tooltip } from "react-tooltip";
import { IoCopyOutline } from "react-icons/io5";
import { useToast } from "../../hooks/toast";
import { useEffect, useRef, useState } from "react";
import bcrypt from "bcryptjs";
import { Keys, useStorage } from "../../hooks/storage";
import { Input } from "../../components/input";

const iconClassName = [
  'p-[6px]',
  'rounded-md',
  'cursor-pointer',
  'transition',
  'hover:bg-[rgba(0,0,0,0.05)]',
  'outline-none',
].join(' ');

export const RandomBcrypt = () => {
  const [isReady, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [allowRandomBcrypt, setAllowRandomBcrypt] = useState(true);
  const [hash, setHash] = useState('');
  const toast = useToast();
  const storage = useStorage();
  const timeout = useRef(null);

  useEffect(() => {
    if (!storage.isReady) return;
    const init = async () => {
      const lastHash = await storage.get(Keys.bcryptConfig.lastHash);
      const lastPassword = await storage.get(Keys.bcryptConfig.lastPassword);
      setAllowRandomBcrypt(!lastHash && !lastPassword);
      setHash(lastHash || '');
      setPassword(lastPassword || '');
      setTimeout(() => setReady(true), 500);
    }
    init();
    // eslint-disable-next-line
  }, [storage.isReady]);

  useEffect(() => {
    if (!isReady) return;
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      storage.set(Keys.bcryptConfig.lastPassword, password);
      if (!allowRandomBcrypt) {
        setAllowRandomBcrypt(true);
        return;
      }
      if (password === '') {
        setHash('');
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const newHash = bcrypt.hashSync(password, salt);
      setHash(newHash);
    }, 300);
    // eslint-disable-next-line
  }, [password]);

  useEffect(() => {
    if (!isReady) return;
    storage.set(Keys.bcryptConfig.lastHash, hash);
    // eslint-disable-next-line
  }, [hash]);

  const copyBcryptHash = () => {
    navigator.clipboard.writeText(hash);
    toast.success('Copy success!');
  }

  return (
    <div>
      <div className="rounded-lg py-[1rem] px-[1.5rem] bg-[rgba(255,255,255,0.7)] mb-3">
        <Input
          id="password"
          placeholder="Something..."
          label="Text for hash"
          labelClass="dark:text-black text-[22px]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-between">
          <div className="w-[calc(100%-70px)] py-[.5rem]">
            <span className="text-[22px] font-medium break-words">{hash}</span>
          </div>
          <div className="flex justify-center items-center w-[80px]">
            <IoCopyOutline
              size={40}
              className={iconClassName}
              data-tooltip-id="icon-copy-bcrypt-hash"
              onClick={copyBcryptHash}
            />
          </div>
        </div>
      </div>
      <Tooltip
        id="icon-copy-bcrypt-hash"
        place="bottom"
        content="Copy"
      />
    </div>
  )
}
