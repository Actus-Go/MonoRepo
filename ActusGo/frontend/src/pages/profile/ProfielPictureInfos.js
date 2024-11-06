import { useRef, useState } from "react";
import ProfilePicture from "../../components/profielPicture";
import Friendship from "./Friendship";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Camera as CameraIcon } from "lucide-react";

export default function ProfielPictureInfos({
  profile,
  visitor,
  photos,
  othername,
  user,
  brandAccount,
}) {
  const [show, setShow] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const pRef = useRef(null);
  return (
    <div
      className={`profile_img_wrap ${
        brandAccount ? "flex justify-center flex-col   p-0 m-0" : "pt-20"
      }`}>
      {show && (
        <ProfilePicture
          className='absolute z-50'
          setShow={setShow}
          pRef={pRef}
          photos={photos}
        />
      )}
      <div
        className={`profile_w_left ${
          brandAccount ? "justify-center flex  flex-col gap-0 p-0 " : ""
        }`}>
         <div
      className="profile_w_img relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`profile_w_bg ${brandAccount ? "rounded-3xl " : ""}`}
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${profile.picture})`,
        }}
      ></div>

      {brandAccount && (
        <div
          className="absolute bottom-0 text-center text-white text-2xl font-bold w-full flex justify-center"
        >
          {profile.first_name} {profile.last_name}
        </div>
      )}

      {!visitor && isHovered && (
        <div
          className="profile_circle hover1 bg-white"
          onClick={() => setShow(true)}
        >
          <CameraIcon className="w-5 h-5 text-gray-700" />
        </div>
      )}
    </div>
        <div className='profile_w_col '>
          {!brandAccount && (
            <div className='profile_name select-none'>
              {profile.first_name} {profile.last_name}
              <div className='othername'>{othername && `(${othername})`}</div>
            </div>
          )}
          <div className='profile_friend_count'>
            {profile?.friends && (
              <div className='profile_card_count'>
                {profile?.friends.length === 0
                  ? ""
                  : profile?.friends.length === 1
                  ? "1 Friend"
                  : `${profile?.friends.length} Friends`}
              </div>
            )}
          </div>
          <div className='profile_friend_imgs'>
            {profile?.friends &&
              profile.friends.slice(0, 6).map((friend, i) => (
                <Link to={`/profile/${friend.username}`} key={i}>
                  <img
                    src={friend.picture}
                    alt=''
                    style={{
                      transform: `translateX(${-i * 7}px)`,
                      zIndex: `${i}`,
                    }}
                  />
                </Link>
              ))}
          </div>
        </div>
      </div>
      {visitor ? (
        <Friendship friendshipp={profile?.friendship} profileid={profile._id} />
      ) : (
        <div className='profile_w_right'></div>
      )}
    </div>
  );
}

ProfielPictureInfos.propTypes = {
  profile: PropTypes.shape({
    picture: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    friends: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string,
      })
    ),
    friendship: PropTypes.object,
    _id: PropTypes.string,
  }).isRequired,
  visitor: PropTypes.bool.isRequired,
  photos: PropTypes.array.isRequired,
  othername: PropTypes.string,
  user: PropTypes.object,
  brandAccount: PropTypes.bool.isRequired,
};
