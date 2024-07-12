import React from 'react'
import Skeleton from "react-loading-skeleton";
import { Link } from 'react-router-dom';

function Hubitem(props) {
  return (
    <>
      <Link to={props.link}>
        <div className='w-32 relative '>
          {props.icon ? (
            <div className='h-32 w-32 bg-gray-700/40  m-0 p-0 relative rounded-3xl grid place-items-center '>
              <img className='h-16 w-16' src={props.icon} alt='' />
            </div>
          ) : (
            <Skeleton className='h-32 w-32 rounded-3xl m-0 p-0 grid place-items-center '  />
          )}
          <div className='w-full m-0 p-0 pl-2'>
            <h1 className='text-sm text-white pt-2'>
              {props.name ? (
                <span>{props.name.substring(0, 30)}</span>
              ) : (
                <Skeleton  className='text-sm text-white pt-2' />
              )}
            </h1>
            {props.category && props.category !== "disable" ? (
              <p>{props.category.substring(0, 15)}</p>
            ) : (
              null
            )}
          </div>
        </div>
      </Link>
    </>
  )
}

export default Hubitem