const notificationItemsData = [
  // General notifications
  { type: "general", action: "post a photo", time: "5 Min ago" },
  { type: "general", action: "comment on your post", time: "10 Min ago" },
  { type: "general", action: "like your status", time: "15 Min ago" },
  { type: "general", action: "mentioned you in a comment", time: "20 Min ago" },
  { type: "general", action: "shared your post", time: "30 Min ago" },
  {
    type: "general",
    action: "sent you a friend request",
    time: "40 Min ago",
    requiresAction: true,
  },
  // Ignore notifications
  { type: "ignore", action: "declined to split a coupon", time: "5 Min ago" },
  { type: "ignore", action: "declined to share a coupon", time: "10 Min ago" },
  {
    type: "ignore",
    action: "ignored a group purchase invitation",
    time: "15 Min ago",
  },
  {
    type: "ignore",
    action: "declined a bill split request",
    time: "20 Min ago",
  },
  {
    type: "ignore",
    action: "ignored a shared discount code",
    time: "25 Min ago",
  },
];
export const generalNotifications = [
  {
    type: "share",
    action: "share a coupon",
    time: "5 Min ago",
    requiresAction: true,
    singleButton: true,
  },
  {
    type: "share",
    action: "wants to share a coupon",
    time: "5 Min ago",
    requiresAction: true,
  },
  {
    type: "split",
    action: "wants to split a coupon",
    time: "5 Min ago",
    requiresAction: true,
  },
];
export const ignoreNotifications = [
  { type: "share", action: "decline to split a coupon", time: "5 Min ago" },
  { type: "share", action: "decline to share a coupon", time: "5 Min ago" },
  { type: "share", action: "decline to share a coupon", time: "5 Min ago" },
];
export default notificationItemsData;
