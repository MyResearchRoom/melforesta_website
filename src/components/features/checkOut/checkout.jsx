import React, { useState } from "react";
import AddressPage from "./addressPage.jsx";
import PaymentPage from "./paymentPage.jsx";
import { useLocation } from "react-router-dom";

export default function Checkout() {
  const [step, setStep] = useState("address"); 
  const [selectedAddress, setSelectedAddress] = useState("");

  const location = useLocation();
  const selectedCoupon = location.state?.selectedCoupon;
  console.log("selectedCoupon",selectedCoupon);
  

  return (
    <div className="p-3 md:p-8 xl:p-10 ">
      {step === "address" ? (
        <AddressPage
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          proceed={() => setStep("payment")}
        />
      ) : (
        <PaymentPage
          selectedAddress={selectedAddress}
          goBack={() => setStep("address")}
          couponCode={selectedCoupon?.couponCode ? selectedCoupon?.couponCode : ""}
          couponDiscount={selectedCoupon?.discount ? selectedCoupon?.discount : ""}
        />
      )}
    </div>
  );
}
