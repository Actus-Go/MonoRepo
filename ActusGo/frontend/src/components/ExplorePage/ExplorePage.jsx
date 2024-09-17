import { ClapperboardIcon, Image } from "lucide-react";
import { useState } from "react";
import MediaPopup from "../Popup";



// Main media exploration component
export default function ExploreMedia({ media }) {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleMediaSelect = (src, alt, type) => {
    setSelectedMedia(
      type === "img" ? (
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-full object-contain rounded-lg"
        />
      ) : type === "video" ? (
        <video
          src={src}
          controls
          className="max-w-full max-h-full object-contain w-full rounded-lg"
        />
      ) : null
    );
  };

  return (
    <>
      <div className="min-h-screen w-11/12 max-w-screen-2xl bg-transparent text-black columns-2 my-10 lg:columns-3 xl:columns-4 gap-5">
        {media.map(({ src, alt, type }, index) => (
          <button
            onClick={() => handleMediaSelect(src, alt, type)}
            key={index}
            className="relative break-inside-avoid w-full transition-all mb-5 hover:opacity-80 cursor-pointer"
          >
            {type === "img" ? (
              <>
                <img
                  src={src}
                  alt={alt}
                  className="w-full rounded-lg shadow-lg"
                />
                <span className="p-2 bg-white/80 rounded-md absolute top-5 right-5">
                  <Image size={24} />
                </span>
              </>
            ) : type === "video" ? (
              <>
                <video
                  src={src}
                  className="w-full rounded-lg shadow-lg"
                />
                <span className="p-2 bg-white/80 rounded-md absolute top-5 right-5">
                  <ClapperboardIcon size={24} />
                </span>
              </>
            ) : null}
          </button>
        ))}
      </div>

      {/* Render Popup if media is selected */}
      {selectedMedia && (
        <MediaPopup
          content={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </>
  );
}
