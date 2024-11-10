import { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/header";
import { friendspage } from "../../functions/reducers";
import { getFriendsPageInfos } from "../../functions/user";
import Card from "./Card";
import "../home/style.css";
import Sparkels from "../../components/createPost/Sparkels";
import FriendsCard from "./FriendsCard";
import Hub from "./Hub/Hub";
import Skeleton from "react-loading-skeleton";
import AsideNav from "../../components/header/ASideNav/AsideNav"
export default function Friends() {
  const { user } = useSelector((state) => ({ ...state }));
  const { type } = useParams();
  const [{ loading, error, data }, dispatch] = useReducer(friendspage, {
    loading: false,
    data: {},
    error: "",
  });
  const [showSkeleton, setShowSkeleton] = useState(true); // Add state for showing Skeleton loader
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSkeleton(false); // Hide Skeleton loader after 5000 milliseconds
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  const getData = async () => {
    dispatch({ type: "FRIENDS_REQUEST" });
    const data = await getFriendsPageInfos(user.token);
    if (data.status === "ok") {
      dispatch({ type: "FRIENDS_SUCCESS", payload: data.data });
    } else {
      dispatch({ type: "FRIENDS_ERROR", payload: data.data });
    }
  };

  const catigory = "Travel";

  return (
    <div className=" relative h-full w-full  ">
     
      <div className='pt-24 px-2 text-white flex  m-auto w-full justify-center '>
        <div className=' max-w-[800px]  w-full '>
          {(type === undefined || type === "requests") && data.requests && (
            <div className='  w-full  p-2 rounded-2xl'>
              <div className='w-full'>
                {data.requests && data.requests.length > 0 && (
                  <div className='flex full  relative'>
                    <h1 className=' animate-pulse hover:animate-none select-none text-left  text-2xl font-bold text-gray-200 ml-4'>
                      Friend Requests
                    </h1>
                    <div className='absolute left-48 -top-3'>
                      <Sparkels />
                    </div>
                  </div>
                )}
                {type === undefined &&
                  data.requests &&
                  data.requests.length > 4 && (
                    <Link
                      to='/friends/requests'
                      className='see_link hover3 rounded-3xl p-2'>
                      See all
                    </Link>
                  )}
              </div>
              <div className='flex_wrap'>
                {data.requests &&
                  data.requests.map((user) => (
                    <>
                      <Card
                        userr={user}
                        key={user._id}
                        type='request'
                        getData={getData}
                      />
                    </>
                  ))}
              </div>
            </div>
          )}

          <div className=''>
            <div className='friends_left_header'></div>
            <div className='friends_left_wrap'></div>
          </div>

          {(type === undefined || type === "sent") &&
            data.sentRequests &&
            data.sentRequests.length > 0 && (
              <div className='friends_right_wrap'>
                <div className='friends_left_header'>
                  <div className='flex relative'>
                    <h1 className=' hover:animate-none select-none text-left  text-2xl font-bold text-gray-200 ml-4'>
                      Sent Requests
                    </h1>
                  </div>
                  {type === undefined && (
                    <Link
                      to='/friends/sent'
                      className='see_link hover3 rounded-3xl p-2'>
                      See all
                    </Link>
                  )}
                </div>
                <div className='flex_wrap'>
                  {data.sentRequests &&
                    data.sentRequests.map((user) => (
                      <Card
                        userr={user}
                        key={user._id}
                        type='sent'
                        getData={getData}
                      />
                    ))}
                </div>
              </div>
            )}

          {(type === undefined || type === "all") && (
            <div className='friends_right_wrap'>
              <div className='friends_left_header'>
                <div className='flex relative'>
                  <h1 className='  select-none text-left py-4  text-2xl font-bold text-gray-200 ml-4'>
                    Friend{" "}
                  </h1>
                </div>
              </div>

              {data.friends && data.friends.length > 0 ? (
                <div className='flex_wrap px-2 py-2 bg-black overflow-hidden h-[72px] relative w-full rounded-full '>
                  <div className='flex justify-between w-full'>
                    {data.friends && data.friends.length > 0
                      ? data.friends.map((user) => (
                        <>
                          <FriendsCard
                            userr={user}
                            key={user._id}
                            type='friends'
                            getData={getData}
                          />
                        </>
                      ))
                      : null}
                    {type === undefined &&
                      data.friends &&
                      data.friends.length > 0 && (
                        <Link
                          to='/friends/all'
                          className='see_link absolute right-4 shadow-2xl duration-300 shadow-black hover3 p-2 px-4 rounded-3xl'>
                          See all
                        </Link>
                      )}
                  </div>
                </div>
              ) : (
                <>
                  {showSkeleton ? (
                    <Skeleton className='flex_wrap px-2 py-2 bg-black/10 overflow-hidden h-[72px] relative w-full rounded-full' />
                  ) : (
                    <div className='  p-2' style={{ textAlign: "center" }}>
                      <div
                        className='bg-[#eaebe813] backdrop-blur-lg rounded-2xl text-white font-bold'
                        style={{
                          color: "#eeff5552",
                          fontSize: "24px",
                          marginBottom: "10px",
                          fontFamily: "sans-serif",
                          padding: "10px",
                          borderRadius: "10px",
                          textAlign: "center",
                          width: "fit-content",
                          margin: "auto",
                        }}>
                        No Friends Yet
                        <div style={{ color: "#efff55", fontSize: "16px" }}>
                          <Link
                            className='underline underline-offset-4'
                            to='/invite'>
                            Invite friends to join you on Hub
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
