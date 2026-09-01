import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmedModal({ onClose }) {
    const navigate=useNavigate();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div className="w-[265px] h-[300px] rounded-xl bg-white shadow-lg text-center relative">
      <div className="flex flex-col justify-center space-y-10 rounded-t-xl bg-gradient-to-tr from-pink-500 to-purple-500 pb-5">
         <div className="flex justify-end ">
            <button 
               onClick={() => {
                onClose();         
                navigate("/");     
              }}
              className="absolute top-3 right-3 text-gray-500 text-xl font-bold"
            >
              x
            </button>
         </div>
         <div className="bg-white rounded-full w-16 h-16 flex flex-row justify-center ml-24">
            <div className=" rounded-full flex items-center justify-end">           
                <IoCheckmarkDoneCircle className="text-green-500 text-5xl animate-bounce"/>
            </div>          
         </div>
      </div>

      <p className="text-sm font-medium text-gray-800 mb-3 text-center my-5 px-5">Your order is confirmed.
        <br />Thanks for choosing us for your shopping needs!
      </p>

       <button className="mt-4 bg-custom-gradient1 text-white px-4 py-2 rounded hover:bg-[#5f2425]"
       onClick={()=>navigate("/")}>Explore</button>
      
    </div>
    </div>
  );
}
