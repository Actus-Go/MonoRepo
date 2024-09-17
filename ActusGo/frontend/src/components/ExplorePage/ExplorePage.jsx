import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const sidebarItems = [
  {
    src: require("./images/home.png"),
    text: "Home",
    className: "w-10 h-10 -ml-2",
  },
  {
    src: require("./images/video-play.png"),
    text: "Explore",
    className: "w-8 h-8",
  },
  {
    src: require("./images/location.png"),
    text: "Map",
    className: "w-8 h-8 -ml-1",
  },
  {
    src: require("./images/user.png"),
    text: "Profile",
    className: "w-10 h-10 -ml-2",
  },
  {
    src: require("./images/diagram.png"),
    text: "Analytics",
    className: "w-7 h-7",
  },
  {
    src: require("./images/friends.png"),
    text: "Friends",
    className: "w-7 h-7",
  },
  {
    src: require("./images/settings.png"),
    text: "Settings",
    className: "w-10 h-10 -ml-2",
  },
  {
    src: require("./images/game-9-svgrepo-com 1.png"),
    text: "Play Mode",
    className: "w-10 h-10",
    type: "checkbox",
    name: "mode",
  },
  {
    src: require("./images/dark.png"),
    text: "Dark Mode",
    className: "w-7 h-7",
    type: "checkbox",
    name: "theme",
  },
  {
    src: require("./images/help-svgrepo-com 1.png"),
    text: "Help Center",
    className: "w-10 h-10",
  },
  {
    src: require("./images/logout.png"),
    text: "Logout",
    className: "w-8 h-8",
  },
];

const images = [
  { src: require("./images/greenSneekers.png"), alt: "Green sneakers" },
  { src: require("./images/clo.png"), alt: "Colorful clothes" },
  { src: require("./images/food.png"), alt: "Plate of food" },
  {
    src: require("./images/Rectangle 34625174.png"),
    alt: "Black and white sneakers",
  },
  { src: require("./images/pizza.png"), alt: "Pizza" },
  { src: require("./images/heals.png"), alt: "High heel shoes" },
  { src: require("./images/f.png"), alt: "Roasted vegetables" },
  { src: require("./images/books.png"), alt: "Stack of books" },
  { src: require("./images/vegeta.png"), alt: "Fresh vegetables" },
];

function Explore() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all(
          images.map((image) => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = image.src;
              img.onload = resolve;
              img.onerror = reject;
            });
          })
        );
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (imagesLoaded) {
      console.log("All images loaded successfully");
    }
  }, [imagesLoaded]);

  useEffect(() => {
    console.log("Current path:", location.pathname);
  }, [location]);

  return (
    <div className="flex bg-black min-h-screen w-full text-white justify-between pl-4 md:pl-0 md:items-start my-auto">
      <aside className="hidden md:block md:w-96 bg-gray-900 transition-all duration-300 ease-in-out">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <img
              src={require("./images/Logo.png")}
              alt="logo"
              className="w-12 md:w-20 h-auto"
            />
            <button className="hidden md:block">
              <img
                src={require("./images/Vector.png")}
                alt="close"
                className="w-4 h-4"
              />
            </button>
          </div>
          <div className="mt-8 flex items-center flex-col">
            <img
              src={require("./images/Avatar.png")}
              alt="avatar"
              className="w-28 h-28 rounded-full"
            />
            <p className="mt-2 font-semibold">User Name</p>
          </div>
          <nav className="mt-8">
            {sidebarItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center  mt-4 hover:bg-gray-800 py-2 rounded cursor-pointer"
              >
                <img
                  src={item.src}
                  alt={item.text.toLowerCase()}
                  className={item.className}
                />
                <p className="ml-4">{item.text}</p>
                {item.type === "checkbox" && (
                  <div className="ml-auto mr-4 bg-purple-400 rounded-full flex items-end justify-center ">
                    <input
                      className="ml-auto mr-4 bg-purple-400 rounded-full appearance-none w-5 h-5 border-2 border-white checked:bg-white checked:border-purple-400"
                      type="checkbox"
                      name={item.name}
                      value={item.value}
                      style={{ borderRadius: "50%" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </aside>

      <div className="flex flex-col items-center justify-between mb-8 md:px-4 mt-4">
        <div className="flex w-full items-center justify-between mb-8 md:px-4">
          <div className="hidden md:block relative w-full max-w-[300px]">
            <input
              type="text"
              placeholder="Search on Actus Go ....."
              className="w-full outline-none focus:ring-2 focus:ring-purple-500 p-2 pl-10 rounded-full bg-black text-black"
            />
            <img
              className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6"
              src={require("./images/search.png")}
              alt="search"
            />
          </div>
          <div className="flex items-center justify-between w-full md:w-auto">
            <button className="md:hidden">
              <img
                src={require("./images/menu.png")}
                alt="menu"
                className="w-6 h-6"
              />
            </button>

            <img
              src={require("./images/Logo.png")}
              alt="logo"
              className="w-12 md:hidden"
            />
            <div className="flex items-center justify-between">
              <img
                src={require("./images/people.png")}
                alt="people"
                className="w-6 h-6"
              />
              <img
                src={require("./images/bell.png")}
                alt="bell"
                className="w-6 h-6"
              />
            </div>
          </div>
        </div>

        <div className="columns-2 lg:columns-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="mb-4 break-inside-avoid">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full rounded-lg shadow-lg hover:opacity-90 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Explore;
