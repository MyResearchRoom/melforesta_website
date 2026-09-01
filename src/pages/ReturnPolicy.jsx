import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { returnPolicyData } from "../data/returnPolicy";

export default function ReturnPolicySection() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-10 xl:px-20 text-[#333]">

      {/* Back Button & Title */}
      <div
        className="flex items-center space-x-2 cursor-pointer mb-6 hover:text-yellow-600"
        onClick={() => navigate(-1)}
      >
        <MdKeyboardBackspace className="text-xl md:text-2xl" />
        <p className="text-base md:text-lg lg:text-xl font-semibold">
          Return Policy
        </p>
      </div>

      {/* Policy Sections */}
      <div className="space-y-6">
        {returnPolicyData.map((section, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-sm px-6 py-5 md:px-8 md:py-6
                       hover:shadow-md transition duration-300"
          >
            <h2 className="text-sm md:text-base lg:text-lg font-semibold text-yellow-600 mb-3">
              {section.title}
            </h2>

            <ul className="space-y-2 text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed">
              {section.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  {/* Bullet dot */}
                  <span className="mt-2 w-2 h-2 rounded-full bg-yellow-600"></span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
