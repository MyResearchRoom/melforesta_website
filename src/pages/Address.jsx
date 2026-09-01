import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete, MdKeyboardBackspace } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import AddressModal from "../model/addressModal"; 
import DeleteAddressModel from "../model/deleteAddressModel";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerAddress } from "../redux/actions/customerAddress";
export default function ManageAddress() {
  const [open, setOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [loading, setLoading] = useState(false);

  const { address, error } = useSelector(
    (state) => state.customerAddressState
  );

  useEffect(() => {
    if (address.length > 0) {
      setSelectedAddress(address[0]);
    }
  }, [address]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        dispatch(fetchCustomerAddress()); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
  return <p className="text-center mt-10">Loading Address...</p>;
  }

  if(error)
  {
    return(
      <p className="text-red-600">{error}</p>
    );
  }

  return (
    <section className="py-6 px-4 md:px-8 xl:px-10 bg-gray-100 min-h-screen">
      <div
        className="flex items-center gap-2 mb-6 cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <MdKeyboardBackspace className="text-2xl" />
        <h2 className="text-xl md:text-2xl font-semibold">Manage Address</h2>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold mb-4">
          Saved Addresses
        </h3>

        <div className="space-y-4">
          {address.length === 0 ? (
            <p className="text-center text-red-600 font-semibold py-10">
              No Address added yet.
            </p>
          ) : (
            address.map((address) => (
              <div
                key={address.id}
                className={`flex items-start justify-between border rounded-lg p-4 cursor-pointer transition
                  ${
                    selectedAddress?.id === address.id
                      ? "border-primary bg-primary/5"
                      : "border-gray-300 hover:border-primary"
                  }
                `}
              >
                <div 
                    className="flex gap-3 w-full items-start"
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={selectedAddress?.id === address.id}
                    onChange={() => setSelectedAddress(address)}
                    className="mt-1 accent-primary"
                  />

                  <p className="text-sm md:text-base break-words text-gray-700 w-full">
                    {`${address.buildingBlock.toUpperCase()} - ${address.flatNo}, ${address.buildingName}, ${
                      address.landmark || ""
                    }, ${address.streetName || ""}, ${address.city}, ${address.state}, ${
                      address.pincode
                    }`}
                  </p>
                </div>

                <div className="flex flex-col md:flex-row items-end gap-3 min-w-[50px]">
                  <button
                    onClick={() => {
                      setOpen(true);
                      setSelectedId(address.id);
                    }}
                  >
                    <FaPen className="text-blue-600 hover:text-blue-700" />
                  </button>
                  <button
                    onClick={() => {
                      setIsDeleteModalOpen(true);
                      setSelectedId(address.id);
                    }}
                  >
                    <MdDelete className="text-red-600 hover:text-red-700 text-xl" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => {setOpen(true)
                            setSelectedId(null);
            }}
            className="px-6 py-2 text-sm md:text-base text-white rounded-md bg-custom-gradient1 hover:bg-custom-gradient1-hover transition"
          >
            + Add New Address
          </button>
        </div>
      </div>

      <AddressModal isOpen={open} onClose={() => setOpen(false)} id={selectedId} />
      <DeleteAddressModel isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} id={selectedId} />
    </section>
  );
}
