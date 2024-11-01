// src/components/Post/Index.jsx
import React, { useEffect, useState } from 'react';
import { MdVerified } from "react-icons/md";
import { IoMdHeart } from "react-icons/io";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdOutlinePushPin } from "react-icons/md";
import { getReacts, reactPost } from "../../functions/post";

export default function Post({ post, user }) {
  const [reactsNumber, setReacts] = useState(0);
  const [check, setCheck] = useState();
  const [total, setTotal] = useState(0);
  const [checkSaved, setCheckSaved] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
        setComments(post?.comments);
        getPostReacts();
  }, [post]);

  const getPostReacts = async () => {
    const res = await getReacts(post._id, user.token);
    let sumtion = 0;
    res.reacts.forEach((react) => {
        sumtion += react.count;
    });
    setReacts(sumtion);
    setCheck(res.check);
    setTotal(res.total);
    setCheckSaved(res.checkSaved);
  };

  const handleLike = () => {
    reactPost(post._id, "like", user.token);
  }

  return (
    <div className="w-full h-screen flex items-center pt-[68px] justify-center bg-gradient-to-b from-gray-900 to-black snap-start">
      <div className="h-[calc(100%-25px)] relative w-full max-w-[450px]">
        <div className="overflow-hidden relative h-full w-full bg-black rounded-3xl p-4 flex justify-center items-center">
          <div className="h-full w-full flex flex-col items-start p-4 justify-end absolute top-0 left-0 bg-white/10">
            <div className="flex flex-col gap-4 justify-start items-start">
              <span className="text-white text-sm flex items-center font-semibold">
                {post?.username}{" "}
                {user?.verified && <MdVerified color="#0D92F4" size={18} />}
              </span>
              <span className="text-white text-sm font-light">
                Enable: "Enable Claude 3.5 Sonnet (Preview) for all clients"
              </span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 -right-12 translate-x-1/2 py-8 flex flex-col gap-4 w-16">
          <div>
            <div className="w-12 aspect-square rounded-full bg-gray-800 overflow-hidden">
              <img src={post?.user?.picture} alt="post" />
            </div>
          </div>
          <div className='flex flex-col justify-center items-center'>
            <button onClick={handleLike} className="hover:bg-gray-600 -mb-2 transition-all w-12 aspect-square pt-0.5 rounded-full bg-gray-800 flex justify-center items-center">
              {check ? <IoMdHeart size={32} color="red" /> : <IoMdHeart size={32} color="#ededed" />}
            </button>

            <span className='text-white font-semibold'>{reactsNumber}</span>
          </div>
          <div>
            <button className="hover:bg-gray-600 w-12 aspect-square rounded-full flex justify-center items-center bg-gray-800">
              <BsFillChatDotsFill size={24} color="#ededed" />
            </button>
          </div>
          <div>
            <button className="hover:bg-gray-600 w-12 aspect-square rounded-full flex justify-center items-center bg-gray-800">
              <MdOutlinePushPin size={24} color="#ededed" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}