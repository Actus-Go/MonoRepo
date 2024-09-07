import { useState } from 'react';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [activeStoryIndex, setActiveStoryIndex] = useState(null); // For story navigation

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const isValidFileType = file.type.includes('image') || file.type.includes('video');
      const maxSizeInMB = 10;
      const isValidFileSize = file.size / (1024 * 1024) <= maxSizeInMB;

      if (isValidFileType && isValidFileSize) {
        const newStory = {
          id: stories.length,
          url: URL.createObjectURL(file),
          type: file.type.includes('video') ? 'video' : 'image',
          user: {
            name: `User ${stories.length + 1}`,
            avatar: `https://via.placeholder.com/50?text=User${stories.length + 1}`,
          },
          viewed: false,
        };
        setStories([...stories, newStory]);
      } else {
        alert(`Please upload an image or video under ${maxSizeInMB}MB.`);
      }
    }
  };

  const markStoryAsViewed = (index) => {
    setStories(
      stories.map((story, i) =>
        i === index ? { ...story, viewed: true } : story
      )
    );
  };

  const openFullScreen = (index) => {
    setActiveStoryIndex(index);
    markStoryAsViewed(index); // Mark the story as viewed when opened
  };

  const closeFullScreen = () => {
    setActiveStoryIndex(null);
  };

  const goToPreviousStory = () => {
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
    }
  };

  const goToNextStory = () => {
    if (activeStoryIndex < stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
    }
  };

  return (
    <>
      <div className="mx-auto bg-gray-900 p-4 rounded-lg shadow-lg">
        <h1 className="text-white text-xl p-2">Stories</h1>

        <div className="flex  items-center pb-4">
          <CreateStoryButton onFileUpload={handleFileUpload} />
          {stories.map((story, index) => (
            <StoryCard
              key={story.id}
              story={story}
              onStoryClick={() => openFullScreen(index)}
            />
          ))}
        </div>
      </div>

      {activeStoryIndex !== null && (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
    <div className="absolute top-0 right-0 m-4 text-white z-10 bg-opacity-50 bg-slate-200  hover:bg-opacity-75 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
    <button
      className=" text-2xl p-1"
      onClick={closeFullScreen}
    >
      &times;
    </button>

    </div>
    
    {/* User Info */}
    <div className="absolute top-5 left-5 flex items-center space-x-2 z-10">
      <img
        src={stories[activeStoryIndex].user.avatar}
        alt={`${stories[activeStoryIndex].user.name} Avatar`}
        className=" rounded-full border-2 border-red-500"
      />
      <p className="text-white font-semibold">{stories[activeStoryIndex].user.name}</p>
    
    </div>

    {/* Story content */}
    <div className="relative w-full max-w-xl h-auto p-4 ">
    
      {/* Left arrow */}
      {activeStoryIndex > 0 && (
        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-slate-300 bg-opacity-50 rounded-full text-white w-7 h-7 text-xl"
          onClick={goToPreviousStory}
        >
          &#8249;
        </button>
      )}
      
      {stories[activeStoryIndex].type === 'video' ? (
        <video
          src={stories[activeStoryIndex].url}
          className="w-full h-auto max-h-screen rounded-lg"
          controls
          autoPlay
        />
      ) : (
        <img
          src={stories[activeStoryIndex].url}
          alt={`Story ${stories[activeStoryIndex].id}`}
          className="w-full h-auto max-h-screen rounded-lg"
        />
      )}

      {/* Right arrow */}
      {activeStoryIndex < stories.length - 1 && (
        <button
          className="absolute right-0 top-1/2  transform -translate-y-1/2 bg-slate-300 bg-opacity-50 rounded-full text-white  w-7 h-7  text-xl"
          onClick={goToNextStory}
        >
          &#8250;
        </button>
      )}
    </div>
  </div>
)}
    </>
  );
};

const CreateStoryButton = ({ onFileUpload}) => (

  <>
  <div className="relative flex-shrink-0 w-24 h-36 hidden md:block text-center rounded-xl overflow-hidden cursor-pointer border border-gray-700">
    
   
    
    <label htmlFor="story-upload" className="w-full h-full flex flex-col items-center justify-end">
    <img src={`https://via.placeholder.com/50?text=User`} alt=""  className='absolute w-full h-full'/>
      <div className="rounded-full right-0 z-10 bg-blue-500 flex items-center justify-center w-5 h-5">
      <p className=' text-white  text-center  text-lg ' >+</p>
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
  {/* moblie view */}
  <div className="block md:hidden m-2">
<div className="bottom-0 left-0 w-full h-12  flex flex-col items-center justify-center cursor-pointer"
      
  >
  <div className=" relative bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 rounded-full">
  <div className="absolute bottom-0 rounded-full right-0 z-10 bg-blue-500 flex items-center justify-center w-5 h-5">
      <p className=' text-white  text-center  text-lg ' >+</p>
    </div>
    <label htmlFor="story-upload" className=" w-full h-full relative left-0 flex flex-col items-center justify-center cursor-pointer">
    <img
      src={`https://via.placeholder.com/50?text=User`}
      alt='avatar'
      className="w-12 h-12 rounded-full"
    />   
    
     </label>
        <input
      type="file"
      id="story-upload"
      accept="image/*,video/*"
      onChange={onFileUpload}
      className="hidden"
    />

  </div>
  <p className="text-white text-xs ml-2"> my story</p>
</div>
</div>

  </>
  
);

const StoryCard = ({ story, onStoryClick }) => (

  <>
    <div 
    className={`relative w-24 h-36 mx-2 rounded-xl overflow-hidden hidden md:block cursor-pointer transition-transform transform hover:scale-105 ${
      story.viewed ? 'bg-gray-400' : 'bg-gradient-to-br from-gray-400 to-gray-600'
    }`} 
    onClick={onStoryClick}
  >
    {story.type === 'video' ? (
      <video src={story.url} className="w-full h-full object-cover" />
    ) : (
      <img src={story.url} alt={`Story ${story.id}`} className="w-full h-full object-cover" />
    )}
    <div className="absolute bottom-0 left-0 w-full h-14 bg-gradient-to-t from-black to-transparent flex flex-col items-center justify-center">
      <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-0.5 rounded-full">
        <img
          src={story.user.avatar}
          alt={`${story.user.name} Avatar`}
          className="w-8 h-8 rounded-full"
        />
      </div>
      <p className="text-white text-xs ml-2">{story.user.name}</p>
    </div>
  </div>

<div className="block md:hidden mx-1.5">
<div className="bottom-0 left-0 w-full h-12  flex flex-col items-center justify-center cursor-pointer"
      onClick={onStoryClick}

  >
  <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 rounded-full">
    <img
      src={story.user.avatar}
      alt={`${story.user.name} Avatar`}
      className="w-12 h-12 rounded-full"
    />
  </div>
  <p className="text-white text-xs ml-2">{story.user.name}</p>
</div>
</div>


  </>
);

export default Stories;
