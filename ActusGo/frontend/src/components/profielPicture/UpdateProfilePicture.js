import { useCallback, useRef, useState } from "react";
import Cropper from "react-easy-crop";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../functions/post";
import { uploadImages } from "../../functions/uploadImages";
import { updateprofilePicture } from "../../functions/user";
import getCroppedImg from "../../utils/getCroppedImg";
import PulseLoader from "react-spinners/PulseLoader";
import Cookies from "js-cookie";
export default function UpdateProfilePicture({
  setImage,
  image,
  setError,
  setShow,
  pRef,
}) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const slider = useRef(null);
  const { user } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  const zoomIn = () => {
    slider.current.stepUp();
    setZoom(slider.current.value);
  };
  const zoomOut = () => {
    slider.current.stepDown();
    setZoom(slider.current.value);
  };
  const getCroppedImage = useCallback(
    async (show) => {
      try {
        const img = await getCroppedImg(image, croppedAreaPixels);
        if (show) {
          setZoom(1);
          setCrop({ x: 0, y: 0 });
          setImage(img);
        } else {
          return img;
        }
      } catch (error) {
        console.log(error);
      }
    },
    [croppedAreaPixels]
  );
  const updateProfielPicture = async () => {
    try {
      setLoading(true);
      let img = await getCroppedImage();
      let blob = await fetch(img).then((b) => b.blob());
      const path = `${user.username}/profile_pictures`;
      let formData = new FormData();
      formData.append("file", blob);
      formData.append("path", path);
      const res = await uploadImages(formData, path, user.token);
      const updated_picture = await updateprofilePicture(
        res[0].url,
        user.token
      );
      if (updated_picture === "ok") {
        const new_post = await createPost(
          "profilePicture",
          null,
          description,
          res,
          user.id,
          user.token
        );
        if (new_post.status === "ok") {
          setLoading(false);
          setImage("");
          pRef.current.style.backgroundImage = `url(${res[0].url})`;
          Cookies.set(
            "user",
            JSON.stringify({
              ...user,
              picture: res[0].url,
            })
          );
          dispatch({
            type: "UPDATEPICTURE",
            payload: res[0].url,
          });
          setShow(false);
        } else {
          setLoading(false);

          setError(new_post);
        }
      } else {
        setLoading(false);

        setError(updated_picture);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="postBox update_img">
      <div className="box_header">
        <div className="small_circle" onClick={() => setImage("")}>
          <i className="exit_icon"></i>
        </div>
        <span>Update profile picture</span>
      </div>
      <div className="update_image_desc">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea_blue details_input"
        ></textarea>
      </div>

      <div className="update_center">
        <div className="crooper">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            showGrid={false}
          />
        </div>
        <div className="slider">
          <div className="slider_circle hover1" onClick={() => zoomOut()}>
            <i className="minus_icon"></i>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.2}
            ref={slider}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
          />
          <div className="slider_circle hover1" onClick={() => zoomIn()}>
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>
      <div className="flex_up">
        <div className="gray_btn" onClick={() => getCroppedImage("show")}>
          <i className="crop_icon"></i>Crop photo
        </div>
        <div className="gray_btn">
          <i className="temp_icon"></i>Make Temporary
        </div>
      </div>
      <div className="flex_p_t">
        <i className="public_icon"></i>
        Your profile picture is public
      </div>
      <div className="update_submit_wrap">
        <div className="blue_link" onClick={() => setImage("")}>
          Cancel
        </div>
        <button
          className="blue_btn"
          disabled={loading}
          onClick={() => updateProfielPicture()}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : "Save"}
        </button>
      </div>
    </div>
  );
}
