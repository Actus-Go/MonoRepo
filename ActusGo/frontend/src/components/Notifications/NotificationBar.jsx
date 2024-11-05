import { X } from "lucide-react";
import Notification from "./Notification";
import { useNotificationStore } from "../../Store/notificationStore";

export default function NotificationBar({
  title,
  isOpen,
  onClose
}) {
  const notifications = useNotificationStore((state)=>state.notifications);
  const generalNotifications = notifications.filter((notification) => !notification?.isIgnored);
  const ignoreNotifications = notifications.filter((notification) => notification?.isIgnored);
  
  return (
    <div className={`h-screen fixed top-0 right-0 overflow-x-hidden overflow-y-auto transition-all z-[99999999] bg-black text-white w-full max-w-sm mx-auto rounded-lg shadow-lg ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
      <div className="flex justify-between items-center p-3 px-4 top-0 bg-black sticky z-40">
        <h2 className="text-xl font-bold">{title || "Notifications"}</h2>

        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {0 !== generalNotifications.length && (
        <div className="flex px-3 flex-col w-full">
          <div className="p-4 w-full h-fit sticky top-11 bg-black z-30">
            <h3 className="font-semibold self-start">Recently</h3>
          </div>

          {generalNotifications.map((item, index) => (
            <Notification
              key={`notification-general-${index}`}
              {...item}
            />
          ))}
        </div>
      )}

      {0 !== ignoreNotifications.length && (
        <div className="flex px-3 flex-col w-full">
          <div className="p-4 px-6 w-full h-fit sticky top-11 bg-black z-30">
            <h3 className="font-semibold  self-start">Ignore</h3>
          </div>

          {ignoreNotifications.map((item, index) => (
            <Notification
              key={`notification-ignore-${index}`}
              {...item}
            />
          ))}
        </div>
      )}
    </div>
  );
}
