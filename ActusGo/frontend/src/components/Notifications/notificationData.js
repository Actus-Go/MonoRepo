
// Helper function to generate random data
const getRandomUser = () => {
  const names = ["Alice", "Bob", "Charlie", "Diana", "Evan", "Fiona", "Faisal", "Ahmed Ali", "Hossam"];
  const actions = ["liked your post", "commented on your photo", "sent you a message", "followed you"];
  const avatars = [
    "https://randomuser.me/api/portraits/women/1.jpg",
    "https://randomuser.me/api/portraits/men/1.jpg",
    "https://randomuser.me/api/portraits/women/2.jpg",
    "https://randomuser.me/api/portraits/men/2.jpg",
    "https://randomuser.me/api/portraits/women/3.jpg",
    "https://randomuser.me/api/portraits/women/5.jpg",
    "https://randomuser.me/api/portraits/women/4.jpg",
    "https://randomuser.me/api/portraits/women/6.jpg",
    "https://randomuser.me/api/portraits/men/3.jpg",
    "https://randomuser.me/api/portraits/men/4.jpg",
    "https://randomuser.me/api/portraits/men/5.jpg",
    "https://randomuser.me/api/portraits/men/6.jpg",
  ];

  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return {
    user: {
      name: getRandomElement(names),
      avatar: getRandomElement(avatars),
      isActive: Math.random() > 0.5,
    },
    actionDescription: getRandomElement(actions),
    timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000)),
    primaryActionButton: Math.random() > 0.5 && {
      label: "Accept",
      onClick: () => console.log("Accepted"),
      additionalClasses: "",
    },
    secondaryActionButton: Math.random() > 0.5 && {
      label: "Decline",
      onClick: () => console.log("Declined"),
      additionalClasses: "",
    },
    isIgnored:  Math.random() > 0.5
  };
};

// Generate 30 demo notifications
export const generateDemoNotifications = (length) => {
  return Array.from({ length }, () => ({
    ...getRandomUser()
  }));
};
