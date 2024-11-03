import { useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useOnClickOutside from "../../utils/clickOutside";
import { deletePost, savePost } from "../../functions/post";
import { saveAs } from "file-saver";
import PropTypes from 'prop-types';

export default function PostMenu({
  postUserId,
  userId,
  imagesLength,
  setShowMenu,
  token,
  postId,
  checkSaved,
  setCheckSaved,
  images,
  postRef,
}) {
  const [test, setTest] = useState(postUserId === userId ? true : false);
  const menu = useRef(null);
  useOnClickOutside(menu, () => setShowMenu(false));
  const saveHandler = async () => {
    savePost(postId, token);
    if (checkSaved) {
      setCheckSaved(false);
    } else {
      setCheckSaved(true);
    }
  };
  const downloadImages = async () => {
    images.map((img) => {
      saveAs(img.url, "image.jpg");
    });
  };
  const deleteHandler = async () => {
    const res = await deletePost(postId, token);
    if (res.status === "ok") {
      postRef.current.remove();
    }
  };
  return (
    <ul className="post_menu bg-[#101010]/80 backdrop-blur-md" ref={menu}>
      {test && <MenuItem icon="pin_icon" title="Pin Post" />}
      <div onClick={() => saveHandler()}>
        {checkSaved ? (
          <MenuItem
            icon="save_icon"
            title="Unsave Post"
            subtitle="Remove this from your saved items."
          />
        ) : (
          <MenuItem
            icon="save_icon"
            title="Save Post"
            subtitle="Add this to your saved items."
          />
        )}
      </div>
      <div className="line"></div>
    
     
      {imagesLength && (
        <div onClick={() => downloadImages()}>
          <MenuItem icon="download_icon" title="Download" />
        </div>
      )}
      {imagesLength > 0 && (
        <div onClick={() => window.open(images[0].url, '_blank')}>
          <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
        </div>
      )}
      {test && <MenuItem img="../../../icons/lock.png" title="Edit audience" />}
    

      {test && (
        <div onClick={() => deleteHandler()}>
          <MenuItem
            icon="trash_icon"
            title="Move to trash"
            subtitle="items in your trash are deleted after 30 days"
          />
        </div>
      )}
      {!test && <div className="line"></div>}
      {!test && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post"
          subtitle="i'm concerned about this post"
        />
      )}
      <div 
      className=""
      onClick={() => setShowMenu(false)}>
        <MenuItem
          icon="exit_icon"
          title="Exit"
        />
      </div>
    </ul>
  );
}

PostMenu.propTypes = {
  postUserId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  imagesLength: PropTypes.number.isRequired,
  setShowMenu: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  checkSaved: PropTypes.bool.isRequired,
  setCheckSaved: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
  })).isRequired,
  postRef: PropTypes.shape({
    current: PropTypes.shape({
      remove: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};