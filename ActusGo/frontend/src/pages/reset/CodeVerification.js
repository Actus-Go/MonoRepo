import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import axios from "axios";
import PropTypes from "prop-types";

export default function CodeVerification({
    code,
    setCode,
    error,
    setLoading,
    setVisible,
    setError,
    userInfos,
}) {
    const validateCode = Yup.object({
        code: Yup.string()
            .required("Code is required")
            .min("5", "Code must be 5 characters.")
            .max("5", "Code must be 5 characters."),
    });
    const { email } = userInfos;
    const verifyCode = async () => {
        try {
            setLoading(true);
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,
                { email, code }
            );
            setVisible(3);
            setError("");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.response.data.message);
        }
    };
    console.log(email);
    return (
        <div className="reset_form border-[1px] border-gray-300/10">
            <div className="reset_form_header font-extrabold text-white text-center sm:text-left">
                Code verification
            </div>
            <div className="reset_form_text text-center text-gray-300">
                Please enter code that been sent to your email.
            </div>
            <Formik
                enableReinitialize
                initialValues={{
                    code,
                }}
                validationSchema={validateCode}
                onSubmit={() => {
                    verifyCode();
                }}
            >
                {(formik) => (
                    <Form>
                        <LoginInput
                            type="text"
                            name="code"
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Code"
                            className="bg-white placeholder:text-gray-900 "
                        />
                        {error && <div className="error_text">{error}</div>}
                        <div className="reset_form_btns">
                            <Link to="/login" className="gray_btn text-white">
                                Cancel
                            </Link>
                            <button type="submit" className="blue_btn">
                                Continue
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

// Add PropTypes validation
CodeVerification.propTypes = {
    code: PropTypes.string.isRequired,
    setCode: PropTypes.func.isRequired,
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    setLoading: PropTypes.func.isRequired,
    setVisible: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    userInfos: PropTypes.shape({
        email: PropTypes.string.isRequired,
        // Add other userInfos properties if needed
    }).isRequired,
};

// Add default props
CodeVerification.defaultProps = {
    error: null,
};
