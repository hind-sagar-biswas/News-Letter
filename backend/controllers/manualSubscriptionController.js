import mongoose from "mongoose";
import Subscription from "../models/subscriptionModel.js";
import ServicePlan from "../models/servicePlanModal.js";
import sendEmail from "../utils/sendMail.js";

import {
  createSubscriptionMailHtml,
  createUpdateSubscriptionMailHtml,
} from "../utils/mailHtml.js";

export const manualSubscribe = async (req, res) => {
  const { price, servicePlanId, transactionId } = req.body;
  const { _id, fullName, email } = req.user;

  if (
    !Number.isFinite(price) ||
    price <= 0 ||
    !servicePlanId ||
    !transactionId
  ) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  if (!mongoose.Types.ObjectId.isValid(servicePlanId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }

  try {
    const lastSubscription = await Subscription.findOne({ user: _id }).sort({
      endingDate: -1,
    });

    // console.log(lastSubscription)

    let startingDate = new Date();
    let endingDate = new Date();

    if (
      lastSubscription &&
      lastSubscription.paid === true &&
      lastSubscription.endingDate > new Date()
    ) {
      // Extend from last ending date
      startingDate = new Date(lastSubscription.endingDate);
      endingDate = new Date(startingDate);
      endingDate.setDate(endingDate.getDate() + 30);
    } else {
      // Start today
      startingDate = new Date();
      endingDate = new Date();
      endingDate.setDate(startingDate.getDate() + 30);
    }

    const newSubscription = new Subscription({
      user: _id,
      servicePlan: servicePlanId,
      startingDate,
      endingDate,
      status: "pending",
      price,
      paid: true,
      invoiceId:
        "manual/" +
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 8),
      transactionId,
    });

    await newSubscription.save();

    // const mailHtml = createSubscriptionMailHtml({
    //   fullName: fullName,
    //   startingDate: newSubscription.startingDate,
    //   endingDate: newSubscription.endingDate,
    // });
    // const mailSubject = "Subscription Confirmed!";

    // await sendEmail(email, mailSubject, mailHtml);

    return res.status(200).json({
      success: true,
      url: `${process.env.FRONTEND_URL}/payment/success`,
    });

    // return res.redirect(`${process.env.FRONTEND_URL}/payment/success`);
  } catch (error) {
    console.error("Subscribe Error:", error.message);
    res.status(500).json({ success: false, message: "Subscription failed" });
  }
};

export const manualUpdatePackageWithCharge = async (req, res) => {
  const { subscriptionId } = req.params;
  const { price, servicePlanId, transactionId } = req.body;
  const { fullName, email } = req.user;

  // console.log(subscriptionId, servicePlanId, transactionId )

  if (
    !Number.isFinite(price) ||
    price <= 0 ||
    !subscriptionId ||
    !transactionId ||
    !servicePlanId
  ) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  if (!mongoose.Types.ObjectId.isValid(subscriptionId)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }

  try {
    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    const service = await ServicePlan.findById(servicePlanId);

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      subscriptionId,
      {
        servicePlan: servicePlanId,
        invoiceId:
          "manual/" +
          Date.now().toString(36) +
          Math.random().toString(36).substring(2, 8),
        transactionId,
        status: "pending",
        price: service.price,
      },
      { runValidators: false, new: true }
    );

    // const mailHtml = createUpdateSubscriptionMailHtml({
    //   fullName: fullName,
    //   startingDate: updatedSubscription.startingDate,
    //   endingDate: updatedSubscription.endingDate,
    // });
    // const mailSubject = "Your Subscription Has Been Successfully Updated!";

    // await sendEmail(email, mailSubject, mailHtml);

    return res.status(200).json({
      success: true,
      url: `${process.env.FRONTEND_URL}/payment/success`,
    });

    // return res.redirect(`${process.env.FRONTEND_URL}/payment/success`);
  } catch (error) {
    console.error("Success Handler Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getManualSubscriptions = async (req, res) => {
  try {
    // Get current date
    const currentDate = new Date();

    // Pagination setup
    const page = parseInt(req.query.page) || 1; // default: page 1
    const limit = 15; // results per page
    const skip = (page - 1) * limit;

    // Query filter
    const filter = {
      endingDate: { $gt: currentDate },
      paid: true,
      invoiceId: { $regex: /^manual/i } // starts with "manual" (case-insensitive)
    };

    const subscriptions = await Subscription.find(filter)
      .populate('servicePlan', 'title')
      .sort({ endingDate: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Subscription.countDocuments(filter);

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
      resultsPerPage: limit,
      data: subscriptions,
    });
  } catch (error) {
    console.error('Error fetching manual active subscriptions:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching manual active subscriptions',
    });
  }
};

export const updatePaidStatus = async (req, res) => {
  const { id } = req.params;

  try {
    // Find subscription by ID and update the 'paid' field to false
    const updatedSubscription = await Subscription.findByIdAndUpdate(
      id,
      { paid: false },
      { new: true } // return the updated document
    );

    if (!updatedSubscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subscription payment status updated successfully",
      data: updatedSubscription,
    });
  } catch (error) {
    console.error("Update Paid Status Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update payment status",
    });
  }
};