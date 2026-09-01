import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logo } from "../../assets/comman/index"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { fetchLoggedUser } from "../../redux/actions/loggedUserActions";
import { useDispatch } from "react-redux";
import hive from "../../assets/comman/hive.png";
import axios from "axios";
const Base_Url = import.meta.env.VITE_BASE_URL;
export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // const handleSubmittt = (e) => {
  //   e.preventDefault();
  //   const user = {
  //       email: formData.email,    
  //       name : "abc xyz",
  //       mobileNumber:"1234567890",
  //   };
  //   localStorage.setItem("user", JSON.stringify(user));
  //   toast.success("Login successful");
  //   console.log("Login data",formData);
  //   navigate("/");
  // };
 
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(`${Base_Url}/api/auth/login`, {
        email: formData.email,
        password: formData.password,
        role: "CUSTOMER"
      });
      const {message} = res.data
      if (message) {
        toast.success(
            message || "Please verify the OTP sent on your registered email address to login."
        );
        navigate("/verify-otp", {
          state: {
            isSignup: false,
            email: formData.email,
          },
        });
        } else{
          toast.error("Faild to login");
        }
    }
    catch (err)
    {
        if (err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Login failed. Try again!");
        }
        console.error("Login error:", err);
    }finally {
      setIsLoading(false);
    }
   
  };

 return (
  <div className="min-h-screen flex justify-center items-center px-4 sm:px-6 md:px-12 py-6 bg-gradient-to-br from-[#fff8e8] via-[#fffdf8] to-[#f7efe2]">

    <div
      className="
        w-full
        max-w-5xl
        bg-white/90
        backdrop-blur-sm
        rounded-[28px]
        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
        overflow-hidden
        flex
        flex-col
        md:flex-row
        border
        border-[#f3e2b5]
      "
    >
      {/* LEFT SECTION */}
      <div
        className="
          order-2
          md:order-1
          md:w-1/2
          relative
          overflow-hidden
          bg-gradient-to-br
          from-[#f0a429]
          via-[#d98a11]
          to-[#a85b00]
          p-8
          md:p-10
          flex
          flex-col
          justify-between
        "
      >

        {/* Decorative Glow */}
        <div className="absolute top-[-50px] right-[-50px] w-52 h-52 bg-white/10 rounded-full blur-3xl"></div>

        <div className="absolute bottom-[-70px] left-[-40px] w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>



        {/* TOP CONTENT */}
        <div className="relative z-10">

          {/* Top Row */}
          <div className="flex items-start justify-between gap-5">

            {/* Left Content */}
            <div>

              <div
                className="
                  inline-flex
                  items-center
                  px-4
                  py-1.5
                  rounded-full
                  bg-white/15
                  border
                  border-white/20
                  backdrop-blur-md
                  shadow-md
                  mb-5
                "
              >
                <p className="text-xs md:text-sm text-white tracking-wide font-semibold">
                  Welcome Back to MELFORESTA
                </p>
              </div>

              <h2
                className="
                  text-3xl
                  md:text-4xl
                  xl:text-5xl
                  font-extrabold
                  text-white
                  leading-tight
                "
              >
                Login
              </h2>

            </div>

            {/* Rounded Logo */}
            <div
              className="
                w-24
                h-24
                md:w-28
                md:h-28
                rounded-full
                bg-white/15
                border
                border-white/20
                backdrop-blur-md
                flex
                items-center
                justify-center
                shadow-2xl
                p-3
                shrink-0
              "
            >

              <div
                className="
                  w-full
                  h-full
                  rounded-full
                  bg-white
                  flex
                  items-center
                  justify-center
                  shadow-lg
                "
              >
                <img
                  src={logo}
                  alt="login"
                  className="
                    w-14
                    md:w-16
                    object-contain
                  "
                />
              </div>

            </div>

          </div>

          {/* Description */}
          <p
            className="
              text-sm
              md:text-base
              lg:text-lg
              mt-6
              text-[#fff5e6]
              leading-7
              max-w-sm
            "
          >
            Login to access your account, orders and personalized experience.
          </p>

        </div>

        {/* Bottom Content */}
        <div className="relative z-10 mt-12">

          {/* Highlight Tagline */}
          <div
            className="
              inline-flex
              items-center
              px-5
              py-2
              rounded-full
              bg-white/15
              border
              border-white/20
              backdrop-blur-md
              shadow-lg
              mb-5
            "
          >
            <i
              className="
                text-base
                md:text-lg
                font-medium
                tracking-wide
                text-[#fff4d8]
              "
            >
              ✨ From Hives to Home
            </i>
          </div>

          {/* Main Text */}
          <h1
            className="
              text-xl
              md:text-2xl
              xl:text-3xl
              font-bold
              font-serif
              text-white
              leading-snug
              max-w-md
            "
          >
            Natural Honey,
            <br />
            Straight from Nature
          </h1>

        </div>
      </div>

      {/* RIGHT SECTION */}
      <div
        className="
          order-1
          md:order-2
          md:w-1/2
          p-8
          md:p-10
          lg:p-12
          bg-white
        "
      >

        <div className="mb-8">

          <h3
            className="
              text-2xl
              md:text-3xl
              font-bold
              text-gray-800
            "
          >
            Login to your Account
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Please enter your credentials to continue
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email ID 
            </label>

            <input
              type="text"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
              className="
                w-full
                px-4
                py-3
                border
                border-[#ead7b0]
                rounded-xl
                bg-[#fffdf9]
                focus:ring-2
                focus:ring-[#e0a52d]
                focus:border-[#e0a52d]
                focus:outline-none
                transition-all
                duration-300
              "
              required
            />

          </div>

          {/* Password */}
          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="
                  w-full
                  px-4
                  py-3
                  border
                  border-[#ead7b0]
                  rounded-xl
                  bg-[#fffdf9]
                  focus:ring-2
                  focus:ring-[#e0a52d]
                  focus:border-[#e0a52d]
                  focus:outline-none
                  transition-all
                  duration-300
                  pr-12
                "
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  hover:text-[#d18e18]
                  transition
                "
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

          </div>

          {/* Forgot Password */}
          <div className="text-right">

            <button
              type="button"
              onClick={() =>
                navigate("/forgetpassword")
              }
              className="
                text-sm
                text-[#b67812]
                hover:text-[#8e5a05]
                hover:underline
                font-medium
                transition
              "
            >
              Forgot Password?
            </button>

          </div>

          {/* Login Button */}
          <div className="pt-2">

            <button
              type="submit"
              disabled={isLoading}
              className={`
                relative
                overflow-hidden
                w-full
                py-3
                rounded-xl
                font-semibold
                text-white
                transition-all
                duration-300
                shadow-lg
                hover:shadow-xl
                hover:scale-[1.01]
                bg-gradient-to-r
                from-[#cf7b00]
                to-[#7f4200]
                ${isLoading ? "cursor-not-allowed" : "" }`}
            >

              {/* Background Pattern */}
              <div
                className="
                  absolute
                  inset-0
                  opacity-[0.50]
                  bg-center
                  bg-cover
                  mix-blend-screen
                "
                style={{
                  backgroundImage: `url(${hive})`,
                  backgroundSize: "220px",
                }}
              />

              {/* Soft Overlay */}
              <div
                className="
                  absolute
                  inset-0
                  bg-white/5
                "
              />

              {/* Button Text */}
              <span className="relative z-10 tracking-wide">
                {isLoading ? "Sending OTP..." : "LOG IN"}
              </span>

            </button>

          </div>

        </form>

        {/* Signup */}
        <div className="text-center text-sm mt-8 font-medium text-gray-600">

          <p>
            Don’t have an account?{" "}

            <button
              onClick={() =>
                navigate("/signup")
              }
              className="
                text-[#b67812]
                hover:text-[#8e5a05]
                hover:underline
                font-semibold
              "
            >
              Signup Here
            </button>

          </p>

        </div>

      </div>

    </div>

  </div>
);
}