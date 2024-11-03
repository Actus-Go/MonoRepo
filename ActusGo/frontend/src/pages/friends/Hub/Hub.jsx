import React from "react";
import { Link, useLocation } from "react-router-dom";
import HubItem from "./HubItem";
import Sparkels from "../../../components/createPost/Sparkels";
import HubCatigory from "./HubCatigory";
import PropTypes from 'prop-types';

function Hub(props) {
  const location = useLocation();

  if (location.pathname === "/friends/Hub") {
    return (
      <div className="  w-full ">
        <div className='flex pt-6  justify-center w-full'>
          <div className='flex relative justify-start  w-full  max-w-[800px]'>
            <h1 className={`uppercase rounded-xl select-none text-left text-2xl font-bold text-gray-200 ml-4 ${props.category === "Try it" ? "box-decoration-clone bg-gradient-to-r from-indigo-600 to-pink-500 px-4  py-1" : ""}`}>
                {props.category}
                {props.category === "Try it" && <div className=" absolute top-0 left-24"><Sparkels /></div>}

            </h1>
          </div>
        </div>

        <div className='w-full   px-2 flex bg-re-800 justify-center pt-2  '>
        {props.category === "Try it" ? (
            <HubCatigory
                name={props.name}
                category={"disable"}
                link={props.link}
                icon={props.icon}
            />
        ) : (
            <HubCatigory
                name={props.name}
                category={props.category}
                link={props.link}
                icon={props.icon}
            />
        )}
        </div>
        <div className='w-full justify-center  pt-12 px-2 flex'>
          <div className=' h-full p-2 min-h-[100px] max-h-60 flex flex-wrap relative gap-2 rounded-3xl max-w-[800px] w-full'>
            <div className='justify-left flex flex-wrap right-2'>
              <HubItem
                                  name={props.name}
                                  category ={props.category}
                                  link={props.link}
                                  icon={props.icon}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full justify-center flex px-2'>
      <div className='bg-black h-full p-2 min-h-[100px] max-h-60 flex flex-wrap relative gap-2 rounded-3xl max-w-[800px] w-full'>
        <div className='justify-left flex flex-wrap right-2'>
          <HubItem
                              name={props.name}
                              category ={props.category}
                              link={props.link}
                              icon={props.icon}
          />
        </div>

        <Link to='/friends/Hub'>
          <div className='p-2 hover:bg-gray-300/20 px-4 duration-300 select-none cursor-pointer rounded-full absolute bottom-2 right-2'>
            see all
          </div>
        </Link>
      </div>
    </div>
  );
}

Hub.propTypes = {
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

// Optional: Add default props if needed
Hub.defaultProps = {
  category: '',
  name: '',
  link: '#',
  icon: ''
};

export default Hub;
