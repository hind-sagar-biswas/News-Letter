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

    const mailHtml = createSubscriptionMailHtml({
      fullName: fullName,
      startingDate: newSubscription.startingDate,
      endingDate: newSubscription.endingDate,
    });
    const mailSubject = "Subscription Confirmed!";

    await sendEmail(email, mailSubject, mailHtml);

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

    const mailHtml = createUpdateSubscriptionMailHtml({
      fullName: fullName,
      startingDate: updatedSubscription.startingDate,
      endingDate: updatedSubscription.endingDate,
    });
    const mailSubject = "Your Subscription Has Been Successfully Updated!";

    await sendEmail(email, mailSubject, mailHtml);

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
