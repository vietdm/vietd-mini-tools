import { useEffect, useState } from "react";
import { RandomPassword } from "./modules/random-password";
import { LayoutModule } from "./modules/layout-module";
import { RandomUuidV4 } from "./modules/random-uuid-v4";
import { Button } from "./components/button";
import { Keys, useStorage } from "./hooks/storage";
import { Loading } from "./components/loading";
import { InstanceId } from "./modules/instance-id";
import { HoatHinh3D } from "./modules/hoathinh3d";

function App() {
  const [isReady, setReady] = useState(false);
  const [tabActive, setTabActive] = useState(null);
  const storage = useStorage();

  const Tabs = {
    randomPassword: {
      text: 'Random Password',
      color: 'primary',
      el: <RandomPassword />
    },
    randomUuidV4: {
      text: 'Random Uuid V4',
      color: 'green',
      el: <RandomUuidV4 />
    },
    hoatHinh3D: {
      text: 'HoatHinh3D',
      color: 'purple',
      el: <HoatHinh3D />
    }
  }

  const changeTab = async (tab) => {
    await storage.set(Keys.lastTab, tab);
    setTabActive(tab);
  }

  useEffect(() => {
    if (!storage.isReady) return;
    const init = async () => {
      const lastTab = await storage.get(Keys.lastTab);
      setTabActive(lastTab);
      setTimeout(() => {
        setReady(true);
      }, 350);
    }
    init();
  }, [storage]);

  return (
    <div className="p-[15px]">
      {isReady ? (
        <>
          <div className={tabActive ? "mb-3" : "mb-4"}>
            <div className="text-white bg-teal-600 font-bold rounded-lg text-lg px-5 py-2.5 text-center select-none">
              Mono Tools By VietDM {tabActive ? ` | ${Tabs[tabActive].text}` : ''}
            </div>
          </div>
          {!tabActive ? (
            <div className="flex flex-wrap justify-between">
              {Object.keys(Tabs).map((key) => (
                <Button
                  key={`button-tab-${key}`}
                  color={Tabs[key].color}
                  className="w-[calc(50%-5px)] mb-3"
                  onClick={() => changeTab(key)}>
                  {Tabs[key].text}
                </Button>
              ))}
              <div className="w-full">
                <InstanceId />
              </div>
            </div>
          ) : (
            <LayoutModule id={tabActive} goHome={() => changeTab(null)}>
              {Tabs[tabActive].el}
            </LayoutModule>
          )}
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
