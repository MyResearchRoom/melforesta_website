import axios from "axios";
import { toast } from "react-toastify";
const Base_Url = import.meta.env.VITE_BASE_URL;
const fetchPaymentHistory = async (serviceInvoiceId) => {
  try {
    if (!serviceInvoiceId) return null;

    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${Base_Url}/api/serviceProcess/getPaymentHistory/${serviceInvoiceId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.data.success) return null;

    const paymentData = response.data.data;

    const formattedPayments =
      paymentData.payments?.map((p) => ({
        paymentMode: p.paymentMode,
        confirmDate: p.paymentDate?.split("T")[0] || "",
        paymentInstallment: Number(p.installmentAmount),
        referenceId: p.transactionRefId,
        status: p.paymentStatus,
      })) || [];

    return {
      stage: "Payment Status",
      serviceInvoiceId: paymentData.invoiceId,
      payments: formattedPayments,
      totalCost: Math.round(paymentData.totalAmount),
      totalPaid: Math.round(paymentData.totalPaid),
      status: paymentData.paymentStatus,
    };
  } catch (error) {
    console.error("Error fetching payment history:", error);
    toast.error(error.response?.data?.message || "Error fetching payment history!");
    return null;
  }
};

export default fetchPaymentHistory;
