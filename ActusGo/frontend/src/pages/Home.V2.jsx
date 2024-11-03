import React, { useState } from "react";
import PropTypes from 'prop-types';
import { useUser } from "../customHooks/UserHook";
import { BeatLoader } from "react-spinners";
import Post from "../components/Post";

export default function Home({ loading, posts, setVisible }) {
  const user = useUser();

  return loading ? (
    <div className="h-screen w-full flex justify-center">
      <BeatLoader color="#6e56fc" />
    </div>
  ) : (
    <div className="w-full h-full relative">
      <div className="w-full h-screen overflow-y-auto snap-y snap-mandatory">
        {posts.map((post, index) => (
          <Post key={index} post={post} user={user} />
        ))}
      </div>
      
      <button
        onClick={setVisible}
        className="group/exit w-10 p-3 aspect-square rounded-full absolute bottom-8 right-12 bg-white/15 hover:bg-white/30"
      >
        <span className="w-3/4 h-[3px] rounded-full group-hover/exit:rotate-[180deg] rotate-0 bg-white/80 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
        <span className="w-3/4 h-[3px] rounded-full group-hover/exit:rotate-[-270deg] rotate-90 bg-white/80 transition-all absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></span>
      </button>
    </div>
  );
}

Home.propTypes = {
  loading: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.object.isRequired,
      comments: PropTypes.array
    })
  ).isRequired
};
