import React, { useState } from "react";
import { Play, Heart, MessageCircle, Share2 } from "lucide-react";
import { CommentView } from "../Post/CommentView";
import axios from "axios";

/* eslint-disable react/prop-types */
const PostCard = ({ post, handleShowComments }) => {
    // Determine the first image to display
    const firstImage =
        Array.isArray(post.images) && post.images?.length > 0
            ? post.images[0]
            : post.text;

    return (
        <button
            className="relative block group cursor-pointer overflow-hidden rounded-lg aspect-[3/4] w-full"
            onClick={handleShowComments}
        >
            <div className="w-full h-full overflow-hidden bg-gray-100">
                <img
                    src={firstImage}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <p className="text-white mb-2 line-clamp-2">{post.text}</p>
                <div className="flex items-center gap-4 text-white">
                    <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5" />
                        <span>{post.reacts}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.comments}</span>
                    </div>
                    <Share2 className="w-5 h-5 ml-auto" />
                </div>
            </div>
        </button>
    );
};

export default function PostsGrid({ posts, user }) {
    // State to manage which post's comments are shown
    const [activePost, setActivePost] = useState(null);

    const handleShowComments = async (postId) => {
        try {
            const response = await axios.get(
                `http://localhost:8000/post/${postId}`,
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            setActivePost(response.data);
        } catch (error) {
            console.error("Error fetching post:", error);
        }
    };

    const handleClose = () => {
        setActivePost(null);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:ml-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {posts.map((post) => (
                    <PostCard
                        post={post}
                        handleShowComments={async () =>
                            await handleShowComments(post._id)
                        }
                    />
                ))}

                {activePost && (
                    <CommentView
                        close={() => handleClose()}
                        comments={activePost?.comments}
                        postId={activePost._id}
                        user={user}
                        images={activePost?.images}
                    />
                )}
            </div>
        </div>
    );
}
