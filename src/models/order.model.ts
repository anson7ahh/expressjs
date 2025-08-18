const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      default: null, 
    },
    status: {
      type: String,
      default: "Pending",
    },
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    enum: ["Processing", "success", "Cancelled"],
    default: "Processing",
  },
  deliveredAt: Date,
  shippedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
