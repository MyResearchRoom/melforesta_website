import { useState, useEffect, useRef } from "react";
import { FaRegUser, FaHeart, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {logo} from "../../assets/comman/index"
import { PiSignInBold, PiSignOutBold } from "react-icons/pi";
import ConfirmLogoutModal from "../../model/LogoutModel";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate();
  const location =useLocation();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const user = localStorage.getItem("user");
  
  return (
  <nav className="text-black px-4 lg:px-8 py-2 flex items-center justify-between relative w-full
   bg-white shadow-lg">
    
    {/* Logo Section - Increased size slightly for professionalism */}
    <Link to="/" className="flex-shrink-0">
      <div className="font-bold tracking-wide">
        <img src={logo} alt="Logo" className="w-20 md:w-24 object-contain" />
      </div>
    </Link>


    <ul className="hidden lg:flex items-center gap-4 xl:gap-8 text-sm font-semibold uppercase tracking-tight">
      {[
        { id: 1, name: "Home", route: "/" },
        { id: 2, name: "Shop", route: "/productpage" },
        { id: 3, name: "Bulk Orders", route: "/bulkorder" },
        { id: 4, name: "About Us", route: "/aboutus" },
        { id: 5, name: "Blog", route: "/blog" },
        { id: 6, name: "Gallery", route: "/gallery" },
        { id: 7, name: "Contact Us", route: "/contactpage" },
      ].map((item) => (
        <li
          key={item.id}
          className={`hover:text-yellow-600 transition-colors duration-200 cursor-pointer whitespace-nowrap ${location.pathname === item.route ? 'text-yellow-600' : ''}`}
          onClick={() => navigate(item.route)}
        >
          {item.name}
        </li>
      ))}
    </ul>

    {/* Right Side Icons & Actions */}
    <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-gray-700">
      <div className="flex items-center gap-4 border-r pr-4 border-gray-200">
        <FaHeart size={18} className="text-red-500 cursor-pointer transition-colors"
        onClick={() => navigate("/wishlistpage")}
          />
        <FaShoppingCart size={18} className="hover:text-blue-600 cursor-pointer transition-colors" 
        onClick={() => navigate("/cartpage")} 
        />
        <FaRegUser size={18} className="hover:text-blue-600 cursor-pointer transition-colors"
        onClick={() => navigate("/profilepage")}
        />
      </div>

      {user ? (
        <PiSignOutBold 
          size={20} 
          className="cursor-pointer hover:text-red-600" 
          onClick={() => setCancelModalOpen(true)} 
        />
      ) : (
        <button 
          className="text-xs xl:text-sm font-bold bg-yellow-600 text-white px-4 py-2 rounded-full hover:bg-yellow-700 transition-all"
          onClick={() => navigate("/login")}
        >
          LOG IN
        </button>
      )}
    </div>


    <div className="lg:hidden flex items-center">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
      >
        {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </button>
    </div>

    {/* Mobile Dropdown Menu */}
    {isOpen && (
      <div 
        ref={menuRef}
        className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col p-6 gap-4 lg:hidden z-50 animate-in fade-in slide-in-from-top-2"
      >
        <div className="flex flex-col gap-4 text-base font-medium">
          <li className="list-none cursor-pointer hover:text-blue-600" onClick={() => { navigate("/"); setIsOpen(false); }}>Home</li>
          <li className="list-none cursor-pointer hover:text-blue-600" onClick={() => { navigate("/productpage"); setIsOpen(false); }}>Shop</li>
          <li className="list-none cursor-pointer hover:text-blue-600" onClick={() => { navigate("/blog"); setIsOpen(false); }}>Blog</li>
          <li className="list-none cursor-pointer hover:text-blue-600" onClick={() => { navigate("/bulkorder"); setIsOpen(false); }}>Bulk Orders</li>
        <li className="list-none cursor-pointer hover:text-blue-600" onClick={() => { navigate("/aboutus"); setIsOpen(false); }}>About Us</li>
          <li className="list-none cursor-pointer hover:text-blue-600" onClick={() => { navigate("/contactpage"); setIsOpen(false); }}>Contact Us</li>
        </div>

        <div className="flex gap-6 pt-4 border-t border-gray-100 items-center">
          <FaHeart size={20} className="text-red-500 cursor-pointer transition-colors" onClick={() => {navigate("/wishlistpage"); setIsOpen(false); }} />

          <FaShoppingCart size={20} onClick={() => {navigate("/cartpage");setIsOpen(false); }} />
            
          <FaRegUser size={20} onClick={() => {navigate("/profilepage"); setIsOpen(false); }} />
          
          {user ? (
            <PiSignOutBold 
              size={20} 
              className="cursor-pointer hover:text-red-600" 
              onClick={() => setCancelModalOpen(true)} 
            />
          ) : (
            <button 
              className="text-xs xl:text-sm font-bold bg-yellow-600 text-white px-4 py-2 rounded-full hover:bg-yellow-700 transition-all"
              onClick={() => navigate("/login")}
            >
              LOG IN
            </button>
          )}
        </div>
      </div>
    )}

    <ConfirmLogoutModal isOpen={isCancelModalOpen} onClose={() => setCancelModalOpen(false)} />
  </nav>

  );
}
