import React from "react";
import { X } from "lucide-react";
import { generalNotifications, ignoreNotifications } from "./notificationData";
import NotificationItem from "./NotificationItem";
function DisplaySplitNotifications({ title = "Split & Share" }) {
  return (
    <div className="bg-black text-white w-full max-w-sm mx-auto rounded-lg shadow-lg my-2">
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button className="text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      <div className="h-full flex flex-col">
        <div className="flex-grow overflow-y-auto ">
          <h3 className="font-semibold pl-4 py-2">Recently</h3>
          {generalNotifications.map((item, index) => (
            <NotificationItem key={index} item={item} />
          ))}
          <h3 className="font-semibold pl-4 py-2">Ignore</h3>
          {ignoreNotifications.map((item, index) => (
            <NotificationItem key={index} item={item} />
          ))}
        </div>
      </div>
      {title === "Split & Share" && (
        <div className="p-4 border-t border-gray-700">
          <button className="w-full px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg">
            OK
          </button>
        </div>
      )}
    </div>
  );
}

export default DisplaySplitNotifications;
