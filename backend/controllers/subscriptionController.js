import axios from "axios";
import Subscription from "../models/subscriptionModel.js";
import sendEmail from "../utils/sendMail.js";
import {
  createSubscriptionMailHtml,
  createUpdateSubscriptionMailHtml,
} from "../utils/mailHtml.js";
import ServicePlan from "../models/servicePlanModal.js";

// INITIATE PAYMENT
export const subscribe = async (req, res) => {
  const { price, servicePlanId } = req.body;
  const { _id, fullName, email } = req.user;

  if (!Number.isFinite(price) || price <= 0 || !servicePlanId) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  try {
    const lastSubscription = await Subscription.findOne({ user: _id }).sort({
      endingDate: -1,
    });

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
      paid: false,
    });

    await newSubscription.save();

    const options = {
      method: "POST",
      url: process.env.UDDOKTAPAY_CHECKOUT_API_URL,
      headers: {
        accept: "application/json",
        "RT-UDDOKTAPAY-API-KEY": process.env.UDDOKTAPAY_API_KEY,
        "content-type": "application/json",
      },
      data: {
        full_name: fullName,
        email: email,
        amount: price.toString(),
        metadata: {
          subscriptionId: newSubscription._id,
          type: "subscribe",
        },
        redirect_url: `${process.env.BACKEND_URL}/api/subscription/success`,
        return_type: "POST",
        cancel_url: `${process.env.BACKEND_URL}/api/subscription/cancel`,
        webhook_url: `${process.env.BACKEND_URL}/api/subscription/webhook`,
      },
    };


    const response = await axios.request(options);
    const redirectUrl = response.data.payment_url;

    // console.log("UddoktaPay response:", response.data);


    res.status(200).json({
      success: true,
      url: redirectUrl,
    });
  } catch (err) {
    console.error("Subscribe Error:", err.message);
    res.status(500).json({ success: false, message: "Subscription failed" });
  }
};

// INITIATE RENEW PAYMENT
export const updatePackageWithCharge = async (req, res) => {
  const { subscriptionId } = req.params;
  const { price, servicePlanId } = req.body;
  const { fullName, email } = req.user;

  if (!Number.isFinite(price) || price <= 0 || !subscriptionId) {
    return res.status(400).json({ success: false, message: "Invalid input" });
  }

  try {
    const subscription = await Subscription.findById(subscriptionId);

    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    const options = {
      method: "POST",
      url: process.env.UDDOKTAPAY_CHECKOUT_API_URL,
      headers: {
        accept: "application/json",
        "RT-UDDOKTAPAY-API-KEY": process.env.UDDOKTAPAY_API_KEY,
        "content-type": "application/json",
      },
      data: {
        full_name: fullName,
        email: email,
        amount: price.toString(), // Only the new price is paid now
        metadata: {
          servicePlanId,
          type: "update",
          subscriptionId,
        },
        redirect_url: `${process.env.BACKEND_URL}/api/subscription/success`,
        return_type: "POST",
        cancel_url: `${process.env.BACKEND_URL}/api/subscription/cancel`,
        webhook_url: `${process.env.BACKEND_URL}/api/subscription/webhook`,
      },
    };

    const response = await axios.request(options);
    const redirectUrl = response.data.payment_url;

    res.status(200).json({
      success: true,
      url: redirectUrl,
    });
  } catch (err) {
    console.error("Renew Error:", err.message);
    res.status(500).json({ success: false, message: "update failed" });
  }
};

export const updatePackageForFree = async (req, res) => {
  try {
    const { subscriptionId } = req.params;
    const { servicePlanId, price } = req.body;

    if (!servicePlanId) {
      return res
        .status(400)
        .json({ success: false, message: "Service Plan ID is required" });
    }

    const subscription = await Subscription.findById(subscriptionId).populate(
      "user",
      "fullName email"
    );

    if (!subscription) {
      return res
        .status(404)
        .json({ success: false, message: "Subscription not found" });
    }

    subscription.servicePlan = servicePlanId;
    subscription.status = "pending";
    subscription.price = price;
    await subscription.save();

    // console.log(subscription)

    const mailHtml = createUpdateSubscriptionMailHtml({
      fullName: subscription.user.fullName,
      startingDate: subscription.startingDate,
      endingDate: subscription.endingDate,
    });
    const mailSubject = "Your Subscription Has Been Successfully Updated!";

    await sendEmail(subscription.user.email, mailSubject, mailHtml);

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    console.error("Error updating subscription:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// HANDLE SUCCESS
export const handleSuccess = async (req, res) => {
  const invoiceId = req.body.invoice_id;
  // console.log("invoiceId", invoiceId);

  try {
    const options = {
      method: "POST",
      url: process.env.UDDOKTAPAY_VERIFY_API_URL,
      headers: {
        accept: "application/json",
        "RT-UDDOKTAPAY-API-KEY": process.env.UDDOKTAPAY_API_KEY,
        "content-type": "application/json",
      },
      data: { invoice_id: invoiceId },
    };

    const response = await axios.request(options);
    const paymentData = response.data;

    const servicePlanId = paymentData?.metadata?.servicePlanId;
    const subscriptionType = paymentData?.metadata?.type; // 'subscribe' or 'update'
    const subscribtionId = paymentData?.metadata?.subscriptionId;


    const subscription = await Subscription.findOne({ _id: subscribtionId });

    if (!subscription) {
      res.status(404).json({
        success: false,
        message: "No subscription data find in metadata",
      });
    }

    if (subscriptionType === "subscribe") {
      console.log("subscribe block")
      const updatedSubscription = await Subscription.findByIdAndUpdate(
        subscribtionId,
        { paid: true, invoiceId },
        { runValidators: false, new: true }
      ).populate("user", "fullName email");

      const mailHtml = createSubscriptionMailHtml({
        fullName: updatedSubscription.user.fullName,
        startingDate: updatedSubscription.startingDate,
        endingDate: updatedSubscription.endingDate,
      });
      const mailSubject = "Subscription Confirmed!";

      await sendEmail(updatedSubscription.user.email, mailSubject, mailHtml);
    } else if (subscriptionType === "update") {
      const service = await ServicePlan.findById(servicePlanId)

      const updatedSubscription = await Subscription.findByIdAndUpdate(
        subscribtionId,
        {
          servicePlan: servicePlanId,
          invoiceId,
          status: "pending",
          price: service.price
        },
        { runValidators: false, new: true }
      ).populate("user", "fullName email");

      

      const mailHtml = createUpdateSubscriptionMailHtml({
        fullName: updatedSubscription.user.fullName,
        startingDate: updatedSubscription.startingDate,
        endingDate: updatedSubscription.endingDate,
      });
      const mailSubject = "Your Subscription Has Been Successfully Updated!";

      await sendEmail(updatedSubscription.user.email, mailSubject, mailHtml);
    } else {
      res.status(400).json({ success: false, message: "invalid metadata" });
    }

    return res.redirect(`${process.env.FRONTEND_URL}/payment/success`);
  } catch (err) {
    console.error("Success Handler Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

export const handleCancel = async (req, res) => {
  try {
    // UddoktaPay sends metadata back during cancellation via POST
    const { metadata } = req.body;

    if (!metadata || !metadata.subscription_id) {
      return res.status(400).send("Missing subscription metadata.");
    }

    // const subscriptionId = metadata.subscription_id;

    // // Find the subscription using subscriptionId from metadata
    // const subscription = await Subscription.findOne({ subscriptionId });

    // if (!subscription) {
    //   return res.status(404).send("Subscription not found.");
    // }

    // // Update status to 'Failed' or 'Canceled'
    // subscription.status = "Failed";
    // await subscription.save();

    // Redirect user to cancel page or notify cancellation
    res.redirect(`${process.env.FRONTEND_URL}/payment/cancel`);
  } catch (err) {
    console.error("Cancel Handler Error:", err);
    res.status(500).send("Internal Server Error");
  }
};

// HANDLE IPN (Instant Payment Notification)
export const handleWebHook = async (req, res) => {
  // Get the API key from the request headers
  const headerApi = req.headers["rt-uddoktapay-api-key"];

  // Verify the API key
  if (headerApi !== apiKey) {
    res.status(401).send("Unauthorized Action");
    return;
  }

  // Webhook data
  const webhookData = req.body;

  // Handle the webhook data
  // console.log("Webhook Data Received:");
  // console.log(webhookData);

  // You can now process the data as needed

  res.status(200).send("Webhook received successfully");
};

export const getActiveSubscription = async (req, res) => {
  try {
    const { _id: userId } = req.user;
    const currentDate = new Date();

    const activeSubscription = await Subscription.findOne({
      user: userId,
      startingDate: { $lte: currentDate },
      endingDate: { $gte: currentDate },
      paid: true,
    }).populate("servicePlan");

    if (!activeSubscription) {
      return res
        .status(404)
        .json({ success: false, message: "No active subscription found" });
    }

    res.status(200).json({ success: true, data: activeSubscription });
  } catch (error) {
    console.error("Error fetching active subscription:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
