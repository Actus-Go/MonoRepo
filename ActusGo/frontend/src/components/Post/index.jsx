import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MdVerified } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdOutlinePushPin } from "react-icons/md";
import { getReacts, reactPost } from "../../functions/post";
import { Link } from "react-router-dom";

export default function Post({ post, user, showComments }) {
    const [check, setCheck] = useState();
    const [total, setTotal] = useState(0);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setComments(post?.comments);
        getPostReacts();
    }, [post]);

    const getPostReacts = async () => {
        const res = await getReacts(post._id, user.token);
        setCheck(res.check);
        setTotal(res.total);
    };

    const handleLike = () => {
        reactPost(post._id, "like", user.token);
        setCheck(!check);
        setTotal(check ? total - 1 : total + 1);
    };

    return (
        <div className="w-full h-full flex items-start justify-center pt-[68px] max-sm:pt-[58px] max-sm:pb-[60px] pb-4 box-border snap-start">
            <div className="h-full max-sm:aspect-auto max-sm:w-full relative aspect-[9/16]">
                <div className="overflow-hidden relative h-full w-full max-sm:rounded-none p-0 bg-black/60 rounded-3xl flex justify-center items-center">
                    <div className="overflow-x-auto overflow-y-hidden flex snap-x snap-mandatory w-full h-full whitespace-nowrap">
                        {
                            // check if the post has media files and check if it image or video and display it
                            post?.images?.map((image, index) => {
                                let url =
                                    typeof image === "string"
                                        ? image
                                        : image.url;
                                return (
                                    <div
                                        key={index}
                                        className="w-full h-full flex-shrink-0 snap-start inline-block"
                                    >
                                        {
                                            // check type by extension of the media file
                                            url?.split(".").pop() === "mp4" ? (
                                                <video
                                                    className="w-full h-full object-contain"
                                                    src={url}
                                                    controls={false}
                                                    autoPlay
                                                />
                                            ) : (
                                                <img
                                                    className="w-full h-full object-contain"
                                                    src={url}
                                                    alt="post"
                                                />
                                            )
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="h-full w-full flex flex-col items-start p-0 justify-end absolute top-0 left-0 bg-white/10">
                        <div className="flex bg-gradient-to-t from-black/50 to-transparent w-full p-4 py-8 flex-col gap-4 justify-start items-start">
                            <Link
                                to={`/profile/${post?.user?.username}`}
                                className="group text-white text-sm flex items-center font-semibold"
                            >
                                <span className="group-hover:underline underline-offset-1">
                                    {post?.user?.username}{" "}
                                </span>
                                {/* Check if the user who shared this post is verified, and display the verified icon if true */}
                                {post?.user?.verified && (
                                    <MdVerified color="#0D92F4" size={18} />
                                )}
                            </Link>
                            <span className="text-white text-sm font-light">
                                {post.text}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 max-sm:right-1 max-sm:translate-x-0 max-sm:bottom-4 -right-12 translate-x-1/2 py-8 max-sm:py-2 flex flex-col gap-4 w-16">
                    <div>
                        <Link
                            to={`/profile/${post?.user?.username}`}
                            className="w-14 aspect-square inline-block rounded-full bg-gray-800 overflow-hidden"
                        >
                            <img src={post?.user?.picture} alt="post" />
                        </Link>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <button
                            onClick={handleLike}
                            className="hover:bg-gray-600 -mb-2 transition-all w-14 aspect-square pt-0.5 rounded-full bg-gray-800 flex justify-center items-center"
                        >
                            {check ? (
                                <IoMdHeart size={32} color="red" />
                            ) : (
                                <IoMdHeart size={32} color="#ededed" />
                            )}
                        </button>

                        <span className="text-white font-semibold">
                            {total}
                        </span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <button
                            onClick={showComments}
                            className="hover:bg-gray-600 -mb-2 transition-all w-14 aspect-square pt-0.5 rounded-full bg-gray-800 flex justify-center items-center"
                        >
                            <BsFillChatDotsFill size={24} color="#ededed" />
                        </button>

                        <span className="text-white font-semibold">
                            {comments.length}
                        </span>
                    </div>
                    <div>
                        <button className="hover:bg-gray-600 w-14 aspect-square rounded-full flex justify-center items-center bg-gray-800">
                            <MdOutlinePushPin size={24} color="#ededed" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

Post.propTypes = {
    post: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        comments: PropTypes.array,
        images: PropTypes.arrayOf(
            PropTypes.shape({
                url: PropTypes.string.isRequired,
            })
        ),
        user: PropTypes.shape({
            username: PropTypes.string.isRequired,
            verified: PropTypes.bool,
            picture: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    user: PropTypes.shape({
        token: PropTypes.string.isRequired,
    }).isRequired,
};
