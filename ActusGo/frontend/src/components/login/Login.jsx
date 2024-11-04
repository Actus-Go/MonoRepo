import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [testimonials, setTestimonials] = useState([
        {
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.',
            name: 'Name Surname',
            position: 'Position, Company name',
        },
        {
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            name: 'Jane Doe',
            position: 'CEO, Example Inc.',
        },
        {
            content: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            name: 'John Smith',
            position: 'Lead Developer, Webflow',
        },
    ]);
    const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
    const navigate = useNavigate();

    const handleLogin = () => {
        // Implement your login logic here
        if (email === 'admin@example.com' && password === 'password') {
            navigate('/dashboard');
        } else {
            setError('Invalid email or password.');
        }
    };

    const handlePreviousTestimonial = () => {
        setCurrentTestimonialIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
    };

    const handleNextTestimonial = () => {
        setCurrentTestimonialIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="bg-gray-900 text-white p-8 flex-1 flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold mb-4">Log in</h2>
                <input
                    type="email"
                    placeholder="Email address or phone number"
                    className="bg-gray-800 border-gray-700 text-white px-4 py-2 rounded w-full mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="bg-gray-800 border-gray-700 text-white px-4 py-2 rounded w-full mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full mb-4"
                    onClick={handleLogin}
                >
                    Log In
                </button>
                <a href="/forgot-password" className="text-blue-500 hover:text-blue-600 mb-4">
                    Forgot your password?
                </a>
                <button
                    className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded w-full"
                    onClick={() => navigate('/signup')}
                >
                    Create Account
                </button>
                {error && <div className="text-red-500 mt-4">{error}</div>}
            </div>
            <div className="bg-gray-100 flex-1 flex flex-col justify-center items-center relative">
                <div className="max-w-md px-8">
                    <div className="text-gray-500 mb-4">
                        <FaChevronLeft
                            className="inline-block cursor-pointer hover:text-gray-800"
                            onClick={handlePreviousTestimonial}
                        />
                        <FaChevronRight
                            className="inline-block ml-4 cursor-pointer hover:text-gray-800"
                            onClick={handleNextTestimonial}
                        />
                    </div>
                    <div className="text-gray-800 font-bold text-2xl mb-4">
                        {testimonials[currentTestimonialIndex].name}
                    </div>
                    <div className="text-gray-500 mb-4">
                        {testimonials[currentTestimonialIndex].position}
                    </div>
                    <div className="text-gray-700">
                        {testimonials[currentTestimonialIndex].content}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

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