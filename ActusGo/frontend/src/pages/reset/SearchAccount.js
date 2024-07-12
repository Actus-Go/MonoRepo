import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import axios from "axios";
import Lottie from "lottie-react";
import Searching from "../../lotte/searching.json";
export default function SearchAccount({
  email,
  setEmail,
  error,
  setError,
  setLoading,
  setUserInfos,
  setVisible,
}) {
  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Email address ir required.")
      .email("Must be a valid email address.")
      .max(50, "Email address can't be more than 50 characters."),
  });
  const handleSearch = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        { email }
      );
      setUserInfos(data);
      setVisible(1);
      setError("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset_form border-[1px] border-gray-300/10">
      <div className="reset_form_header font-extrabold text-white text-center sm:text-left">Find Your Account</div>
      <div className="reset_form_text">
        <div
        className="w-full relative grid place-items-center"
        >
          <Lottie
            animationData={Searching}
            className="h-48 w-48"
          />
        </div>
<p className="font-bold max-w-md  text-gray-400  text-center">
Please enter your email address or mobile number to search for your
        account.
</p>
      </div>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validationSchema={validateEmail}
        onSubmit={() => {
          handleSearch();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
             className=" bg-white placeholder:text-gray-900 "

              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address or phone number"
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn text-white">
                Cancel
              </Link>
              <button type="submit" className="blue_btn ">
                Search
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
