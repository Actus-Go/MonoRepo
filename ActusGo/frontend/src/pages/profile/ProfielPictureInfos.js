import { useRef, useState } from "react";
import ProfilePicture from "../../components/profielPicture";
import Friendship from "./Friendship";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Camera as CameraIcon } from "lucide-react";
import PrimaryButton from "../../components/Buttons/PrimaryButton";

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
        brandAccount
          ? "flex justify-start md:pl-[10%] lg:pl-[5%] m-0"
          : "pt-5"
      }`}
    >
      {show && (
        <ProfilePicture setShow={setShow} pRef={pRef} photos={photos} />
      )}
      <div
        className={`profile_w_left z-10 h-full relative ${
          brandAccount ? "justify-left gap-2 flex p-0" : ""
        }`}
      >
        <div
          className="flex relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`w-44 h-44 bg-white border-2 border-white bg-no-repeat cursor-pointer -translate-y-14 ${
              brandAccount ? "rounded-3xl" : "rounded-full"
            } hover:brightness-95`}
            style={{
              backgroundColor: "#fff",
              backgroundSize: "cover",
              backgroundImage: `url(${profile.picture})`,
            }}
          ></div>

          {!visitor && isHovered && (
            <div
              className="profile_circle hover1 bg-white"
              onClick={() => setShow(true)}
            >
              <CameraIcon className="w-5 h-5 text-gray-700" />
            </div>
          )}
        </div>

        <div className="profile_w_col w-full h-full">
          <div className="flex justify-center text-wrap -md:text-center">
            <div className="profile_name md:text-left text-center select-none">
              {profile.first_name} {profile.last_name}{" "}
              {othername && (
                <span className="font-normal">({othername})</span>
              )}
            </div>
          </div>

          <div className="profile_friend_imgs">
            {profile?.friends &&
              profile.friends.slice(0, 6).map((friend, i) => (
                <Link to={`/profile/${friend.username}`} key={i}>
                  <img
                    src={friend.picture}
                    alt=""
                    className="z-[calc(i)]"
                    style={{
                      transform: `translateX(${-i * 7}px)`,
                    }}
                  />
                </Link>
              ))}
          </div>
        </div>

        {!visitor && (
          <div className="profile_actions w-full justify-end flex gap-2 mt-4">
            <PrimaryButton text="Edit Profile" />
          </div>
        )}
      </div>
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
    followerCount: PropTypes.number,
    followingCount: PropTypes.number,
    friendship: PropTypes.object,
    _id: PropTypes.string,
  }).isRequired,
  visitor: PropTypes.bool.isRequired,
  photos: PropTypes.array.isRequired,
  othername: PropTypes.string,
  user: PropTypes.object,
  brandAccount: PropTypes.bool.isRequired,
};