import { useEffect, useState } from "react";

import { usePoeStackAuth } from "@contexts/user-context";
import { Popover } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/20/solid";

export default function NotificationButton() {
  const { notifications } = usePoeStackAuth();
  const [lastViewedId, setLastViewedId] = useState<number>(0);

  const unviewedNotifications = notifications.filter(
    (e) => e.id > lastViewedId
  );

  useEffect(() => {
    setLastViewedId(
      parseInt(localStorage.getItem("lastViewdNotificationId") ?? "0")
    );
  }, []);

  return (
    <>
      <Popover>
        <Popover.Button
          type="button"
          className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white"
          onClick={() => {
            const lastId = notifications[notifications.length - 1]?.id ?? 0;
            setLastViewedId(lastId);
            localStorage.setItem("lastViewdNotificationId", `${lastId}`);
          }}
        >
          <BellIcon className="w-6 h-6" />
          {!!unviewedNotifications.length && (
            <div className="absolute inline-flex items-center justify-center w-2 h-2 bg-red-500 rounded-full top-1 right-1"></div>
          )}
        </Popover.Button>
        <Popover.Panel>
          <div className="absolute z-40 w-56 top-20 right-10 bg-surface-primary">
            <div className="flex flex-col text-left p-2">
              {notifications.map((e) => (
                <div key={e.id}>
                  {!!e.title && <div className="font-semibold">{e.title}</div>}
                  {!!e.body && <div className="text-sm">{e.body}</div>}
                </div>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Popover>
    </>
  );
}
