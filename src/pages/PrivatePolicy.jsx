import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { PrivatePolicyData } from "../data/privatePolicy";

export default function PrivatePolicySection() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4 md:px-10 xl:px-20 text-[#333]">

      {/* Back Button + Title */}
      <div
        className="flex items-center space-x-2 cursor-pointer mb-6 hover:text-yellow-600"
        onClick={() => navigate(-1)}
      >
        <MdKeyboardBackspace className="text-xl md:text-2xl" />
        <p className="text-base md:text-lg lg:text-xl font-semibold">
          Privacy Policy
        </p>
      </div>

      {/* Policy Content */}
      <div className="space-y-6">
        {PrivatePolicyData.sections.map((section, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-xl shadow-sm 
                       px-6 py-5 md:px-8 md:py-6 hover:shadow-md transition duration-300"
          >
            <h2 className="text-sm md:text-base lg:text-lg font-semibold text-yellow-600 mb-3 border-l-4 border-yellow-600 pl-3">
              {section.heading}
            </h2>
            <div className="text-xs md:text-sm lg:text-base text-gray-700 leading-relaxed space-y-3">

              {section.content.map((item, index) => {
                if (Array.isArray(item)) {
                  return (
                    <ul
                      key={index}
                      className="ml-5 space-y-2 list-disc  text-gray-700 marker:text-yellow-600"
                    >
                      {item.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={index}>{item}</p>;
              })}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
