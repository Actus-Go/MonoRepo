import Avatar from "./Avatar";
import ButtonOptions from "./Buttons";
function NotificationItem({ item }) {
  return (
    <div className="flex flex-col items-start p-3 border  border-gray-700 rounded-lg w-11/12 mx-auto mb-2">
      <div className="flex">
        <Avatar />
        <div className="flex-grow">
          <p className="text-sm text-gray-300 pb-2">
            <span className="font-semibold">Username</span> {item.action}
          </p>
          <p className="text-xs text-gray-500">{item.time}</p>
        </div>
      </div>
      {item.requiresAction && (
        <div className="flex w-full">
          {item.singleButton ? (
            <button className="px-4 py-2 bg-indigo-600 text-white text-xs rounded-lg w-full">
              Request share
            </button>
          ) : (
            <ButtonOptions />
          )}
        </div>
      )}
    </div>
  );
}
export default NotificationItem;
