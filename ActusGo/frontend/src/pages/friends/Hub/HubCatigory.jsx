import React from "react";
import { Link, useLocation } from "react-router-dom";
import Hubitem from "./HubItem";

function HubCatigory(props) {
  const location = useLocation();

  if (location.pathname === "/friends/Hub") {
    return (
      <div className='w-full justify-center flex'>
        <div className=' h-full p-2  max-h-60 flex flex-wrap relative gap-2 rounded-3xl max-w-[800px] w-full'>
          <div className='justify-left flex flex-wrap right-2'>
            <Hubitem
              name={props.name}
              category={props.category}
              link={props.link}
              icon={props.icon}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full justify-center flex'>
      <div className='bg-black h-full p-2 min-h-[100px] max-h-60 flex flex-wrap relative gap-2 rounded-3xl max-w-[800px] w-full'>
        <div className='justify-left flex flex-wrap right-2'>
          <Hubitem
            name={props.name}
            category={props.category}
            link={props.link}
            icon={props.icon}
          />
        </div>

        <Link to={`/friends/Hub/${props.category}`}>
          <div className='p-2 hover:bg-gray-300/20 px-4 duration-300 select-none cursor-pointer rounded-full absolute bottom-2 right-2'>
            see all
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HubCatigory;
