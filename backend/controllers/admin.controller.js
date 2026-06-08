import asyncHandler from '../utils/asyncHandler.js'
import apiResponse from '../utils/apiResponse.js'
import apiError from '../utils/apiError.js'
import { Admin } from '../models/admin.model.js';
import { Category, SubCategory } from '../models/category.model.js'
import { Product } from '../models/product.model.js'
import {Order} from '../models/order.model.js'

export const adminRegistration = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        throw new apiError(400, "All fields required");
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
        throw new apiError(400, "Admin already exists");
    }

    const admin = await Admin.create({ fullName, email, password });

    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken
    await admin.save({validateBeforeSave: false})
    
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
    });

    res.status(201).json({
        success: true,
        admin,
    });
});


export const adminLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
        throw new apiError(400, "Invalid email");
    }

    const isMatch = await admin.matchPassword(password);

    if (!isMatch) {
        throw new apiError(400, "Invalid password");
    }

    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken
    await admin.save({validateBeforeSave: false})

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
        success: true,
        admin,
    });
});


export const getMyProfile = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.user._id).select(
        "fullName email role createdAt updatedAt"
    )

    if(!admin) {
        throw new apiError(404, "Admin not found")
    }
    res.status(200).json(admin)
})

export const adminLogout = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});


// Produucts

export const getAllData = asyncHandler(async (req, res) => {
    const totalCategory = await Category.countDocuments()
    const totalSubCategory = await SubCategory.countDocuments()
    const totalProducts = await Product.countDocuments()
    const totalOrder = await Order.countDocuments()

    if(totalCategory == null ||
         totalSubCategory == null ||
         totalProducts == null || 
         totalOrder == null
        ){
        throw new apiError(404, "No data found")
    }
    res.status(200).json(
        new apiResponse(200, {totalCategory, totalSubCategory, totalProducts, totalOrder}, "data fetched")
    )
})

// Orders



export const getAllOrderStats = asyncHandler(async (req, res) => {
  try {
    const normalize = (status) => status;

    const stats = {
      totalOrders: await Order.countDocuments(),

      pendingOrders: await Order.countDocuments({ orderStatus: "Pending" }),
      confirmedOrders: await Order.countDocuments({ orderStatus: "Confirmed" }),
      processingOrders: await Order.countDocuments({ orderStatus: "Processing" }),
      shippedOrders: await Order.countDocuments({ orderStatus: "Shipped" }),

      // ✅ FIXED THIS LINE (MOST IMPORTANT)
      outForDelivery: await Order.countDocuments({
        orderStatus: "Out for Delivery",
      }),

      deliveredOrders: await Order.countDocuments({ orderStatus: "Delivered" }),
      cancelledOrders: await Order.countDocuments({ orderStatus: "Cancelled" }),
      returnedOrders: await Order.countDocuments({ orderStatus: "Returned" }),
    };

    return res.status(200).json(
      new apiResponse(200, stats, "Order stats fetched successfully")
    );
  } catch (error) {
    throw new apiError(500, error.message);
  }
});

export const getOrdersByStatus = asyncHandler(async (req, res) => {
  try {
    let { status } = req.params;

    // 1. normalize slug
    status = status.toLowerCase();

    // 2. map slug → DB value
    const statusMap = {
      pending: "Pending",
      processing: "Processing",
      shipped: "Shipped",
      "out-for-delivery": "Out for Delivery",
      delivered: "Delivered",
      cancelled: "Cancelled",
      returned: "Returned",
    };

    const dbStatus = statusMap[status];

    if (!dbStatus) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    // 3. DB query (now safe)
    const orders = await Order.find({
      orderStatus: dbStatus,
    })
      .populate("customer", "fullName email")
      .sort({ createdAt: -1 });

    return res.status(200).json(
      new apiResponse(200, orders, "Orders fetched successfully")
    );

  } catch (error) {
    console.log("GET ORDERS ERROR:", error);
    throw new apiError(500, error.message);
  }
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  // ❌ reject invalid status
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json(
      new apiResponse(400, null, "Invalid status")
    );
  }

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json(
      new apiResponse(404, null, "Order not found")
    );
  }

  // 🔥 define flow order
  const flow = [
    "Pending",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const currentIndex = flow.indexOf(order.orderStatus);
  const newIndex = flow.indexOf(status);

  // ❌ prevent going backwards or jumping
  if (newIndex < currentIndex) {
    return res.status(400).json(
      new apiResponse(
        400,
        null,
        "You cannot move order back to previous status"
      )
    );
  }

  // ❌ prevent skipping steps (optional strict mode)
  if (newIndex - currentIndex > 1) {
    return res.status(400).json(
      new apiResponse(
        400,
        null,
        "You cannot skip order stages"
      )
    );
  }

  // ❌ once delivered, no change allowed
  if (order.orderStatus === "Delivered") {
    return res.status(400).json(
      new apiResponse(
        400,
        null,
        "Delivered order cannot be modified"
      )
    );
  }

  // ✅ update status
  order.orderStatus = status;

  if (status === "Delivered") {
    order.deliveredAt = new Date();
  }

  await order.save();

  return res.status(200).json(
    new apiResponse(200, order, "Order status updated successfully")
  );
});