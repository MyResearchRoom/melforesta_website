import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/actions/loggedUserActions";
import { useDispatch } from "react-redux";
// import { useAuth } from "../context/authContext";

export default function ConfirmLogoutModal({ isOpen, onClose}) {
//   const { logout } = useAuth();
  const navigate=useNavigate();
  const dispatch=useDispatch();
  if (!isOpen) return null;

  const handleYesClick = () => {
    // logout();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-2">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xs p-2 md:p-6">
        <h2 className="text-sm md:text-base xl:text-lg font-semibold mb-4 text-black">Are you sure to Logout?</h2>

        <div className="flex justify-end space-x-4 text-sm md:text-base xl:text-lg">
          <button
            onClick={onClose}
            className="px-4 py-1 md:py-1 bg-gray-300 rounded hover:bg-gray-400"
          >
            No
          </button>
          <button
            onClick={handleYesClick}
            className="px-4 py-1 md:py-1 bg-custom-gradient1 text-white rounded hover:bg-primary"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
