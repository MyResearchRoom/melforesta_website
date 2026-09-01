import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signup } from "../../assets/comman";
import axios from "axios";
import { logo } from "../../assets/comman/index"
import hive from "../../assets/comman/hive.png";

const Base_Url = import.meta.env.VITE_BASE_URL;

const initialFormData = {
  name: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  gender: "",
};

const inputClass = `
  w-full
  px-4
  py-2.5
  border
  border-[#e5d3b0]
  rounded-xl
  bg-[#fffdf8]
  focus:outline-none
  focus:ring-2
  focus:ring-[#f0a429]
  text-sm
`;

export default function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState(initialFormData);

  const [errors, setErrors] =
    useState({});

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const [isLoading, setIsLoading] = useState(false);


  const handleChange = ({
    target: { name, value },
  }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const mobileRegex = /^[0-9]{10}$/;

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!formData.name)
      newErrors.name =
        "Name is required";

    if (
      !emailRegex.test(formData.email)
    )
      newErrors.email =
        "Please enter a valid email address.";

    if (
      !mobileRegex.test(formData.mobile)
    )
      newErrors.mobile =
        "Mobile number must be exactly 10 digits.";


    if (
      !passwordRegex.test(
        formData.password
      )
    )
      newErrors.password =
        "Password must be 8+ characters with 1 uppercase, 1 number & 1 symbol.";

    if (
      formData.password !==
      formData.confirmPassword
    )
      newErrors.confirmPassword =
        "Passwords do not match.";

    if (!formData.gender)
      newErrors.gender =
        "Gender is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors =
      validate();

    if (
      Object.keys(validationErrors)
        .length
    ) {
      setErrors(validationErrors);

      return toast.error(
        "Fill all fields carefully!"
      );
    }

    try {
      setIsLoading(true);
      const customerData = {
        name: formData.name,
        email: formData.email,
        mobileNumber: formData.mobile,
        gender: formData.gender,
        role: "CUSTOMER",
        password: formData.password,
        isBlock: false,
      };

      console.log(formData.email);
console.log(customerData.email);

      const res = await axios.post(
        `${Base_Url}/api/auth/customer-register`,
        customerData
      );

      toast.success(
        res.data.message ||
          "Signup successful!"
      );

      // navigate("/login");
      navigate("/verify-otp", {
        state: {
          isSignup: true,
          email: formData.email,
        },
      });
    } catch (err) {
      console.error(
        "❌ API error:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Sign up failed"
      );
    }finally {
        setIsLoading(false);
    }
  };

  const renderError = (field) =>
    errors[field] && (
      <p className="text-red-600 text-xs mt-1">
        {errors[field]}
      </p>
    );

  const inputFields = [
    {
      type: "text",
      name: "name",
      placeholder: "Full Name",
    },
    {
      type: "email",
      name: "email",
      placeholder:
        "Email Address",
    },
    {
      type: "text",
      name: "mobile",
      placeholder:
        "Mobile Number",
    },
  ];

  return (
    <div
      className="
        min-h-screen
        flex
        justify-center
        items-center
        bg-gradient-to-br
        from-[#fff8ec]
        via-[#fff3db]
        to-[#fde7b2]
        px-4
        md:px-8
        py-4
        overflow-hidden
      "
    >
      <div
        className="
          w-full
          max-w-5xl
          bg-white/95
          backdrop-blur-sm
          shadow-2xl
          rounded-[28px]
          overflow-hidden
          grid
          grid-cols-1
          md:grid-cols-2
          border
          border-[#f3dba3]
        "
      >
        {/* Left Section */}
        <div
          className="
            order-2
            md:order-1
            relative
            overflow-hidden
            px-6
            md:px-10
            py-6
            flex
            flex-col
            justify-between
            text-white
            bg-gradient-to-br
            from-[#f7a51d]
            via-[#e88d12]
            to-[#b35c00]
          "
        >
          {/* Decorative Shapes */}
          <div
            className="
              absolute
              top-[-50px]
              right-[-50px]
              w-40
              h-40
              bg-white/10
              rounded-full
            "
          />

          <div
            className="
              absolute
              bottom-[-60px]
              left-[-60px]
              w-52
              h-52
              bg-white/10
              rounded-full
            "
          />

  {/* <div
  className="
    absolute
    inset-0
    opacity-[0.15]
    bg-center
    bg-repeat
    pointer-events-none
  "
  style={{
    backgroundImage: `url(${hive})`,
    backgroundSize: "220px",
  }}
/> */}

          {/* Content */}
          <div className="relative z-10">
            <p
              className="
                text-xs
                uppercase
                tracking-[3px]
                font-medium
                text-[#fff4d6]
                mb-2
              "
            >
              Welcome To Melforesta
            </p>

          <div className="flex justify-between items-center">

           <h2
              className="
                text-2xl
                md:text-4xl
                font-extrabold
                leading-tight
              "
            >
              Create
              <br />
              Your Account
            </h2>

             <div className="relative z-10 flex justify-center">
           
           
                        <div
                          className="
                            w-20
                            h-20
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
                              object-contain
                              drop-shadow-md
                            "
                          />
           
                        </div>
                    </div>


            </div>

           

            <p
              className="
                text-sm
                text-[#fff4d6]
                mt-3
                leading-6
                max-w-md
              "
            >
              Register now to explore
              premium natural honey
              products, faster ordering
              and personalized shopping
              experience.
            </p>
          </div>

          {/* Image */}
          <div
            className="
              relative
              z-10
              flex
              justify-center
              items-center
              my-4
            "
          >
            <div
              className="
                bg-white/25
                backdrop-blur-md
                rounded-full
                p-2
                border
                border-white/20
                shadow-2xl
              "
            >
              <img
                src={signup}
                alt="signup"
                className="
                  w-40
                  md:w-56
                  object-contain
                  drop-shadow-2xl
                  rounded-full
                "
              />
            </div>
          </div>

          {/* Bottom Text */}
          <div
            className="
              relative
              z-10
              text-center
              mt-2
              space-y-1
            "
          >
            <p
              className="
                text-sm
                md:text-base
                italic
                text-[#fff4d6]
              "
            >
              From Hives to Home
            </p>

            <h3
              className="
                text-base
                md:text-lg
                font-semibold
                font-serif
              "
            >
              Natural Honey, Straight
              from Nature
            </h3>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="
            order-1
            md:order-2
            px-6
            md:px-10
            py-6
            bg-white
          "
        >
          <div className="mb-5">
            <h3
              className="
                text-2xl
                md:text-3xl
                font-bold
                text-gray-800
              "
            >
              Sign Up
            </h3>

            <p
              className="
                text-sm
                text-gray-500
                mt-1
              "
            >
              Create your account to
              continue
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-3"
          >
            {inputFields.map(
              ({
                type,
                name,
                placeholder,
              }) => (
                <div key={name}>
                  <input
                    type={type}
                    name={name}
                    placeholder={
                      placeholder
                    }
                    value={
                      formData[name]
                    }
                    onChange={
                      handleChange
                    }
                    className={
                      inputClass
                    }
                  />

                  {renderError(name)}
                </div>
              )
            )}

            {/* Password Fields */}
            {[
              {
                name: "password",
                placeholder:
                  "Password",
                show:
                  showPassword,
                toggle:
                  setShowPassword,
              },
              {
                name:
                  "confirmPassword",
                placeholder:
                  "Confirm Password",
                show:
                  showConfirmPassword,
                toggle:
                  setShowConfirmPassword,
              },
            ].map((field) => (
              <div key={field.name}>
                <div className="relative">
                  <input
                    type={
                      field.show
                        ? "text"
                        : "password"
                    }
                    name={field.name}
                    placeholder={
                      field.placeholder
                    }
                    value={
                      formData[
                        field.name
                      ]
                    }
                    onChange={
                      handleChange
                    }
                    className={`${inputClass} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      field.toggle(
                        (
                          prev
                        ) => !prev
                      )
                    }
                    className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      text-gray-500
                    "
                  >
                    {field.show ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>
                </div>

                {renderError(
                  field.name
                )}
              </div>
            ))}

            {/* Gender */}
            <div>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">
                  Select Gender
                </option>

                <option value="male">
                  Male
                </option>

                <option value="female">
                  Female
                </option>
              </select>

              {renderError("gender")}
            </div>

            {/* Button */}
            <div className="pt-1">
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
                  bg-gradient-to-r
                  from-[#f0a429]
                  via-[#dc8c13]
                  to-[#b96800]
                  hover:opacity-95
                  transition-all
                  duration-300
                  shadow-lg
                  ${isLoading ? "cursor-not-allowed" : "" }`
                }
              >
                {/* Hive Background */}
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
                    backgroundSize: "180px",
                  }}
                />

                {/* Soft Overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-black/5
                  "
                />

                {/* Button Text */}
                <span className="relative z-10 tracking-wide">
                  {isLoading ? "CREATING..." : "CREATE ACCOUNT"}
                </span>
              </button>
            </div>

            {/* Login */}
            <div
              className="
                text-center
                text-sm
                font-medium
                pt-1
                text-gray-600
              "
            >
              Already have an account?{" "}
              <button
                type="button"
                onClick={() =>
                  navigate("/login")
                }
                className="
                  text-[#d68000]
                  hover:underline
                  font-semibold
                "
              >
                Login Here
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}