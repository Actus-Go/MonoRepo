import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  acceptRequest,
  cancelRequest,
  deleteRequest,
} from "../../functions/user";

export default function Card({ userr, type, getData }) {
  const { user } = useSelector((state) => ({ ...state }));
  const cancelRequestHandler = async (userId) => {
    const res = await cancelRequest(userId, user.token);
    if (res == "ok") {
      getData();
    }
  };

  const premium = true;

  const confirmHandler = async (userId) => {
    const res = await acceptRequest(userId, user.token);
    if (res == "ok") {
      getData();
    }
  };
  const deleteHandler = async (userId) => {
    const res = await deleteRequest(userId, user.token);
    if (res == "ok") {
      getData();
    }
  };
  return (
    <div className=' select-none hover:bg-gray-700/20  duration-500 bg-black/20 h-64 max-w-[250px] w-full rounded-3xl relative overflow-hidden '>
      <Link
        className='relative shadow-inner  '
        to={`/profile/${userr.username}`}>
        <div className='w-full flex justify-center m-auto h-[100%] relative '>
          <img
            className='rounded-full  top-2 absolute  h-36 shadow-black'
            src={userr.picture}
            alt=''
          />
          
        </div>
      </Link>

      <button
        className='hover:bg-black/20 backdrop-blur-2xl duration-300 text-white grid place-items-center absolute rounded-full h-8 w-8 right-2  top-2'
        onClick={() => cancelRequestHandler(userr._id)}>
        <i className='exit_icon'></i>
      </button>

      <div className='absolute bottom-0 rounded-3xl right-0 left-0 p-2 text-center'>
        <div className='p-2 bg-black/40 backdrop-blur-lg rounded-2xl'>
          <span className=' text-2xl capitalize flex  gap-0 justify-center w-full shadow-2xl'>
          <span className="flex w-full gap-[2px]  justify-center ">
            <span style={{ fontSize: premium ? '24px' : '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {`${userr.first_name} ${userr.last_name}`.length > 14
                ? `${`${userr.first_name} ${userr.last_name}`.substring(0, 14)}...`
                : `${userr.first_name} ${userr.last_name}`}
            </span> {premium === true ? (
            <span className='h-6 w-6 relative grid place-items-center '>
              <svg
                id='Layer_1'
                data-name='Layer 1'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 122.88 116.87'
                height={18}
                width={18}
                fill='yellow'>
                <defs>
                  <style
                    dangerouslySetInnerHTML={{
                      __html: ".cls-1{fill-rule:evenodd;}",
                    }}
                  />
                </defs>
                <title>verify</title>
                <path
                  className='cls-1'
                  d='M61.37,8.24,80.43,0,90.88,17.78l20.27,4.54-2,20.53,13.73,15.58L109.2,73.87l2,20.68L91,99,80.43,116.87l-18.92-8.25-19.06,8.25L32,99.08,11.73,94.55l2-20.54L0,58.43,13.68,43,11.73,22.32l20.15-4.45L42.45,0,61.37,8.24ZM37.44,64.55c-6.07-6.53,3.25-16.26,10-10.1,2.38,2.17,5.84,5.34,8.24,7.49L74.18,39.18C80.62,32.53,90.79,42.3,84.43,49L61.2,76.72a7.13,7.13,0,0,1-9.91.44C47.35,73.41,41.57,68,37.44,64.55Z'
                />
              </svg>
            </span>
          ) : null}
          </span>
          </span>

          <span className='max-w-[100%]   justify-center flex'>
            {type === "sent" ? (
              <button
                className='bg-gray-800/20 hover:bg-gray-700/20 duration-300 min-w-[200px]  hover:animate-pulse  text-gray-300 font-extrabold uppercase w-full max-w-[200px] h-9 rounded-3xl'
                onClick={() => cancelRequestHandler(userr._id)}>
                Cancel Request
              </button>
            ) : type === "request" ? (
              <>
                <button
                  className='bg-[#efff55] min-w-[200px] duration-300 hover:animate-pulse border-2 text-black font-extrabold uppercase w-full max-w-[200px] h-9 rounded-3xl'
                  onClick={() => confirmHandler(userr._id)}>
                  accept
                </button>
              </>
            ) : (
              ""
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
