/* eslint-disable react/no-unescaped-entities */
import { Form, Formik } from "formik";
import { useState } from "react";
import RegisterInput from "../inputs/registerInput";
import * as Yup from "yup";
import DateOfBirthSelect from "./DateOfBirthSelect";
import GenderSelect from "./GenderSelect";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import BlockOne from "../../customHooks/BlocksBackground/Blocks";
export default function RegisterForm({ setVisible }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };
  const [user, setUser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const yearTemp = new Date().getFullYear();
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("What's your First name ?")
      .min(2, "Fisrt name must be between 2 and 16 characters.")
      .max(16, "Fisrt name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    last_name: Yup.string()
      .required("What's your Last name ?")
      .min(2, "Last name must be between 2 and 16 characters.")
      .max(16, "Last name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]+$/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
  });
  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentTestimonial, setCurrentTestimonial] = useState(0);
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

  const testimonials = [
    {
      content: "This platform has completely transformed our workflow. The intuitive design and powerful features make it an indispensable tool for our team.",
      name: "Alice Johnson",
      position: "Marketing Director, Bright Solutions"
    },
    {
      content: "The level of support we received was incredible. From the initial setup to ongoing use, they were there every step of the way. Highly recommend!",
      name: "Carlos Mendez",
      position: "CEO, Innovatech"
    },
    {
      content: "Thanks to this service, we've seen a 40% increase in customer engagement. It's user-friendly and integrates seamlessly with our systems.",
      name: "Sarah Lee",
      position: "Product Manager, TechWave"
    }
  ];


  const registerSubmit = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <div className="flex flex-col px-2 md:p-8 py-6 lg:flex-row gap-0 overflow-auto items-stretch h-dvh md:py-10">
      <div className="bg-black/80 flex-1 p-4 rounded-l-2xl flex flex-col justify-center px-3 py-3 lg:px-8">
        <div className="my-auto mx-auto">
          <div className=" flex flex-col items-start mb-4 ">
            <span className="text-[#efff55] mb-3 text-3xl md:text-5xl">Sign Up</span>
            <span>it&apos;s quick and easy</span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              first_name,
              last_name,
              email,
              password,
              bYear,
              bMonth,
              bDay,
              gender,
            }}
            validationSchema={registerValidation}
            onSubmit={() => {
              let current_date = new Date();
              let picked_date = new Date(bYear, bMonth - 1, bDay);
              let atleast14 = new Date(1970 + 14, 0, 1);
              let noMoreThan70 = new Date(1970 + 70, 0, 1);
              if (current_date - picked_date < atleast14) {
                setDateError(
                  "it looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth."
                );
              } else if (current_date - picked_date > noMoreThan70) {
                setDateError(
                  "it looks like you(ve enetered the wrong info.Please make sure that you use your real date of birth."
                );
              } else if (gender === "") {
                setDateError("");
                setGenderError(
                  "Please choose a gender. You can change who can see this later."
                );
              } else {
                setDateError("");
                setGenderError("");
                registerSubmit();
              }
            }}
          >
            {(formik) => (
              <Form className="">
                <div className="w-full md:max-w-[400px]">
                  <div className=" flex  gap-3 mb-3">
                    <RegisterInput
                      className="text-white"
                      type="text"
                      placeholder="First name"
                      name="first_name"
                      onChange={handleRegisterChange}
                    />
                    <RegisterInput
                      className="text-white"
                      type="text"
                      placeholder="Surname"
                      name="last_name"
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="flex gap-3 flex-col">
                    <RegisterInput
                      className="text-white w-full"
                      type="text"
                      placeholder="Mobile number or email address"
                      name="email"
                      onChange={handleRegisterChange}
                    />
                    <RegisterInput
                      className="text-white"
                      type="password"
                      placeholder="New password"
                      name="password"
                      onChange={handleRegisterChange}
                    />
                  </div>

                  <div className="reg_col mt-3">
                    <div className="reg_line_header">
                      Date of birth <i className="info_icon"></i>
                    </div>
                    <DateOfBirthSelect
                      className="text-white"
                      bDay={bDay}
                      bMonth={bMonth}
                      bYear={bYear}
                      days={days}
                      months={months}
                      years={years}
                      handleRegisterChange={handleRegisterChange}
                      dateError={dateError}
                    />
                  </div>
                  <div className="reg_col mt-3">
                    <div className="reg_line_header">
                      Gender <i className="info_icon"></i>
                    </div>

                    <GenderSelect
                      className="text-white "
                      handleRegisterChange={handleRegisterChange}
                      genderError={genderError}
                    />
                  </div>
                  <div className="reg_infos text-center">
                    By clicking Sign Up, you agree to our{" "}
                    <span>Terms, Data Policy &nbsp;</span>
                    and <span>Cookie Policy.</span> You may receive SMS
                    notifications from us and can opt out at any time.
                  </div>
                  <div className="">
                    <button className="blue_btn w-full open_signup">Sign Up</button>
                  </div>
                  <DotLoader color="#1876f2" loading={loading} size={30} />
                  {error && <div className="error_text">{error}</div>}
                  {success && <div className="success_text">{success}</div>}
                </div>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Already have an account?{" "}
                   <a className="font-semibold leading-6 text-[#efff55] hover:text-[#a6b23e]" href="/">Sign in</a></p>
              </Form>
            )}
          </Formik>
        </div>
      </div>

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
  );
}
