import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { RiBox3Line } from "react-icons/ri";
import { FiLogOut, FiMapPin } from "react-icons/fi";
import { TbPasswordUser } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import ConfirmLogoutModal from "../../../model/LogoutModel";
import ChangePasswordModal from "../../../model/changePassword";
import { fetchLoggedUser } from "../../../redux/actions/loggedUserActions";
import { useDispatch, useSelector } from "react-redux";
import UpdateCustomerModal from "../../../model/updateProfileModel";
const SectionOne = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const { user, error } = useSelector(
    (state) => state.loggedUserState
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchLoggedUser());  
    };
    fetchData();
  }, [dispatch]);

  const [isCancelModalOpen, setCancelModalOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const data = [
    { title: "Your Cart", icon: BsCart3, path: "/cartpage" },
    { title: "Wishlist", icon: MdOutlineFavoriteBorder, path: "/wishlistpage" },
    { title: "Orders", icon: RiBox3Line, path: "/orderpage" },
  ];

  const tabdata = [
    { title: "Manage Address", path: "/manageaddress", icon: FiMapPin },
    { title: "Change Password", icon: TbPasswordUser },
    { title: "Logout", icon: FiLogOut },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fffaf0] to-[#fef3c7] px-4">
        
        <div className="bg-white shadow-xl rounded-2xl p-8 md:p-10 max-w-md w-full text-center border border-yellow-100">
          
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-2xl mb-4">
            🔒
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-[#3E2C1C]">
            Login Required
          </h2>

          <p className="mt-3 text-gray-500 text-sm md:text-base">
            Please sign in to continue and access this page.  
            It only takes a moment ✨
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-6 w-full py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition duration-300 shadow-sm"
          >
            Go to Login
          </button>

          {/* Optional secondary link */}
          <p className="mt-4 text-sm text-gray-400">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-yellow-600 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>

        </div>
      </div>
    );
  }

  {error && (
    <p className="text-red-600">
      {typeof error === "string" ? error : error.message || "Something went wrong"}
    </p>
  )}

  return (
    <section className="py-8 px-4 md:px-8 xl:px-16 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center space-x-4">
          {user.profile ? (
            <img
              src={user.profile}
              alt="profile"
              className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover"
            />
          ) : (
            <CgProfile className="w-16 h-16 md:w-20 md:h-20 text-gray-400" />
          )}
          <div className="flex flex-col justify-center">
            <p className="text-lg md:text-xl font-semibold">{user.name}</p>
            <p className="text-sm text-gray-900">+91 {user.mobileNumber}</p>
            <p className="text-sm text-gray-900">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => setOpenModal(true)}
          className="mt-4 md:mt-0 px-5 py-2 bg-custom-gradient2 text-white rounded-lg hover:bg-custom-gradient2-hover transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Quick Action Cards */}
      <h3 className="mt-10 text-lg md:text-xl font-semibold text-gray-800">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {data.map((action, idx) => (
          <div
            key={idx}
            className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-xl border-t border-t-gray-200 hover:shadow-lg cursor-pointer transition hover:scale-105  hover:bg-custom-gradient2"
            onClick={() => navigate(action.path)}
          >
            <action.icon className="text-3xl text-primary group-hover:text-white mb-3" />
            <span className="text-sm md:text-base font-medium text-gray-800 group-hover:text-white">{action.title}</span>
          </div>
        ))}
      </div>

      {/* Account Settings */}
      <h3 className="mt-10 text-lg md:text-xl font-semibold text-gray-800">Account Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {tabdata.map((action, idx) => (
          <button
            key={idx}
            className="group flex items-center justify-center gap-3 p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition hover:bg-custom-gradient2"
            onClick={() => {
              if (action.title === "Change Password") setIsChangePasswordOpen(true);
              else if (action.title === "Logout") setCancelModalOpen(true);
              else navigate(action.path);
            }}
          >
            <action.icon className="text-xl md:text-2xl text-primary group-hover:text-white" />
            <span className="text-sm md:text-base font-medium text-gray-700 group-hover:text-white">{action.title}</span>
          </button>
        ))}
      </div>

      <ConfirmLogoutModal
        isOpen={isCancelModalOpen}
        onClose={() => setCancelModalOpen(false)}
      />

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />

      <UpdateCustomerModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        userId={user.id}
    />
    </section>
  );
};

export default SectionOne;
