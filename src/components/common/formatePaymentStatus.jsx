export const PAYMENT_STATUS_CONFIG = {
  paid: {
    label: "Paid",
    textColor: "text-green-500",
    badgeClass:
      "bg-green-100 text-green-500 border border-green-200",
  },

  pending: {
    label: "Pending",
    textColor: "text-yellow-600",
    badgeClass:
      "bg-yellow-100 text-yellow-700 border border-yellow-200",
  },

  failed: {
    label: "Failed",
    textColor: "text-red-600",
    badgeClass:
      "bg-red-100 text-red-700 border border-red-200",
  },

  refunded: {
    label: "Refunded",
    textColor: "text-blue-600",
    badgeClass:
      "bg-blue-100 text-blue-700 border border-blue-200",
  },
};