import formatTimeDifference from "../../utils/formatTimeDifference";
import { Button, ButtonVariants } from "../Buttons";
import Avatar from "./Avatar";

export default function Notification({
  user,
  actionDescription,
  timestamp,
  primaryActionButton,
  secondaryActionButton,
}) {
  return (
    <div className="flex flex-col items-start p-3 bg-slate-900 rounded-lg w-11/12 mx-auto mb-2">
      <div className="flex items-center w-full">
        {user?.avatar && (
          <Avatar
            name={user.name}
            imageUrl={user.avatar.startsWith("http") ? user.avatar : require(user.avatar)}
            isActive={user.isActive}
          />
        )}

        <span className="text-sm text-gray-300 w-full">
          <span className="font-bold">{user?.name} </span>
          <span>{actionDescription}</span>
        </span>
      </div>

      <span className="text-xs text-gray-500 place-self-end -mt-3">
        {formatTimeDifference(timestamp)}
      </span>

      {(primaryActionButton || secondaryActionButton) && (
        <div className="flex w-full font-semibold">
          {primaryActionButton && (
            <Button
              label={primaryActionButton.label}
              handleClick={primaryActionButton.onClick}
              additionalClasses={primaryActionButton.additionalClasses}
            />
          )}
          {secondaryActionButton && (
            <Button
              variant={ButtonVariants.SECONDARY}
              label={secondaryActionButton.label}
              handleClick={secondaryActionButton.onClick}
              additionalClasses={secondaryActionButton.additionalClasses}
            />
          )}
        </div>
      )}
    </div>
  );
}
