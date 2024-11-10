import { useState } from "react";
import { ArrowRight } from "../../icons";

export default function Stories({ user }) {
  const [stories, setStories] = useState([]);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null); // For navigating stories

  // Handles file upload and validation
  const handleStoryUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const isFileImageOrVideo = file.type.includes("image") || file.type.includes("video");
    const fileSizeLimitMB = 10;
    const isFileSizeValid = file.size / (1024 * 1024) <= fileSizeLimitMB;

    if (isFileImageOrVideo && isFileSizeValid) {
      const newStory = {
        id: stories.length,
        url: URL.createObjectURL(file),
        type: file.type.includes("video") ? "video" : "image",
        user: {
          name: user.name,
          avatar: user.avatar,
        },
        viewed: false,
      };
      setStories([...stories, newStory]);
    } else {
      alert(`Please upload an image or video under ${fileSizeLimitMB}MB.`);
    }
  };

  // Marks a story as viewed
  const updateStoryAsViewed = (index) => {
    setStories(
      stories.map((story, i) =>
        i === index ? { ...story, viewed: true } : story
      )
    );
  };

  // Opens a story in fullscreen and marks it as viewed
  const openStory = (index) => {
    setCurrentStoryIndex(index);
    updateStoryAsViewed(index);
  };

  // Closes the fullscreen view
  const closeStory = () => {
    setCurrentStoryIndex(null);
  };

  // Goes to the previous story
  const navigatePreviousStory = () => {
    if (currentStoryIndex > 0) {
      let index = currentStoryIndex - 1;
      setCurrentStoryIndex(index);
      updateStoryAsViewed(index);
    }
  };

  // Goes to the next story
  const navigateNextStory = () => {
    if (currentStoryIndex < stories.length - 1) {
      let index = currentStoryIndex + 1;
      setCurrentStoryIndex(index);
      updateStoryAsViewed(index);
    }
  };

  return (
    <>
      <div className="bg-gray-900 flex flex-col overflow-x-auto gap-2 items-start p-6 pt-4 rounded-lg shadow-lg">
        <h1 className="text-white text-xl text-start w-min left-0 sticky">Stories</h1>

        <div className="flex items-center gap-4">
          <StoryUploadButton onFileUpload={handleStoryUpload} />

          {stories.map((story, index) => (
            <StoryThumbnail
              key={story.id}
              story={story}
              onClick={() => openStory(index)}
            />
          ))}
        </div>
      </div>

      {currentStoryIndex !== null && (
        <FullScreenStory
          story={stories[currentStoryIndex]}
          onClose={closeStory}
          onPrevious={navigatePreviousStory}
          onNext={navigateNextStory}
          isPreviousAvailable={currentStoryIndex > 0}
          isNextAvailable={currentStoryIndex < stories.length - 1}
        />
      )}
    </>
  );
};

function StoryUploadButton({ onFileUpload }) {
  return (
    <>
      <div className="relative flex-shrink-0 w-24 h-36 hidden md:block text-center rounded-xl overflow-hidden cursor-pointer border border-gray-700">
        <label htmlFor="story-upload" className="w-full h-full flex flex-col items-center justify-end cursor-pointer">
          <img
            src="https://via.placeholder.com/96x144?text=USER"
            alt="User"
            className="absolute w-full h-full"
          />

          <div className="rounded-full z-10 bg-blue-500 absolute left-1/2 bottom-6 -translate-x-1/2 w-5 aspect-square">
            <span className="bg-white text-lg h-0.5 w-2/3 absolute rounded-full inline-block left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></span>
            <span className="bg-white text-lg h-0.5 w-2/3 absolute rounded-full inline-block left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rotate-90"></span>
          </div>

          <p className="text-sm text-white font-semibold mb-2 z-10">Create Story</p>
        </label>

        <input
          type="file"
          id="story-upload"
          accept="image/*,video/*"
          onChange={onFileUpload}
          className="hidden"
        />
      </div>

      {/* Mobile View */}
      <div className="block md:hidden m-2">
        <MobileStoryUploadButton onFileUpload={onFileUpload} />
      </div>
    </>
  );
}

function MobileStoryUploadButton({ onFileUpload }) {
  return (
    <div className="bottom-0 left-0 w-12 flex flex-col flex-none items-center justify-center cursor-pointer">
      <div className="relative bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5 rounded-full">
        <label htmlFor="story-upload" className="relative left-0 flex flex-col items-center justify-center cursor-pointer">
          <img
            src="https://via.placeholder.com/200?text=User"
            alt="avatar"
            className="w-12 aspect-square rounded-full"
          />

          <div className="rounded-full z-10 bg-blue-500 absolute right-0 translate-x-1 bottom-0 w-4 aspect-square">
            <span className="bg-white text-lg h-0.5 w-2/3 absolute rounded-full inline-block left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></span>
            <span className="bg-white text-lg h-0.5 w-2/3 absolute rounded-full inline-block left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rotate-90"></span>
          </div>
        </label>

        <input
          type="file"
          id="story-upload"
          accept="image/*,video/*"
          onChange={onFileUpload}
          className="hidden"
        />
      </div>
      <p className="text-white text-xs ml-2 text-nowrap">My Story</p>
    </div>
  );
}

function StoryThumbnail({ story, onClick }) {
  return (
    <>
      {/* Desktop View */}
      <div
        className={`relative w-24 h-36 rounded-xl overflow-hidden hidden md:block cursor-pointer transition-transform transform hover:scale-105 ${story.viewed ? "bg-gray-400" : "bg-gradient-to-br from-gray-400 to-gray-600"}`}
        onClick={onClick}
      >
        {story.type === "video" ? (
          <video src={story.url} className="min-w-full min-h-full object-cover" />
        ) : (
          <img
            src={story.url}
            alt={`Story ${story.id}`}
            className="min-w-full min-h-full object-cover"
          />
        )}

        <div className="absolute bottom-2 left-0 w-full h-14 bg-gradient-to-t from-black to-transparent flex flex-col items-center justify-center">
          <div className={`p-0.5 rounded-full ${story.viewed ? "bg-gray-400" : "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"}`}>
            <img
              src={story.user.avatar}
              alt={`${story.user.name}'s Avatar`}
              className="w-8 h-8 rounded-full"
            />
          </div>

          <p className="text-white text-xs">{story.user.name}</p>
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex relative  flex-col items-center flex-none cursor-pointer md:hidden" onClick={onClick}>
        <div className={`p-0.5 rounded-full ${story.viewed ? "bg-gray-400" : "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"}`}>
          <img
            src={story.user.avatar}
            alt={`${story.user.name}'s Avatar`}
            className="w-12 aspect-square rounded-full"
          />
        </div>

        <p className="text-white text-xs text-nowrap">{story.user.name}</p>
      </div>
    </>
  );
}

function FullScreenStory({ story, onClose, onPrevious, onNext, isPreviousAvailable, isNextAvailable }) {
  return (
    <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-[9999999999999999]">
      {/* Close button */}
      <button onClick={onClose} className="text-2xl p-1 absolute top-10 right-10 hover:rotate-[225deg] hover:scale-110 rotate-0 transition-all group text-white z-10 bg-opacity-50 bg-slate-200 hover:bg-opacity-75 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
        <span className="bg-white text-lg h-0.5 w-2/3 absolute rounded-full inline-block left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></span>
        <span className="bg-white text-lg h-0.5 w-2/3 absolute rounded-full inline-block left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 group-hover:rotate-90 transition-all"></span>
      </button>

      {/* User info */}
      <div className="absolute top-10 left-10 flex items-center justify-center gap-2 z-10">
        <div className="w-12 aspect-square rounded-full overflow-hidden flex justify-center items-center">
          <img
            src={story.user.avatar}
            alt={`${story.user.name}'s Avatar`}
            className="rounded-full border-2 border-red-500 min-w-full min-h-full object-cover"
          />
        </div>

        <p className="text-white font-semibold">{story.user.name}</p>
      </div>

      {/* Story content */}
      <div className="relative w-4/5 max-w-2xl group h-auto">
        {isPreviousAvailable && (
          <button
            className="absolute group-hover:left-10 transition-all opacity-40 group-hover:opacity-100 left-16 top-1/2 transform -translate-y-1/2 rotate-180 p-2 bg-slate-500/80 rounded-full text-white w-10 aspect-square text-xl"
            onClick={onPrevious}
          >
            <span className="w-5 aspect-square">
              <ArrowRight />
            </span>
          </button>
        )}

        {story.type === "video" ? (
          <video src={story.url} className="w-full h-auto max-h-dvh rounded-lg" controls autoPlay />
        ) : (
          <img
            src={story.url}
            alt={`Story ${story.id}`}
            className="w-full h-auto max-h-dvh rounded-lg"
          />
        )}

        {isNextAvailable && (
          <button
            className="absolute group-hover:right-10 transition-all opacity-40 group-hover:opacity-100 right-16 top-1/2 -translate-y-1/2 transform p-2 bg-slate-500/80 rounded-full text-white w-10 aspect-square text-xl"
            onClick={onNext}
          >
            <span className="w-5 aspect-square">
              <ArrowRight />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
