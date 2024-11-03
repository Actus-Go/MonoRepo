import { Link } from "react-router-dom";
import "./style.css";
import Moment from "react-moment";
import { Dots } from "../../icons";
import ReactsPopup from "./ReactsPopup";
import { useContext, useEffect, useRef, useState } from "react";
import CreateComment from "./CreateComment";
import PostMenu from "./PostMenu";
import { comment, getReacts, reactPost } from "../../functions/post";
import { CarouselContext } from "pure-react-carousel";
import PropTypes from "prop-types";

import {
    CarouselProvider,
    Slider,
    Slide,
    ButtonBack,
    ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import Comment from "./Comment";
import Skeleton from "react-loading-skeleton";

export default function Post({ post, user, profile }) {
    const [visible, setVisible] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [reacts, setReacts] = useState();
    const [check, setCheck] = useState();
    const [total, setTotal] = useState(0);
    const [count, setCount] = useState(1);
    const [checkSaved, setCheckSaved] = useState();
    const [comments, setComments] = useState([]);
    const [imageLoaded, setImageLoaded] = useState(false);
    const carouselContext = useContext(CarouselContext);
    const currentSlide = carouselContext?.state?.currentSlide;
    const premium = true;

    useEffect(() => {
        getPostReacts();
    }, [post]);

    useEffect(() => {
        setComments(post?.comments);
    }, [post]);

    const getPostReacts = async () => {
        const res = await getReacts(post._id, user.token);
        setReacts(res.reacts);
        setCheck(res.check);
        setTotal(res.total);
        setCheckSaved(res.checkSaved);
    };
    const handleLike = () => {
        reactPost(post._id, "like", user.token);
        if (check === "like") {
            setCheck();
            let index = reacts.findIndex((x) => x.react === check);
            if (index !== -1) {
                let updatedReacts = [...reacts];
                updatedReacts[index].count--;
                setReacts(updatedReacts);
                setTotal((prev) => --prev);
            }
        } else {
            setCheck("like");
            let index = reacts.findIndex((x) => x.react === "like");
            let index1 = reacts.findIndex((x) => x.react === check);
            if (index !== -1) {
                let updatedReacts = [...reacts];
                updatedReacts[index].count++;
                setReacts(updatedReacts);
                setTotal((prev) => ++prev);
            }
            if (index1 !== -1) {
                let updatedReacts = [...reacts];
                updatedReacts[index1].count--;
                setReacts(updatedReacts);
                setTotal((prev) => --prev);
            }
        }
    };

    const reactHandler = async (type) => {
        reactPost(post._id, type, user.token);
        if (check === type) {
            setCheck();
            let index = reacts.findIndex((x) => x.react === check);
            if (index !== -1) {
                setReacts([
                    ...reacts,
                    (reacts[index].count = --reacts[index].count),
                ]);
                setTotal((prev) => --prev);
            }
        } else {
            setCheck(type);
            let index = reacts.findIndex((x) => x.react === type);
            let index1 = reacts.findIndex((x) => x.react === check);
            if (index !== -1) {
                setReacts([
                    ...reacts,
                    (reacts[index].count = ++reacts[index].count),
                ]);
                setTotal((prev) => ++prev);
                console.log(reacts);
            }
            if (index1 !== -1) {
                setReacts([
                    ...reacts,
                    (reacts[index1].count = --reacts[index1].count),
                ]);
                setTotal((prev) => --prev);
                console.log(reacts);
            }
        }
    };
    const showMore = () => {
        setCount((prev) => prev + 3);
    };
    const postRef = useRef(null);
    return (
        <div
            className="post text-white rounded-[30px] overflow-hidden"
            style={{ width: `${profile && "100%"}` }}
            ref={postRef}
        >
            {post.background ? (
                <div
                    className="post_bg"
                    style={{ backgroundImage: `url(${post.background})` }}
                >
                    <div className="post_bg_text text-white">{post.text}</div>
                </div>
            ) : post.type === null ? (
                <>
                    <div className="post_text">{post.text}</div>
                    {post.images && post.images.length && (
                        <div className={`   ${"relative   "}`}>
                            {post.images.length > 0 && (
                                <CarouselProvider
                                    className=""
                                    naturalSlideWidth={100}
                                    naturalSlideHeight={50}
                                    totalSlides={post.images.length}
                                    visibleSlides={1}
                                    isIntrinsicHeight={true}
                                    dragEnabled={
                                        post.images.length <= 1 ? false : true
                                    }
                                    touchEnabled={
                                        post.images.length <= 1 ? false : true
                                    }
                                    onDoubleClick={handleLike}
                                    playDirection="forward"
                                >
                                    <div className="relative left-0 top-0 flex flex-col sm:flex-row justify-between w-full">
                                        {" "}
                                        <div className="absolute flex  flex-row-reverse justify-between pt-6 right-0 top-0 w-full z-20 px-2 mt-2 ">
                                            <div
                                                className="post_header_right hover1 h-12 w-12 duration-500 hover:bg-[#101010]/40 backdrop-blur-lg"
                                                onClick={() =>
                                                    setShowMenu((prev) => !prev)
                                                }
                                            >
                                                <Dots color="#efff55" />
                                            </div>

                                            <div className="post_profile_name flex flex-col sm:flex-row text-white z-20 hover:bg-[#] bg-black/40 backdrop-blur-xl p-2 rounded-full text-left ">
                                                <Link
                                                    to={`/profile/${post.user.username}`}
                                                    className="post_header_left cursor-pointer select-none"
                                                >
                                                    <img
                                                        src={post.user.picture}
                                                        className="rounded-full h-10 w-10 "
                                                        alt=""
                                                    />

                                                    <span className="w-full capitalize z-20 flex flex-col">
                                                        <span className="text-left w-full text-[#efff55] gap-0 flex px-1">
                                                            {`${post.user.first_name} ${post.user.last_name}`.slice(
                                                                0,
                                                                10
                                                            )}{" "}
                                                            {premium ===
                                                            true ? (
                                                                <span
                                                                    className={`${
                                                                        `${post.user.first_name} ${post.user.last_name}`
                                                                            .length >
                                                                        10
                                                                            ? "text-sm"
                                                                            : ""
                                                                    }`}
                                                                ></span>
                                                            ) : (
                                                                ""
                                                            )}
                                                            <span className="h-6 w-6 relative grid place-items-center ">
                                                                <svg
                                                                    id="Layer_1"
                                                                    data-name="Layer 1"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    viewBox="0 0 122.88 116.87"
                                                                    height={18}
                                                                    width={18}
                                                                    fill="yellow"
                                                                >
                                                                    <defs>
                                                                        <style
                                                                            dangerouslySetInnerHTML={{
                                                                                __html: ".cls-1{fill-rule:evenodd;}",
                                                                            }}
                                                                        />
                                                                    </defs>
                                                                    <title>
                                                                        verify
                                                                    </title>
                                                                    <path
                                                                        className="cls-1"
                                                                        d="M61.37,8.24,80.43,0,90.88,17.78l20.27,4.54-2,20.53,13.73,15.58L109.2,73.87l2,20.68L91,99,80.43,116.87l-18.92-8.25-19.06,8.25L32,99.08,11.73,94.55l2-20.54L0,58.43,13.68,43,11.73,22.32l20.15-4.45L42.45,0,61.37,8.24ZM37.44,64.55c-6.07-6.53,3.25-16.26,10-10.1,2.38,2.17,5.84,5.34,8.24,7.49L74.18,39.18C80.62,32.53,90.79,42.3,84.43,49L61.2,76.72a7.13,7.13,0,0,1-9.91.44C47.35,73.41,41.57,68,37.44,64.55Z"
                                                                    />
                                                                </svg>
                                                            </span>
                                                        </span>
                                                        <span className="text-xs w-full text-left -mt-3 font-thin">
                                                            {" "}
                                                            <Moment
                                                                fromNow
                                                                interval={30}
                                                                className="w-full px-1 text-left"
                                                            >
                                                                {post.createdAt}
                                                            </Moment>
                                                        </span>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <Slider>
                                        {!imageLoaded && (
                                            <Skeleton className="w-full h-full object-cover" />
                                        )}
                                        {post.images.map((image, i) => (
                                            <Slide index={i} key={i}>
                                                {image.type === "video" ? (
                                                    <video
                                                        src={image.url}
                                                        className={`${`img-${i} `} ${"w-full h-full object-cover"}`}
                                                        onLoadedData={() =>
                                                            setImageLoaded(true)
                                                        }
                                                        style={{
                                                            display: imageLoaded
                                                                ? "block"
                                                                : "none",
                                                        }}
                                                        controls
                                                    />
                                                ) : (
                                                    <img
                                                        src={image.url}
                                                        alt=""
                                                        className={`${`img-${i} `} ${"w-full h-full object-cover"}`}
                                                        onLoad={() =>
                                                            setImageLoaded(true)
                                                        }
                                                        style={{
                                                            display: imageLoaded
                                                                ? "block"
                                                                : "none",
                                                        }}
                                                    />
                                                )}
                                            </Slide>
                                        ))}
                                    </Slider>
                                    {post.images.length > 1 && (
                                        <>
                                            {currentSlide !== 0 && (
                                                <ButtonBack
                                                    className="p-6 "
                                                    style={{
                                                        position: "absolute",
                                                        top: "50%",
                                                        left: "0",
                                                        transform:
                                                            "translateY(-50%)",
                                                    }}
                                                >
                                                    <img
                                                        src="/images/btnslider.png"
                                                        className="h-[30px] w-[30px] rotate-180"
                                                        alt=""
                                                    />
                                                </ButtonBack>
                                            )}
                                            <ButtonNext
                                                className="p-6 "
                                                style={{
                                                    position: "absolute",
                                                    top: "50%",
                                                    right: "0",
                                                    transform:
                                                        "translateY(-50%)",
                                                }}
                                            >
                                                <img
                                                    src="/images/btnslider.png"
                                                    className="h-[30px] w-[30px]"
                                                    alt=""
                                                />
                                            </ButtonNext>
                                        </>
                                    )}
                                </CarouselProvider>
                            )}
                        </div>
                    )}
                </>
            ) : post.type === "profilePicture" ? (
                <div className="post_profile_wrap">
                    <div className="post_updated_bg">
                        <img src={post.user.cover} alt="" />
                    </div>
                    <img
                        src={post.images[0].url}
                        alt=""
                        className="post_updated_picture"
                    />
                </div>
            ) : (
                <div className="post_cover_wrap">
                    <img src={post.images[0].url} alt="" />
                </div>
            )}

            <div className="post_infos "></div>
            <div className="post_actions">
                <ReactsPopup
                    visible={visible}
                    setVisible={setVisible}
                    reactHandler={reactHandler}
                />
                <div
                    className="post_action hover1 "
                    onMouseOver={() => {
                        setTimeout(() => {
                            setVisible(true);
                        }, 500);
                    }}
                    onMouseLeave={() => {
                        setTimeout(() => {
                            setVisible(false);
                        }, 500);
                    }}
                    onClick={() => reactHandler(check ? check : "like")}
                >
                    {check ? (
                        <img
                            src={`../../../reacts/${check}.svg`}
                            alt=""
                            className="small_react"
                            style={{ width: "18px" }}
                        />
                    ) : (
                        <i className="like_icon"></i>
                    )}
                    <span>
                        {check ? check : null} {total > 0 && total}
                    </span>
                </div>
                <div className="post_action hover1">
                    <i className="comment_icon"></i>
                    <span>{comments.length}</span>
                </div>
            </div>
            <div className="comments_wrap">
                <div className="comments_order"></div>
                <CreateComment
                    user={user}
                    postId={post._id}
                    setComments={setComments}
                    setCount={setCount}
                />
                {comments
                    ?.sort((a, b) => {
                        return new Date(b.commentAt) - new Date(a.commentAt);
                    })
                    ?.slice(0, count)
                    ?.map((comment) => (
                        <Comment comment={comment} key={comment._id} />
                    ))}
                {count < (comments?.length ?? 0) && (
                    <div className="view_comments" onClick={() => showMore()}>
                        View more comments
                    </div>
                )}
            </div>
            {showMenu && (
                <PostMenu
                    userId={user.id}
                    postUserId={post.user._id}
                    imagesLength={post?.images?.length}
                    setShowMenu={setShowMenu}
                    postId={post._id}
                    token={user.token}
                    checkSaved={checkSaved}
                    setCheckSaved={setCheckSaved}
                    images={post.images}
                    postRef={postRef}
                />
            )}
        </div>
    );
}

Post.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        comments: PropTypes.array,
        background: PropTypes.string,
        text: PropTypes.string,
        type: PropTypes.string,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string,
            })
        ),
        user: PropTypes.shape({
            _id: PropTypes.string,
            username: PropTypes.string,
            picture: PropTypes.string,
            first_name: PropTypes.string,
            last_name: PropTypes.string,
            cover: PropTypes.string,
        }),
        createdAt: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({
        token: PropTypes.string.isRequired,
        id: PropTypes.string,
    }).isRequired,
    profile: PropTypes.object,
};

Post.defaultProps = {
    profile: false,
};
