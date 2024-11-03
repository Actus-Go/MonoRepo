/* eslint-disable react/prop-types */
import React from 'react';
import { Play, Heart, MessageCircle, Share2 } from 'lucide-react';

const PostCard = ({ post }) => {
  return (
    <div className="relative group overflow-hidden rounded-lg h-[375px]">
      <div className="w-full h-full overflow-hidden bg-gray-100">
        {post.type === 'video' ? (
          <div className="relative w-full h-full">
            <img
              src={post.thumbnail || post.content}
              alt={post.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="w-12 h-12 text-white opacity-80" />
            </div>
          </div>
        ) : (
          <img
            src={post.content}
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
            <span>{post.comments}</span>
          </div>
          <Share2 className="w-5 h-5 ml-auto" />
        </div>
      </div>
    </div>
  );
};


const PostsGrid = ({ posts }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostsGrid;
