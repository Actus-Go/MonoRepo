import axios from "axios";
import { useEffect, useReducer, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { profileReducer } from "../../functions/reducers";
import Header from "../../components/header";
import "./style.css";
import Cover from "./Cover";
import ProfielPictureInfos from "./ProfielPictureInfos";
import CreatePost from "../../components/createPost";
import Post from "../../components/Post/index";
import Photos from "./Photos";
import Friends from "./Friends";
import Intro from "../../components/intro";
import { useMediaQuery } from "react-responsive";
import CreatePostPopup from "../../components/createPostPopup";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BeatLoader } from "react-spinners";

export default function Profile({ getAllPosts }) {
  const [visible, setVisible] = useState(false);
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const [photos, setPhotos] = useState({});
  var userName = username === undefined ? user.username : username;

  const [{ loading, profile }, dispatch] = useReducer(profileReducer, {
    loading: false,
    profile: {},
    error: "",
  });
  const brandAccount = true;
  useEffect(() => {
    getProfile();
  }, [userName]);
  useEffect(() => {
    setOthername(profile?.details?.otherName);
  }, [profile]);

  var visitor = userName === user.username ? false : true;
  const [othername, setOthername] = useState();
  const path = `${userName}/*`;
  const max = 30;
  const sort = "desc";

  const getProfile = async () => {
    try {
      dispatch({
        type: "PROFILE_REQUEST",
      });
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (data.ok === false) {
        navigate("/profile");
      } else {
        try {
          const images = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/listImages`,
            { path, sort, max },
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setPhotos(images.data);
        } catch (error) {
          console.log(error);
        }
        dispatch({
          type: "PROFILE_SUCCESS",
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: "PROFILE_ERROR",
        payload: error.response.data.message,
      });
    }
  };
  const profileTop = useRef(null);
  const leftSide = useRef(null);
  const [height, setHeight] = useState();
  const [leftHeight, setLeftHeight] = useState();
  const [scrollHeight, setScrollHeight] = useState();
  useEffect(() => {
    setHeight(profileTop.current.clientHeight + 300);
    setLeftHeight(leftSide.current.clientHeight);
    window.addEventListener("scroll", getScroll, { passive: true });
    return () => {
      window.addEventListener("scroll", getScroll, { passive: true });
    };
  }, [loading, scrollHeight]);
  const check = useMediaQuery({
    query: "(min-width:901px)",
  });
  const getScroll = () => {
    setScrollHeight(window.pageYOffset);
  };

  const LoaderColor = "#6e56fc";

  return (
    <div className="profile relative text-gray-100">
      {visible && (
        <CreatePostPopup
          user={user}
          setVisible={setVisible}
          posts={profile?.posts}
          dispatch={dispatch}
          profile
        />
      )}

      <div className="">
        <div className="profile_top" ref={profileTop}>
          <div className="profile_container">
            {loading ? (
              <>
                <div className="profile_cover">
                  <Skeleton
                    height="347px"
                    containerClassName="avatar-skeleton"
                    style={{ borderRadius: "8px" }}
                  />
                </div>
                <div
                  className="profile_img_wrap"
                  style={{
                    marginBottom: "-3rem",
                    transform: "translateY(-8px)",
                  }}
                >
                  <div className="profile_w_left">
                    <Skeleton
                      circle
                      height="180px"
                      width="180px"
                      containerClassName="avatar-skeleton"
                      style={{ transform: "translateY(-3.3rem)" }}
                    />
                    <div className="profile_w_col">
                      <div className="profile_name">
                        <Skeleton
                          height="35px"
                          width="200px"
                          containerClassName="avatar-skeleton"
                        />
                        <Skeleton
                          height="30px"
                          width="100px"
                          containerClassName="avatar-skeleton"
                          style={{ transform: "translateY(2.5px)" }}
                        />
                      </div>
                      <div className="profile_friend_count">
                        <Skeleton
                          height="20px"
                          width="90px"
                          containerClassName="avatar-skeleton"
                          style={{ marginTop: "5px" }}
                        />
                      </div>
                      <div className="profile_friend_imgs">
                        {Array.from(new Array(6), (val, i) => i + 1).map(
                          (id, i) => (
                            <Skeleton
                              circle
                              height="32px"
                              width="32px"
                              containerClassName="avatar-skeleton"
                              style={{ transform: `translateX(${-i * 7}px)` }}
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className={`friendship ${!visitor && "fix"}`}>
                    <Skeleton
                      height="36px"
                      width={120}
                      containerClassName="avatar-skeleton"
                    />
                    <div className="flex">
                      <Skeleton
                        height="36px"
                        width={120}
                        containerClassName="avatar-skeleton"
                      />
                      {visitor && (
                        <Skeleton
                          height="36px"
                          width={120}
                          containerClassName="avatar-skeleton"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {brandAccount && (
                  <div className="mt-20 overflow-hidden  rounded-3xl px-4">
                    <Cover
                      cover={profile.cover}
                      visitor={visitor}
                      photos={photos.resources}
                      brandAccount={brandAccount}
                    />
                  </div>
                )}
                <div className="">
                  <ProfielPictureInfos
                    profile={profile}
                    visitor={visitor}
                    photos={photos.resources}
                    othername={othername}
                    loading={loading}
                    brandAccount={brandAccount}
                  />
                </div>
              </>
            )}
          </div>
        </div>
        <div className="profile_bottom">
          <div className="profile_container">
            <div className="bottom_container">
              <div
                className={`profile_grid ${
                  check && scrollHeight >= height && leftHeight > 1000
                    ? "scrollFixed showLess"
                    : check &&
                      scrollHeight >= height &&
                      leftHeight < 1000 &&
                      "scrollFixed showMore"
                }`}
              >
                <div className="profile_left" ref={leftSide}>
                  {loading ? (
                    <>
                      <div className="profile_card border-2 border-gray">
                        <div className="profile_card_header">Intro</div>
                        <div className="sekelton_loader">
                          <BeatLoader color={LoaderColor} />
                        </div>
                      </div>
                      <div className="profile_card border-2 border-gray">
                        <div className="profile_card_header">
                          Photos
                          <div className="profile_header_link">
                            See all photos
                          </div>
                        </div>
                        <div className="sekelton_loader">
                          <BeatLoader color={LoaderColor} />
                        </div>
                      </div>
                      <div className="profile_card border-2 border-gray">
                        <div className="profile_card_header">
                          Friends
                          <div className="profile_header_link">
                            See all friends
                          </div>
                        </div>
                        <div className="sekelton_loader">
                          <BeatLoader color={LoaderColor} />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Intro
                        detailss={profile.details}
                        visitor={visitor}
                        setOthername={setOthername}
                        brandAccount={brandAccount}
                      />
                      <Photos
                        username={userName}
                        token={user.token}
                        photos={photos}
                        brandAccount={brandAccount}
                      />
                      {!brandAccount && <Friends friends={profile.friends} />}
                    </>
                  )}
                </div>
                <div className="profile_right">
                  {!visitor && (
                    <CreatePost
                      user={user}
                      profile
                      setVisible={setVisible}
                      brandAccount={brandAccount}
                    />
                  )}

                  {loading ? (
                    <div className="sekelton_loader">
                      <BeatLoader color={LoaderColor} />
                    </div>
                  ) : (
                    <div className="posts">
                      {profile.posts && profile.posts.length ? (
                        profile.posts.map((post) => (
                          <Post
                            post={post}
                            user={user}
                            key={post._id}
                            profile
                          />
                        ))
                      ) : (
                        <div className="no_posts">No posts available</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
