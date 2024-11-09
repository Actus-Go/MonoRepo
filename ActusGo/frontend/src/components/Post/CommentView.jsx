import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button } from "../Buttons";
import { Link } from "react-router-dom";
import { comment } from "../../functions/post";
import { BeatLoader } from "react-spinners";

function timeSince(date) {
    if (date === null) {
        return "just now";
    }

    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }

    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }

    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }

    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }

    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }

    if (seconds < 60) {
        return "just now";
    }
    return Math.floor(seconds) + " seconds ago";
}

export function CommentView({
    close,
    comments: initialComments,
    postId,
    user,
    images,
}) {
    const [isActive, setActive] = useState(false);
    const [comments, setComments] = useState(initialComments);
    const [commentText, setCommentText] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setActive(true);
    }, []);

    const handleComment = async () => {
        console.log("Commenting...");
        console.log("Comment text:", commentText);

        if (!commentText.trim()) return;

        try {
            setLoading(true);
            const updatedComments = await comment(
                postId,
                commentText,
                "",
                user?.token
            );
            setComments(updatedComments);
            setCommentText("");
        } catch (error) {
            console.error("Error posting comment:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleExit = () => {
        setActive(false);
        setTimeout(() => {
            close();
        }, 300);
    };

    return (
        <div className="w-screen h-screen absolute inset-0 gap-0 overflow-hidden top-0 right-0 flex z-[99999999999]">
            <div
                className={`bg-white/10 h-full w-full backdrop-blur-xl flex justify-center items-center ${
                    isActive ? "opacity-100" : "opacity-0"
                } transition-all duration-300`}
            >
                <button
                    onClick={handleExit}
                    className="group/exit w-8 p-2 aspect-square rounded-full absolute top-4 left-4 bg-black/15 hover:bg-black/30"
                >
                    <span className="w-3/4 h-[3px] rounded-full group-hover/exit:rotate-45 bg-white/80 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
                    <span className="w-3/4 h-[3px] rounded-full group-hover/exit:-rotate-45 bg-white/80 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
                </button>
                <div
                    className={`transition-all h-[90%] overflow-hidden max-w-[450px] rounded-3xl w-full duration-300 relative ${
                        isActive
                            ? "scale-100 translate-x-0"
                            : "scale-50 -translate-x-1/3"
                    }`}
                >
                    <div className="overflow-x-auto overflow-y-hidden bg-slate-950 z-10 relative flex snap-x snap-mandatory w-full h-full whitespace-nowrap">
                        {
                            // check if the post has media files and check if it image or video and display it
                            images?.map((image, index) => {
                                let url =
                                    (typeof image === "string"
                                        ? image
                                        : image.url);

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
                    <div className="absolute w-full h-full top-0 left-0 z-0 bg-slate-950/30 animate-pulse"></div>
                </div>
            </div>
            <div
                className={`bg-gray-950 h-full transition-all duration-300 flex flex-col ${
                    isActive ? "w-1/3" : "w-0"
                }`}
            >
                <div className="h-full flex flex-col p-5 gap-5 w-full items-center overflow-x-hidden overflow-y-auto">
                    {comments.map((comment, index) => (
                        <div
                            key={index}
                            className="flex flex-col w-full gap-2 p-2"
                        >
                            <div className="flex gap-2 w-full items-start">
                                <Link
                                    to={`/profile/${comment?.commentBy?.username}`}
                                    className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-800"
                                >
                                    <img
                                        src={comment?.commentBy?.picture}
                                        alt={comment?.commentBy?.username}
                                        className="w-full h-full object-cover"
                                    />
                                </Link>
                                <div className="flex flex-col gap-1 justify-start items-start">
                                    <Link
                                        to={`/profile/${comment?.commentBy?.username}`}
                                        className="text-white font-semibold hover:underline"
                                    >
                                        {comment?.commentBy?.first_name +
                                            " " +
                                            comment?.commentBy?.last_name}
                                    </Link>
                                    <span className="text-start font-light text-slate-300">
                                        {comment?.comment}
                                    </span>
                                </div>
                            </div>
                            <div className="justify-start text-start w-full px-4">
                                <span className="text-slate-500 text-sm font-light">
                                    {timeSince(comment?.commentAt || null)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-16 flex justify-center items-center gap-2 p-2 py-3 border-t w-full border-gray-700">
                    <input
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        className="w-4/5 p-2 text-white h-full rounded-full transition-all border bg-transparent border-gray-700 disabled:opacity-50"
                        placeholder="Comment here"
                        onKeyUp={(e) =>
                            !loading && e.key === "Enter" && handleComment()
                        }
                        disabled={loading}
                    />
                    <Button
                        onClick={handleComment}
                        className="w-1/5 h-full rounded-full text-base font-semibold"
                        label={
                            loading ? (
                                <BeatLoader size={8} color="#f0f0f0" />
                            ) : (
                                "Send"
                            )
                        }
                        disabled={loading}
                    />
                </div>
            </div>
        </div>
    );
}

CommentView.propTypes = {
    close: PropTypes.func.isRequired,
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired,
    user: PropTypes.shape({
        token: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }).isRequired,
    images: PropTypes.arrayOf(
        PropTypes.shape({
            url: PropTypes.string.isRequired,
        })
    ),
};

// Default props in case images is not provided
CommentView.defaultProps = {
    images: [],
};
