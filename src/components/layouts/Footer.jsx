import { FaYoutube, FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { MdLocationOn, MdEmail, MdCall } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { fetchCategories } from "../../redux/actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import {logo,X,YT,FB,IG,li} from "../../assets/comman/index" 
import {logo} from "../../assets/comman/index" 
export default function Footer() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {categories=[]}=useSelector((state)=>state.categoryState);

  useEffect(()=>{
      dispatch(fetchCategories());
  },[dispatch]);

  const handleCategoryClick = (cat) => {
    navigate("/productpage", { state: { category: cat.id } }); 
  };

  const socialLinks = [
  { icon: FaYoutube, link: "https://youtube.com" },
  { icon: FaFacebook, link: "https://www.facebook.com/profile.php?id=61588846651011" },
  { icon: FaInstagram, link: "https://www.instagram.com/mel.foresta" },
  { icon: FaLinkedinIn, link: "https://www.linkedin.com/company/mel-foresta-honey" },
];
  return (
     <footer className="bg-[#3E2C1C] text-white pt-16 pb-8 px-6 lg:px-12">
      <div className="max-w-9xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Section */}
        <div className="flex flex-col space-y-6">
          <img src={logo} alt="Mel Foresta Logo" className="bg-white rounded-lg w-40 p-1" />
          <p className="text-[#ffeec4] leading-relaxed text-sm md:text-base">
            Natural Honey with No Additives or Preservatives
          </p>
           <div className="flex gap-4">
            {socialLinks.map((item, idx) => {
          const Icon = item.icon;
          return (
          <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer">
          <Icon className="w-6 h-6 text-[#fbbf24] hover:text-amber-400 transition-colors cursor-pointer" />
          </a>
          );
        })}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2 inline-block">Quick Links</h2>
          <ul className="space-y-2 text-[#ffeec4]">
            <li onClick={() => navigate("/")} className="hover:text-amber-400 transition-colors cursor-pointer">Home</li>
            <li onClick={() => navigate("/productpage")} className="hover:text-amber-400 transition-colors cursor-pointer">Shop</li>
            <li onClick={() => navigate("/bulkorder")} className="hover:text-amber-400 transition-colors cursor-pointer">Bulk Orders</li>
            <li onClick={() => navigate("/aboutus")}  className="hover:text-amber-400 transition-colors cursor-pointer">About Us</li>
            <li onClick={() => navigate("/blog")} className="hover:text-amber-400 transition-colors cursor-pointer">Blog</li>
            <li onClick={() => navigate("/gallery")} className="hover:text-amber-400 transition-colors cursor-pointer">Gallery</li>        
            <li onClick={() => navigate("/contactpage")} className="hover:text-amber-400 transition-colors cursor-pointer">Contact Us</li>


          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-2 inline-block">Need Help?</h2>
          <ul className="space-y-4 text-[#ffeec4]">
            <li onClick={() => navigate("/faqpage")} className="hover:text-amber-400 transition-colors cursor-pointer">FAQ</li>
            <li onClick={() => navigate("/returnpolicy")} className="hover:text-amber-400 transition-colors cursor-pointer">Return Policy</li>
            <li onClick={() => navigate("/privatepolicy")} className="hover:text-amber-400 transition-colors cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-2 inline-block">Contact Us</h2>
          <div className="space-y-5 text-[#ffeec4]">
            <div className="flex items-start gap-3 group cursor-pointer">
              <MdLocationOn className="text-amber-400 shrink-0" size={24} />
              <p className="text-sm leading-snug group-hover:text-white transition-colors">
                D-18, Emirate Hills, Old Mumbai - Pune highway, Somatne. Pune - 410506
              </p>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <MdCall className="text-amber-400 shrink-0" size={20} />
              <span className="text-sm group-hover:text-white transition-colors">+91 7796695552</span>
            </div>
            <div className="flex items-center gap-3 group cursor-pointer">
              <MdEmail className="text-amber-400 shrink-0" size={20} />
              <span className="text-sm group-hover:text-white transition-colors break-all">skfoodsandspies@gmail.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 pt-8 flex justify-between  ">
        <p className="text-center text-gray-400 text-sm font-medium tracking-wide">
          © {new Date().getFullYear()} Mel Foresta. All rights reserved.
        </p>
        <p className="text-center text-gray-400 text-sm font-medium tracking-wide">
          Designed and Developed By{" "}
          <a
            href="https://www.wesolutize.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Neowesolutize Technology, Pune
          </a>
        </p>
      </div>
    </footer>
  );
}
