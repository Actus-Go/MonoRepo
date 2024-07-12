import { useRef } from "react";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";

export default function ImagePreview({
  text,
  user,
  setText,
  images,
  setImages,
  setShowPrev,
  setError,
}) {
  const imageInputRef = useRef(null);
  const handleImages = (e) => {
    let files = [...e.target.files];
    files.forEach((file, i) => {
      if (file.type.startsWith('video/')) {
        if (
          file.type !== "video/mp4" &&
          file.type !== "video/webm" &&
          file.type !== "video/ogg"  
        ) {
          setError(
            `${file.name} format is unsupported ! only mp4, webm, ogg are allowed.`
          );
          files = files.filter((item) => item.name !== file.name);
          return;
        } else if (file.size > 1024 * 1024 * 50) {
          setError(`${file.name} size is too large max 50mb allowed.`);
          files = files.filter((item) => item.name !== file.name);
          return;
        }
      } else if(file.type.startsWith('image/')){
        if (
          file.type !== "image/jpeg" &&
          file.type !== "image/png" &&
          file.type !== "image/webp" &&
          file.type !== "image/gif"
        ) {
          setError(
            `${file.name} format is unsupported ! only jpeg, png, webp, gif are allowed.`
          );
          files = files.filter((item) => item.name !== file.name);
          return;
        }else if (file.size > 1024 * 1024 * 5) {
          setError(`${file.name} size is too large max 5mb allowed.`);
          files = files.filter((item) => item.name !== file.name);
          return;
        }
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, { url: readerEvent.target.result, type: file.type.startsWith('video/') ? 'video' : 'image' }]);
      };
    })
  };

  return (
    <div className="overflow_a scrollbar ">
      <EmojiPickerBackgrounds text={text} user={user} setText={setText} type2 />
      <div className="add_pics_wrap">
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif, video/mp4, video/webm, video/ogg"
          multiple
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images && images.length ? (
          <div className="add_pics_inside1 p0 ">
            <div className="preview_actions ">
              <button className="hover1 text-white">
                <i className="edit_icon"></i>
                Edit
              </button>
              <button
                className="hover1 text-white "
                onClick={() => {
                  imageInputRef.current.click();
                }}
              >
                <i className="addPhoto_icon "></i>
                Add Photos/Videos
              </button>
            </div>
            <div
              className="small_white_circle duration-300 hover:bg-gray-400/10"
              onClick={() => {
                setImages([]);
              }}
            >
              <i className="exit_icon "></i>
            </div>
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4 "
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview6"
                  : "preview6 singular_grid"
              }
            >
              {images.map((img, i) => (
  img.type === 'video' ? (
    <video src={img.url} key={i} controls className="your-video-class" />
  ) : (
    <img src={img.url} key={i} alt="" className="your-image-class" />
  )
))}
            </div>
          </div>
        ) : (
          <div className="add_pics_inside1 ">
            <div
              className="small_white_circle duration-300 hover:bg-gray-400/10"
              onClick={() => {
                setShowPrev(false);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className="add_col"
              onClick={() => {
                imageInputRef.current.click();
              }}
            >
              <div className="add_circle bg-[#6e56fc]/20 ">
              <svg className="" height={28} width={28} viewBox="0 0 24 24" fill="gray" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12.5001L3.75159 10.9675C4.66286 10.1702 6.03628 10.2159 6.89249 11.0721L11.1822 15.3618C11.8694 16.0491 12.9512 16.1428 13.7464 15.5839L14.0446 15.3744C15.1888 14.5702 16.7369 14.6634 17.7765 15.599L21 18.5001" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M17 2V11M17 2L20 5M17 2L14 5" stroke="#6e56fc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 10.8717 2 9.87835 2.02008 9M12 2C7.28595 2 4.92893 2 3.46447 3.46447C3.03965 3.88929 2.73806 4.38921 2.52396 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
              </div>
              <span className="text-white">Add Photos/Videos</span>
              <span className="text-[#6e56fc]">or drag and drop</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
