import { Ring,  Chains, Earrings, Nacklace, Braclet,Vedio1,Vedio2 } from "../assets/product";
export const returnOrdersDummy = [
  {
    id: 1,
    orderId: "ORD-202501",
    reason: "Received damaged product",
    createdAt: "2025-01-15T10:35:00Z",

    returnStatus: "pending",
    pickupStatus: "pending",

    refundStatus: "pending",
    refundAmount: 1299,

    pickUpTime: "6 PM",
    pickupPersonId: null,

    images: [
      { mediaContentType: "image", media: Nacklace },
      { mediaContentType: "video", media: Vedio1 },
      { mediaContentType: "video", media: Vedio2 },
    ],

    user: {
      name: "Rohit Sharma",
      mobileNumber: "9876543210",
      email: "rohit@example.com"
    },

    order: {
      address: {
        buildingBlock: "A",
        flatNo: "203",
        buildingName: "Skyline Residency",
        landmark: "Near City Mall",
        streetName: "MG Road",
        city: "Pune",
        state: "Maharashtra",
        pincode: "411001"
      },
      paymentMethod: "upi"
    },

    orderItem: {
      quantity: 1,
      price: 1500,
      discount: 201,
      totalPrice: 1299,
      product: {
        productName: "Wireless Earbuds",
        images: [Earrings, Ring, Chains, Braclet],
      }
    }
  },

  // ENTRY 2 -------------------------------------------------------

  {
    id: 2,
    orderId: "ORD-202502",
    reason: "Wrong size delivered",
    createdAt: "2025-01-10T09:20:00Z",

    returnStatus: "accepted",
    pickupStatus: "pickedUp",

    refundStatus: "completed",
    refundAmount: 899,

    pickUpTime: "11 AM",
    pickupPersonId: 101,

    images: [
      { mediaContentType: "image", media: Nacklace },
      { mediaContentType: "video", media: Vedio1 },
      { mediaContentType: "video", media: Vedio2 },
    ],

    user: {
      name: "Sneha Patil",
      mobileNumber: "9876543111",
      email: "sneha@example.com"
    },

    order: {
      address: {
        buildingBlock: "C",
        flatNo: "1104",
        buildingName: "Blue Heaven Tower",
        landmark: "Near Metro Station",
        streetName: "Park Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001"
      },
      paymentMethod: "card"
    },

    orderItem: {
      quantity: 2,
      price: 600,
      discount: 150,
      totalPrice: 450,
      product: {
        productName: "Cotton T-Shirt",
        images: [Earrings, Ring, Chains, Braclet],
      }
    }
  },

  // ENTRY 3 -------------------------------------------------------

  {
    id: 3,
    orderId: "ORD-202503",
    reason: "Color mismatch",
    createdAt: "2025-01-05T14:10:00Z",

    returnStatus: "rejected",
    pickupStatus: "pending",

    refundStatus: "pending",
    refundAmount: 0,

    pickUpTime: "4 PM",
    pickupPersonId: null,

    images: [],

    user: {
      name: "Aman Verma",
      mobileNumber: "7890456123",
      email: "aman@example.com"
    },

    order: {
      address: {
        buildingBlock: "B",
        flatNo: "602",
        buildingName: "Green Park",
        landmark: "",
        streetName: "Main Road",
        city: "Nashik",
        state: "Maharashtra",
        pincode: "422001"
      },
      paymentMethod: "cod"
    },

    orderItem: {
      quantity: 1,
      price: 999,
      discount: 100,
      totalPrice: 899,
      product: {
        productName: "Sports Shoes",
        images: [Earrings, Ring, Chains, Braclet],
      }
    }
  },

  // ENTRY 4 -------------------------------------------------------

  {
    id: 4,
    orderId: "ORD-202504",
    reason: "Quality not satisfactory",
    createdAt: "2025-01-18T08:45:00Z",

    returnStatus: "accepted",
    pickupStatus: "completed",

    refundStatus: "completed",
    refundAmount: 1599,

    pickUpTime: "3 PM",
    pickupPersonId: 102,

    images: [
      { mediaContentType: "image", media: Nacklace },
      { mediaContentType: "video", media: Vedio1 },
      { mediaContentType: "video", media: Vedio2 },
    ],

    user: {
      name: "Manisha Kulkarni",
      mobileNumber: "9988776655",
      email: "manisha@example.com"
    },

    order: {
      address: {
        buildingBlock: "D",
        flatNo: "304",
        buildingName: "Emerald Homes",
        landmark: "Opp Axis Bank",
        streetName: "Station Road",
        city: "Thane",
        state: "Maharashtra",
        pincode: "400604"
      },
      paymentMethod: "wallet"
    },

    orderItem: {
      quantity: 1,
      price: 1800,
      discount: 201,
      totalPrice: 1599,
      product: {
        productName: "Digital Watch",
        images: [Earrings, Ring, Chains, Braclet],
      }
    }
  },

  // ENTRY 5 -------------------------------------------------------

  {
    id: 5,
    orderId: "ORD-202505",
    reason: "Product not working",
    createdAt: "2025-01-12T12:05:00Z",

    returnStatus: "pending",
    pickupStatus: "pending",

    refundStatus: "pending",
    refundAmount: 2999,

    pickUpTime: "10 AM",
    pickupPersonId: null,

    images: [
      { mediaContentType: "image", media: Nacklace },
      { mediaContentType: "video", media: Vedio1 },
      { mediaContentType: "video", media: Vedio2 },
    ],

    user: {
      name: "Vikas More",
      mobileNumber: "9876500000",
      email: "vikas@example.com"
    },

    order: {
      address: {
        buildingBlock: "E",
        flatNo: "1202",
        buildingName: "Sunshine Residency",
        landmark: "Near Bus Stop",
        streetName: "Hill Road",
        city: "Nagpur",
        state: "Maharashtra",
        pincode: "440001"
      },
      paymentMethod: "upi"
    },

    orderItem: {
      quantity: 1,
      price: 3500,
      discount: 501,
      totalPrice: 2999,
      product: {
        productName: "Bluetooth Speaker",
        images: [Earrings, Ring, Chains, Braclet],
      }
    }
  }
];
