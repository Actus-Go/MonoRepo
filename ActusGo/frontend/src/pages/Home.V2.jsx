import React from "react";
import { useUser } from "../customHooks/UserHook";
import { BeatLoader } from "react-spinners";
import Post from "../components/Post";

export default function Home({ loading, posts }) {
  const user = useUser();

  return loading ? (
    <div className="h-screen w-full flex justify-center">
      <BeatLoader color="#6e56fc" />
    </div>
  ) : (
    <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory">
      {posts.map((post, index) => (
        <Post key={index} post={post} user={user} />
      ))}
    </div>
  );
}

