import axios from "axios";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import PMail from "../../lotte/UbQJwAbfyc.json";
import PropTypes from 'prop-types';

export default function SendEmail({
  userInfos,
  email,
  error,
  setError,
  setVisible,
  setLoading,
}) {
  const sendEmail = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
        { email }
      );
      setError("");
      setVisible(2);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className='reset_form dynamic_height border-[1px] border-gray-300/10 relative box-content px-3 sm:px-0 '>
      <div className='reset_form_header font-extrabold  text-white text-center sm:text-left'>
        Reset Your Password
      </div>
      <div className="flex w-full  justify-center">
        <div className='flex w-full  justify-between max-w-lg  flex-col-reverse sm:flex-row gap-2  '>
          <div className='reset_left flex sm:flex-col '>
            <div className='reset_form_text w-full justify-center   flex sm:justify-start '>
              <Lottie
                animationData={PMail}
                className='sm:h-32 sm:w-32 h-12 w-12 '
              />
            </div>
            <label htmlFor='email' className='hover1 flex'>
              <input type='radio' name='' id='email' checked readOnly />
              <div className='label_col '>
                <span className='text-gray-300'>Send code via email</span>
                <span className='text-gray-400/80'>
                  {userInfos.email.split("@")[0].substring(0, 5) +
                    "...@" +
                    userInfos.email.split("@")[1]}
                </span>
              </div>
            </label>
          </div>
          <div className='reset_right gap-2 box-content relative select-none cursor-pointer duration-300  rounded-lg m-2 p-2 '>
            <img
              src={userInfos.picture}
              alt=''
              className='h-32 w-32 rounded-full object-cover border-spacing-2 border-[#efff55] border-4'
            />
            <div className='w-full relative grid place-items-center '>
              <h1 className='font-bold text-[#6e56fc] break-before-all'>
                {userInfos.email.split("@")[0].substring(0, 5) +
                  "...@" +
                  userInfos.email.split("@")[1]}
              </h1>
              <p className='text-gray-300'>Current user</p>
            </div>
          </div>
        </div>
      </div>
      {error && (
        <div className='error_text' style={{ padding: "10px" }}>
          {error}
        </div>
      )}
      <div className='flex  w-full justify-end p-4'>
        <Link to='/login' className=' text-white max-h-12 '>
          Not You ?
        </Link>
        <button
          onClick={() => {
            sendEmail();
          }}
          className='blue_btn max-h-12 max-w-12 '>
          Continue
        </button>
      </div>
    </div>
  );
}

SendEmail.propTypes = {
  userInfos: PropTypes.shape({
    email: PropTypes.string,
    picture: PropTypes.string,
  }),
  email: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      response: PropTypes.shape({
        data: PropTypes.shape({
          message: PropTypes.string,
        }),
      }),
    }),
  ]),
  setError: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
