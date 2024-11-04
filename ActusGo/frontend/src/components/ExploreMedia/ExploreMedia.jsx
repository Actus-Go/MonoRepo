import React, { useState } from 'react';
import { Play, Heart, MessageCircle, Share2 } from 'lucide-react';
import { CommentView } from '../Post/CommentView';

/* eslint-disable react/prop-types */
const PostCard = ({ post, handleShowComments }) => {
  // Determine the first image to display
  const firstImage = Array.isArray(post.images) && post.images.length > 0 ? post.images[0] : post.content;

  return (
    <div className="relative group overflow-hidden rounded-lg aspect-[3/4] w-full" onClick={handleShowComments}>
      <div className="w-full h-full overflow-hidden bg-gray-100">
        {post.type === 'video' ? (
          <div className="relative w-full h-full">
            <img
              src={post.thumbnail || firstImage}
              alt={post.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="w-12 h-12 text-white opacity-80" />
            </div>
          </div>
        ) : (
          <img
            src={firstImage}
            alt={post.caption}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
        <p className="text-white mb-2 line-clamp-2">{post.caption}</p>
        <div className="flex items-center gap-4 text-white">
          <div className="flex items-center gap-1">
            <Heart className="w-5 h-5" />
            <span>{post.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments.length}</span>
          </div>
          <Share2 className="w-5 h-5 ml-auto" />
        </div>
      </div>
    </div>
  );
};


const PostsGrid = ({ posts, user }) => {
  // State to manage which post's comments are shown
  const [visibleComments, setVisibleComments] = useState({});

  const handleShowComments = (postId) => {
    setVisibleComments((prev) => ({ ...prev, [postId]: true }));
  };

  const handleExitComments = (postId) => {
    setVisibleComments((prev) => ({ ...prev, [postId]: false }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:ml-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <React.Fragment key={post.id}>
            <PostCard
              post={post}
              handleShowComments={() => handleShowComments(post.id)}
            />
            {visibleComments[post.id] && (
              <CommentView
                close={() => handleExitComments(post.id)}
                comments={post.comments}
                postId={post.id}
                user={user}
                images={post.content}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default PostsGrid;
