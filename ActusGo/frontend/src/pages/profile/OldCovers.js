import { useRef } from "react";
import { useSelector } from "react-redux";
import useClickOutside from "../../utils/clickOutside";

export default function OldCovers({ photos, setCoverPicture, setShow }) {
  const { user } = useSelector((state) => ({ ...state }));
  const Ref = useRef(null);
  useClickOutside(Ref, () => setShow(false));

  return (
    <div className='fixed inset-0 z-50 bg-black/50 p-4 md:p-6 overflow-y-auto'>
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-[#222222] text-white rounded-lg w-full max-w-4xl mx-auto overflow-hidden shadow-xl'>
          {/* Header Section */}
          <div className='flex justify-between items-center p-5 border-b border-gray-700'>
            <button
              className='text-gray-400 hover:text-white transition'
              onClick={() => setShow(false)}>
              <div className='text-2xl rounded-full p-2 duration-500 hover:bg-white/20'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  x='0px'
                  y='0px'
                  width='32'
                  height='32'
                  viewBox='0 0 32 32'>
                  <path
                    fill='white'
                    d='M25.372,23.279c-2.507-1.79-4.909-3.792-7.238-6.001c2.602-2.673,5.117-5.613,7.566-8.878 c0.497-0.663,0.362-1.604-0.3-2.101c-0.664-0.495-1.603-0.362-2.101,0.3c-2.366,3.155-4.792,5.993-7.3,8.57 c-2.507-2.577-4.934-5.415-7.3-8.57C8.203,5.938,7.264,5.805,6.6,6.3C5.938,6.797,5.803,7.737,6.3,8.4 c2.449,3.265,4.964,6.205,7.567,8.878c-2.329,2.209-4.731,4.211-7.238,6.001c-0.674,0.481-0.83,1.418-0.349,2.093 C6.572,25.782,7.033,26,7.501,26c0.302,0,0.606-0.091,0.871-0.279c2.646-1.89,5.177-4.003,7.628-6.333 c2.451,2.331,4.982,4.443,7.628,6.333C23.893,25.909,24.197,26,24.499,26c0.468,0,0.929-0.219,1.222-0.628 C26.202,24.697,26.046,23.761,25.372,23.279z'></path>
                </svg>
              </div>{" "}
              {/* Close icon */}
            </button>
            <span className='text-xl font-semibold'>
              Select from your old covers
            </span>
            <div></div> {/* Placeholder for spacing */}
          </div>

          {/* Image Gallery */}
          <div className='overflow-y-auto max-h-[60vh] p-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800'>
            {/* Recent Photos */}
            <div className='grid grid-cols-3 gap-4'>
              {photos
                .filter(
                  (img) => img.folder === `${user.username}/cover_pictures`
                )
                .map((photo) => (
                  <img
                    key={photo.public_id}
                    src={photo.secure_url}
                    alt='Cover'
                    className='w-full h-36 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transform transition duration-200'
                    onClick={() => {
                      setCoverPicture(photo.secure_url);
                      setShow(false);
                    }}
                  />
                ))}
            </div>

            {/* Other Photos */}
            <div className='grid grid-cols-3 gap-4 mt-6'>
              {photos
                .filter((img) => img.folder !== `${user.username}/post_images`)
                .map((photo) => (
                  <img
                    key={photo.public_id}
                    src={photo.secure_url}
                    alt='Cover'
                    className='w-full h-36 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transform transition duration-200'
                    onClick={() => {
                      setCoverPicture(photo.secure_url);
                      setShow(false);
                    }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
