import { Tooltip } from "react-tooltip";
import { IoCopyOutline } from "react-icons/io5";
import { IoReload } from "react-icons/io5";
import { useToast } from "../../hooks/toast";
import { Keys, useStorage } from "../../hooks/storage";
import { useCallback, useEffect, useState } from "react";
import { Checkbox } from "../../components/input/checkbox";
import { twMerge } from "tailwind-merge";
import { Str } from "../../helpers/str";

const iconClassName = [
  'p-[6px]',
  'rounded-md',
  'cursor-pointer',
  'transition',
  'hover:bg-[rgba(0,0,0,0.05)]',
  'outline-none',
].join(' ');

export const RandomPassword = () => {
  const [isReady, setReady] = useState(false);
  const [allowRandomPassword, setAllowRandomPassword] = useState(true);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(12);
  const [passwordUppercase, setPasswordUppercase] = useState(true);
  const [passwordLowercase, setPasswordLowercase] = useState(true);
  const [passwordNumbers, setPasswordNumbers] = useState(true);
  const [passwordSymbols, setPasswordSymbols] = useState(false);
  const toast = useToast();
  const storage = useStorage();

  useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!allowRandomPassword) {
      setAllowRandomPassword(true);
      return;
    }

    const newPassword = Str.random(passwordLength, {
      lower: passwordLowercase,
      upper: passwordUppercase,
      number: passwordNumbers,
      symbols: passwordSymbols
    });

    setPassword(newPassword);
    storage.set(Keys.passwordConfig.lastPw, newPassword);
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      passwordLength,
      passwordUppercase,
      passwordLowercase,
      passwordNumbers,
      passwordSymbols,
      refreshCounter,
      isReady
    ]
  );

  useEffect(() => {
    if (!storage.isReady) return;
    const init = async () => {
      const lastPassword = await storage.get(Keys.passwordConfig.lastPw);
      const lastLength = await storage.get(Keys.passwordConfig.lastPwLen);
      const lastUppercase = await storage.get(Keys.passwordConfig.lastPwUp);
      const lastLowercase = await storage.get(Keys.passwordConfig.lastPwLow);
      const lastNumbers = await storage.get(Keys.passwordConfig.lastPwNum);
      const lastSymbols = await storage.get(Keys.passwordConfig.lastPwSym);
      if (lastPassword) {
        setAllowRandomPassword(false);
        setPassword(lastPassword);
      }
      if (lastLength) {
        setPasswordLength(parseInt(lastLength));
      }
      if (lastUppercase !== null) {
        setPasswordUppercase(
          [true, 'true'].includes(lastUppercase)
        );
      }
      if (lastLowercase !== null) {
        setPasswordLowercase(
          [true, 'true'].includes(lastLowercase)
        );
      }
      if (lastNumbers !== null) {
        setPasswordNumbers(
          [true, 'true'].includes(lastNumbers)
        );
      }
      if (lastSymbols !== null) {
        setPasswordSymbols(
          [true, 'true'].includes(lastSymbols)
        );
      }
      setReady(true);
    }
    init();
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [storage.isReady]
  );

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    toast.success('Copy password success!');
  }

  const refreshPassword = () => {
    setRefreshCounter(refreshCounter + 1);
  }

  const changePasswordLength = useCallback((newLength) => {
    if (!storage.isReady) return;
    setPasswordLength(newLength);
    storage.set(Keys.passwordConfig.lastPwLen, newLength);
  }, [storage]);

  return (
    <>
      <div className="rounded-lg py-[1rem] px-[1.5rem] bg-[rgba(255,255,255,0.7)] flex justify-between mb-3">
        <div className="w-[calc(100%-70px)] py-[.5rem]">
          <span className="text-3xl font-medium break-words">{password}</span>
        </div>
        <div className="flex justify-center items-center w-[80px]">
          <IoCopyOutline
            size={40}
            className={iconClassName}
            data-tooltip-id="icon-copy-password"
            onClick={copyPassword}
          />
          <IoReload
            size={40}
            className={iconClassName}
            data-tooltip-id="icon-refresh-password"
            onClick={refreshPassword}
          />
        </div>
      </div>
      <div className="rounded-lg py-[1rem] px-[1.5rem] bg-[rgba(255,255,255,0.7)] flex flex-wrap justify-between">
        <h2 className="font-bold text-[24px] border-b-2 border-[#a9a9a9] w-full py-1">
          Customize password
        </h2>
        <div className="flex flex-wrap w-full">
          <div className="w-[50%] p-3">
            <p className="text-center mb-2 font-medium">Password Length</p>
            <input
              type="number"
              className="shadow-inner rounded-md py-2 px-1 w-full text-center outline-none"
              value={passwordLength}
              readOnly
            />
            <input
              type="range"
              className="w-full"
              value={passwordLength}
              max={48}
              min={4}
              onChange={(e) => changePasswordLength(parseInt(e.target.value))}
            />
            <div className="w-full flex flex-wrap justify-center">
              {[8, 12, 16, 24, 32, 40].map((length) => (
                <div
                  key={`password-suggest-${length}-${passwordLength}`}
                  className={twMerge(
                    "rounded-md w-[42px] h-[42px] shadow-sm transition bg-white flex justify-center items-center m-1 cursor-pointer select-none",
                    (passwordLength === length ? 'cursor-default bg-[#0080d3aa] text-white' : 'hover:shadow-inner')
                  )}
                  onClick={() => changePasswordLength(length)}>{length}</div>
              ))}
            </div>
          </div>
          <div className="w-[50%] p-3">
            <div className="flex flex-wrap w-full pl-[3rem]">
              <Checkbox
                fullWidth
                id="pw-uppercase"
                label="Uppercase"
                labelClassName="font-medium"
                checked={passwordUppercase}
                onChange={() => {
                  const newData = !passwordUppercase;
                  setPasswordUppercase(newData);
                  storage.set(Keys.passwordConfig.lastPwUp, newData);
                }}
              />
              <Checkbox
                fullWidth
                id="pw-lowercase"
                label="Lowercase"
                labelClassName="font-medium"
                checked={passwordLowercase}
                onChange={() => {
                  const newData = !passwordLowercase;
                  setPasswordLowercase(newData);
                  storage.set(Keys.passwordConfig.lastPwLow, newData);
                }}
              />
              <Checkbox
                fullWidth
                id="pw-numbers"
                label="Numbers"
                labelClassName="font-medium"
                checked={passwordNumbers}
                onChange={() => {
                  const newData = !passwordNumbers;
                  setPasswordNumbers(newData);
                  storage.set(Keys.passwordConfig.lastPwNum, newData);
                }}
              />
              <Checkbox
                fullWidth
                id="pw-symbols"
                label="Symbols"
                labelClassName="font-medium"
                checked={passwordSymbols}
                onChange={() => {
                  const newData = !passwordSymbols;
                  setPasswordSymbols(newData);
                  storage.set(Keys.passwordConfig.lastPwSym, newData);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Tooltip
        id="icon-copy-password"
        place="bottom"
        content="Copy"
      />
      <Tooltip
        id="icon-refresh-password"
        place="bottom"
        content="Refresh"
      />
    </>
  )
}
