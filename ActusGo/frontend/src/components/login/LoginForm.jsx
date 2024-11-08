/* eslint-disable react/no-unescaped-entities */
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlockOne from "../../customHooks/BlocksBackground/Blocks";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
      name: "Name Surname",
      position: "Position, Company name"
    },
    {
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
      name: "Name Surname",
      position: "Position, Company name"
    },
    {
      content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      name: "John Doe",
      position: "CTO, Tech Corp"
    }
  ];

  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

  const loginSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        values
      );
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.message);
    }
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonial(prev =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial(prev =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="container mx-auto min-h-screen  ">
      {/* Left Side - Login Form */}
      <div className=" flex flex-col px-7 md:flex-row gap-0 items-stretch justify h-screen center md:py-10">
        <div className=" bg-black/80 flex-1 p-4 rounded-l-2xl flex flex-col items-center justify-center px-6 py-7 lg:px-8">
          <div className="w-full max-w-[400px] bg-black/60 ">
            <div className="mb-5">
              <div className="h-32 max-w-32 w-full text-white">
                <svg version="1.1" fill="white" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1662 732" style={{ enableBackground: 'new 0 0 1662 732' }} xmlSpace="preserve">
                  <rect className="st0" />
                  <path className="st1" d="M1247.92,324.84c0-45.37,25.71-84.75,63.36-104.33c-3.69-2.46-7.57-4.58-11.61-6.37
                    c-9.8-4.36-20.51-6.66-31.45-6.66h-43.37v27.09c-9.52-17.96-28.53-29.57-54.91-29.57c-45.75,0-82.01,37.65-82.01,101.7
                    s36.26,101.7,82.01,101.7c26.39,0,45.39-11.61,54.91-29.57v23.57c0,27.83-13.4,33.44-29.22,33.44c-14.44,0-23.22-5.27-25.35-15.48
                    h-76.7c5.27,50.31,42.92,83.05,107.66,83.05c61.66,0,90.8-33.49,98.91-74.86l-20.69-23.59
                    C1259.9,383.96,1247.92,355.8,1247.92,324.84z M1191.24,356.03c-14.05,0-25.7-10.56-25.7-34.13c0-23.6,11.99-34.17,25.7-34.17
                    c13.74,0,25.69,10.57,25.69,34.17C1216.93,345.47,1204.98,356.03,1191.24,356.03z" />
                  <g>
                    <g>
                      <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="1365.46" y1="207.29" x2="1365.46" y2="503.04">
                        <stop offset="0.2967" style={{ stopColor: '#EFFF55' }} />
                        <stop offset="0.3985" style={{ stopColor: '#D8E172' }} />
                        <stop offset="0.752" style={{ stopColor: '#8C7ED5' }} />
                        <stop offset="0.9105" style={{ stopColor: '#6E56FC' }} />
                      </linearGradient>
                      <path className="st2" d="M1365.46,207.29c-64.91,0-117.54,52.63-117.54,117.55c0,30.96,11.98,59.12,31.54,80.12l86,98.08l85.99-98.08
                    c19.57-21,31.55-49.16,31.55-80.12C1483,259.92,1430.37,207.29,1365.46,207.29z M1367,362c-17.12,0-31-18.36-31-41s13.88-41,31-41
                    s31,18.36,31,41S1384.12,362,1367,362z" />
                      <path className="st1" d="M1365.44,220.21c-59.83,0-104.84,38.35-104.84,101.7c0,63.31,45.01,101.67,104.84,101.67
                    c59.83,0,104.87-38.36,104.87-101.67C1470.31,258.55,1425.27,220.21,1365.44,220.21z M1365.44,356.03
                    c-14.05,0-25.7-10.56-25.7-34.13c0-23.6,11.99-34.17,25.7-34.17c13.74,0,25.7,10.57,25.7,34.17
                    C1391.14,345.47,1379.18,356.03,1365.44,356.03z" />
                    </g>
                    <ellipse className="st3" cx="1364.86" cy="522.41" rx="42.57" ry="3.69" />
                    <g>
                      <path className="st1" d="M214.98,256.2c33.05,0,55.79,15.64,67.87,31.63V259.4h40.86v195.8h-40.86v-29.14
                    c-12.44,16.7-35.89,32.34-68.58,32.34c-50.81,0-91.68-41.58-91.68-101.98C122.59,296,163.46,256.2,214.98,256.2z M223.51,291.38
                    c-30.2,0-59.34,22.74-59.34,65.03c0,42.29,29.14,66.81,59.34,66.81c30.56,0,59.34-23.81,59.34-66.09
                    C282.86,315.19,254.07,291.38,223.51,291.38z" />
                      <path className="st1" d="M441.16,256.2c47.97,0,79.24,23.81,90.26,65.03h-43.71c-6.75-18.83-22.39-30.91-46.55-30.91
                    c-32.69,0-54.37,24.16-54.37,66.8c0,43,21.68,67.16,54.37,67.16c24.16,0,39.09-10.66,46.55-30.91h43.71
                    c-11.02,38.38-42.29,65.03-90.26,65.03c-56.14,0-95.94-39.8-95.94-101.27C345.21,296,385.01,256.2,441.16,256.2z" />
                      <path className="st1" d="M560.01,292.44h-23.1V259.4h23.1v-48.68h40.86v48.68h47.62v33.05h-47.62v108.38
                    c0,14.57,5.69,20.61,22.74,20.61h24.87v33.76h-31.98c-34.82,0-56.5-14.57-56.5-54.37V292.44z" />
                      <path className="st1" d="M844.81,455.19h-40.51v-23.45c-12.79,16.7-34.82,26.3-57.92,26.3c-45.84,0-80.66-28.78-80.66-83.51V259.4
                    h40.15v109.09c0,35.89,19.54,54.37,49.04,54.37c29.85,0,49.39-18.48,49.39-54.37V259.4h40.51V455.19z" />
                      <path className="st1" d="M950.88,458.39c-46.91,0-79.95-27.72-81.73-63.25h41.93c1.42,15.99,16.7,29.14,39.09,29.14
                    c23.45,0,35.89-9.95,35.89-23.45c0-38.38-113.71-16.35-113.71-88.13c0-31.27,29.14-56.5,75.33-56.5
                    c44.42,0,73.56,23.81,75.69,62.9h-40.51c-1.42-17.06-14.57-28.78-36.6-28.78c-21.68,0-33.05,8.88-33.05,22.03
                    c0,39.44,110.51,17.41,112.64,88.13C1025.85,433.52,997.07,458.39,950.88,458.39z" />
                    </g>
                  </g>
                </svg>
              </div>
            </div>

            <h2 className="mt-6 text-3xl md:text-5xl text-center leading-9 tracking-tight text-[#efff55]">
              Log in
            </h2>
            <p className="mt-2 text-xl text-center leading-9 tracking-tight text-white/80">
              Start your venture now!
            </p>

            <div className="mt-10 w-[100%]">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={loginValidation}
                onSubmit={loginSubmit}
              >
                {(formik) => (
                  <Form className="space-y-6">
                    <div className="max-w-[100%]" >
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-[#efff55]">
                        Email*
                      </label>
                      <LoginInput
                        type="text"
                        name="email"
                        placeholder="Email address or phone number"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="mt-2 block w-full py-2 px-1 rounded-md border-0  text-[#efff55] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a6b23e] sm:text-sm sm:leading-6"
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="mt-2 text-sm text-red-600">{formik.errors.email}</div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-[#efff55]">
                          Password*
                        </label>
                        <Link to="/reset" className="text-sm font-semibold text-[#efff55] hover:text-[#a6b23e]">
                          Forgot your password?
                        </Link>
                      </div>
                      <LoginInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        className="mt-2 block w-full rounded-md border-0 py-2 px-1  text-[#efff55] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a6b23e] sm:text-sm"
                      />
                      {formik.touched.password && formik.errors.password && (
                        <div className="mt-2 text-sm text-red-600">{formik.errors.password}</div>
                      )}
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full justify-center rounded-md bg-[#efff55] px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-[#a6b23e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a6b23e]"
                      >
                        {loading ? <DotLoader color="#ffffff" loading={loading} size={20} /> : 'Log In'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>

              {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

              <p className="mt-10 text-center text-sm text-gray-500">
                Don't have an account?{' '}
                <Link to="/signup"
                  className="font-semibold leading-6 text-[#efff55] hover:text-[#a6b23e]"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Testimonials */}
        <div className="relative hidden md:flex flex-1 rounded-r-lg flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
          {/* Background Component */}
          <div className="absolute h-full rounded-r-lg inset-0 z-0">
            <BlockOne />
          </div>

          {/* Foreground Content */}
          <div className=" flex flex-col gap-3 justify-center items-center h-[430px] rounded-2xl p-3 text-white z-10 w-full max-w-3xl mx-auto">
            <div className="text-center">
              {/* Star Rating */}
              <div className="flex items-center justify-center mb-9">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffdf28]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content Container */}
              <div className="relative  flex flex-col px-6 sm:px-6 md:px-10 lg:px-15">
                {/* Testimonial Content */}
                <div className="mb-4">
                  <blockquote className="text-xl sm:text-2xl font-medium  mb-4">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>

                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-10 flex-shrink-0 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex items-center">
                      <div className="flex flex-col gap-0 text-left">
                        <span className="font-semibold text- text-sm sm:text-base">
                          {testimonials[currentTestimonial].name}
                        </span>
                        <span className="text-white/80 text-sm sm:text-base">
                          {testimonials[currentTestimonial].position}
                        </span>
                      </div>
                      <div className="ml-4 pl-4 border-l border-gray-300">
                        <span className="text-lg sm:text-xl font-bold">webflow</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="mt-9">
                <div className="relative flex w-fit mx-auto items-center justify-center">
                  {/* Left Arrow */}
                  <button
                    onClick={handlePrevTestimonial}
                    className=" p-2 rounded-full transition-colors duration-200"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </button>

                  {/* Dots */}
                  <div className="flex space-x-2">
                    {testimonials.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${idx === currentTestimonial ? 'bg-gray-100' : 'bg-gray-700'}`}
                      />
                    ))}
                  </div>

                  {/* Right Arrow */}
                  <button
                    onClick={handleNextTestimonial}
                    className="p-2  rounded-full transition-colors duration-200"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

    </div>
  );
}