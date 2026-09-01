import axios from "axios";
import React, { useState } from "react";
import {
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineClockCircle,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { toast } from "react-toastify";
const Base_Url = import.meta.env.VITE_BASE_URL;

export default function Section1() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.mobileNumber ||
      !formData.message
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${Base_Url}/api/enquiry/createEnquiry`,
        formData,
        );
        if (res.data.success) {
        toast.success(res.data.message||"Message submitted successfully..");
        setFormData({
          name: "",
          email: "",
          mobileNumber: "",
          message: "",
        });
        setError("");
       
        } else {
        toast.error(res.data.message || "Failed to update address");
        }

    }catch (err) {
      const response = err.response?.data;

      if (response?.errors?.length > 0) {
        toast.error(response.errors[0].msg);
      } else {
        toast.error(response?.message || "Failed to send message");
      }
    } 
  };

  return (
    <>
      <section className="py-6 px-4 md:px-8 xl:px-16 bg-[#fffbf5]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

          {/* FORM */}
          <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
            <h2 className="text-3xl font-bold text-[#3E2C1C]">
              Send us a Message
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              
              <div>
                <label className="text-lg text-[#3E2C1C] font-medium">Full Name*</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 w-full border border-[#fde6a8]  px-2 py-2 rounded-lg focus:border-[#c69311] outline-none bg-[#fcf7f2]"
                />
              </div>

              <div>
                <label className="text-lg text-[#3E2C1C] font-medium">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full border border-[#fde6a8]  px-2 py-2 rounded-lg focus:border-[#c69311] outline-none bg-[#fcf7f2]"
                />
              </div>

              <div>
                <label className="text-lg  text-[#3E2C1C] font-medium">Mobile Number*</label>
                <input
                  type="text"
                  name="mobileNumber"
                  placeholder="Enter number"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  className="mt-1 w-full border border-[#fde6a8]  px-2 py-2 rounded-lg focus:border-[#c69311] outline-none bg-[#fcf7f2]"
                />
              </div>

              <div>
                <label className="text-lg text-[#3E2C1C] font-medium">Message*</label>
                <textarea
                  rows="4"
                  name="message"
                  placeholder="Write here..."
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 w-full border border-[#fde6a8] px-2 py-2 rounded-lg focus:border-[#c69311] outline-none bg-[#fcf7f2]"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="w-full mt-4 py-3 bg-[#c49110] text-white font-semibold rounded-md hover:bg-[#a3780d] transition"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-6">
            <div className="bg-white shadow-xl rounded-xl p-8 space-y-6">
              <h2 className="text-3xl font-bold text-[#3E2C1C]">
                Contact Info
              </h2>

              <div className="flex items-start gap-4">
                <div className="bg-[#c49110] text-white p-3 rounded-full">
                  <IoCallOutline/>
                </div>
                <div>
                  <p className="font-semibold text-[#3E2C1C]">Phone</p>
                  <div className="text-[#8B7355]">
                    <p>+91 7796695552</p>
                  <p>+91 9112112722</p>
                    </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#c49110] text-white p-3 rounded-full">
                  <AiOutlineMail />
                </div>
                <div>
                  <p className="font-semibold text-[#3E2C1C]">Email</p>
                  <p className="text-[#8B7355]">skfoodsandspies@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
  <div className="bg-[#c49110] text-white p-3 rounded-full">
    <AiOutlineEnvironment />
  </div>

  <div>
    <p className="font-semibold text-[#3E2C1C] mb-3">Address</p>

    <div className=" space-y-4 ">

      <div>
        <p className="font-medium text-[#3E2C1C]">Business Office - Pune</p>
        <p className="text-[#8B7355] leading-relaxed">
          D-18, Emirate Hills, Near Bade Hospital, Old Mumbai - Pune Highway,
          Somatne Phata, Pune – 410506
        </p>
      </div>

      <div>
        <p className="font-medium text-[#3E2C1C]">Business Location – Mundhwa</p>
        <p className="text-[#8B7355] leading-relaxed">
          SR NO-90, PINGLE WASTI, OPP BHOLE GAS AGENCY,
          MUNDHWA, PUNE 411036
        </p>
      </div>

      <div>
        <p className="font-medium text-[#3E2C1C]">Business Location – Khalapur</p>
        <p className="text-[#8B7355] leading-relaxed">
          270, Old Mumbai-Pune Highway,
          Nadhal, Khalapur, 410206
        </p>
      </div>

    </div>
  </div>
</div>

              <div className="flex items-start gap-4">
                <div className="bg-[#c49110] text-white p-3 rounded-full">
                  <AiOutlineClockCircle />
                </div>
                <div>
                  <p className="font-semibold text-[#3E2C1C]">Business Hours</p>
                  <div className="text-[#8B7355]">
                  <p>Mon - Sat: 11AM – 7PM</p>
                  <p>Sun: Closed</p>
                  </div>                 
                </div>
              </div>
            </div>

            {/* QUICK RESPONSE (SEPARATE BOX) */}
            <div className="bg-[#c49110] text-white rounded-xl p-6 flex flex-col gap-3">
              <h3 className="text-2xl font-semibold">
                Quick Response
              </h3>
              <p className="text-lg opacity-90">
                Need an immediate answer? Chat with us on WhatsApp
              </p>
        

              <a
                href={`https://wa.me/917796695552?text=${encodeURIComponent("Hello, I want to know more!")}`} target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 bg-white text-[#c49110] px-4 py-2 rounded-md font-medium w-fit hover:opacity-90"
              >
                <AiOutlineWhatsApp />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAP (UNCHANGED) */}
      <section>
        <div className="max-w-6xl h-[500px] rounded-2xl overflow-hidden mx-auto md:my-10 md:p-0 p-4">

          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3114.7620402126618!2d73.68200607417437!3d18.70667876346492!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b1b11618cbdb%3A0x15eb363cbc9b8d78!2sEmirates%20Hills%2C%20opp.%20The%2C%20Somatne%20Phata%2C%20Tukaram%20Nagar%2C%20Talegaon%20Dabhade%2C%20Pune%2C%20Maharashtra%20410506!5e1!3m2!1sen!2sin!4v1777109703379!5m2!1sen!2sin" 
          className="w-full h-full border-0"
          width="600" 
          height="450" 
          referrerpolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </section>
    </>
  );
}