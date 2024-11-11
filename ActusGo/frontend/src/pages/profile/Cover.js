import React, { useCallback, useEffect, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import useClickOutside from "../../utils/clickOutside";
import getCroppedImg from "../../utils/getCroppedImg";
import { uploadImages } from "../../functions/uploadImages";
import { useSelector } from "react-redux";
import { updateCover } from "../../functions/user";
import { createPost } from "../../functions/post";
import PulseLoader from "react-spinners/PulseLoader";
import OldCovers from "./OldCovers";
import { Camera as CameraIcon } from "lucide-react";
import { Upload as UploadIcon } from "lucide-react";
import { Image as ImageIcon } from "lucide-react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";
import SecondaryButton from "../../components/Buttons/SecondaryButton";

export default function Cover({ cover, visitor, photos }) {
  const [showCoverMenu, setShowCoverMenu] = useState(false);
  const [coverPicture, setCoverPicture] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const menuRef = useRef(null);
  const refInput = useRef(null);
  const cRef = useRef(null);
  const [error, setError] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const coverRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [currentCover, setCurrentCover] = useState(cover);

  useEffect(() => {
    const handleResize = () => {
      if (coverRef.current) {
        setWidth(coverRef.current.clientWidth);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setCoverPicture("");
    setError("");
    setLoading(false);
    setShowCoverMenu(false);
  }, []);

  useClickOutside(menuRef, () => setShowCoverMenu(false));

  const navigateToUpgrade = () => {
    window.location.href = "/upgrade";
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!validTypes.includes(file.type)) {
      setError("Invalid file type. Please use JPEG, PNG, WebP, or GIF.");
      return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setError("File is too large. Maximum size is 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setCoverPicture(event.target.result);
      setError("");
    };
    reader.onerror = () => {
      setError("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(coverPicture, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setCoverPicture(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );

  const updateCoverPicture = async () => {
    try {
      setLoading(true);
      setError("");

      const img = await getCroppedImage();
      if (!img) throw new Error("Failed to crop image");

      const blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/cover_pictures`;

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);

      const uploadResponse = await uploadImages(formData, user.token);
      if (!uploadResponse?.[0]?.url) {
        throw new Error("Failed to upload image");
      }

      const coverUpdateResponse = await updateCover(
        uploadResponse[0].url,
        user.token
      );
      if (coverUpdateResponse !== "ok") {
        throw new Error(coverUpdateResponse || "Failed to update cover");
      }

      await createPost(
        "coverPicture",
        null,
        null,
        uploadResponse[0].url,
        user.token
      );

      // Update the current cover image without refresh
      setCurrentCover(uploadResponse[0].url);
      setCoverPicture("");
      setShowCoverMenu(false);
    } catch (error) {
      setError(error.message || "An error occurred while updating cover photo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative md:pl-[80px] lg:pl-[0px] w-full'>
      <div
        className='relative w-full h-[350px] bg-gray-100 rounded-b-3xl overflow-hidden  group'
        ref={coverRef}>
        <img
          src={currentCover || "/api/placeholder/1200/350"}
          alt='Cover'
          className='w-full h-full object-cover'
          ref={cRef}
        />
        {!visitor && (
        <div
        className={`absolute top-2 right-2 px-3 py-2 opacity-85 rounded-full text-sm ${
          user?.membership
            ? user.membership === "premium"
              ? "bg-purple-600 text-white"
              : "bg-yellow-400 text-black"
            : "bg-white text-black"
        }`}
      >
        {user?.membership ? (
          user.membership === "premium" ? (
            "Premium"
          ) : (
            "Premium+"
          )
        ) : (
          <button className="upgrade_cta" onClick={() => navigateToUpgrade()}>
            Upgrade to Premium
          </button>
        )}
      </div>
      
        )}

        {!visitor && (
          <button
            onClick={() => setShowCoverMenu(true)}
            className='absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white p-3 rounded-full shadow-lg hover:bg-gray-100'>
            <CameraIcon className='w-5 h-5 text-gray-700' />
          </button>
        )}
      </div>

      {showCoverMenu && (
        <div
          ref={menuRef}
          className='absolute bottom-16 right-4 bg-white rounded-lg shadow-xl p-2 w-48'>
          <button
            onClick={() => refInput.current?.click()}
            className='w-full px-4 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md'>
            <UploadIcon className='w-4 h-4' />
            Upload Photo
          </button>
          <button
            onClick={() => setShow(true)}
            className='w-full px-4 py-2 flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md'>
            <ImageIcon className='w-4 h-4' />
            Choose from Library
          </button>
        </div>
      )}

      <input
        type='file'
        ref={refInput}
        className='hidden'
        accept='image/jpeg,image/png,image/webp,image/gif'
        onChange={handleImage}
      />

      {error && (
        <div className='fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50'>
          <p>{error}</p>
          <button
            onClick={() => setError("")}
            className='absolute top-1 right-1 text-red-500 hover:text-red-700'>
            ×
          </button>
        </div>
      )}

      {coverPicture && (
        <div className='fixed inset-0 z-50 bg-black/50 p-4 md:p-6 overflow-y-auto'>
          <div className='min-h-screen flex items-center justify-center'>
            <div className='bg-[#222222] rounded-lg w-full max-w-4xl mx-auto'>
              <div className='relative h-[60vh] md:h-[70vh]'>
                <Cropper
                  image={coverPicture}
                  crop={crop}
                  zoom={zoom}
                  aspect={width / 350}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  showGrid
                  objectFit='horizontal-cover'
                  classes={{
                    containerClassName: "h-full",
                    mediaClassName: "h-full",
                  }}
                />
              </div>
              <div className='p-4 border-t flex justify-end gap-2'>
                <div className='h-12 min-w-32 flex gap-2'>
                <SecondaryButton
                    onClick={() => setCoverPicture("")}
                    text='Cancel'
                  />
                  <PrimaryButton

                    onClick={updateCoverPicture}
                    text='Save Changes'
                    loading={loading && <PulseLoader color='#fff' size={5} />}

                  />
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {show && (
        <OldCovers
          photos={photos}
          setCoverPicture={setCoverPicture}
          setShow={setShow}
        />
      )}
    </div>
  );
}
