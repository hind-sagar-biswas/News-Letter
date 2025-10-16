import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getActiveSubscription, handleSuccess, handleWebHook, updatePackageWithCharge, subscribe, updatePackageForFree } from "../controllers/subscriptionController.js";
import { manualSubscribe, manualUpdatePackageWithCharge } from "../controllers/manualSubscriptionController.js";
;

const router = express.Router();

router.get("/active", protectRoute, getActiveSubscription);

router.post("/subscribe", protectRoute, subscribe);
router.post("/update-package/with-charge/:subscriptionId", protectRoute, updatePackageWithCharge);
router.patch("/update-package/free/:subscriptionId", protectRoute, updatePackageForFree);

router.post("/success", handleSuccess);
router.post("/webhook", handleWebHook);

// manual subscription (subscription without payment gateway, for temporary use)
router.post("/manual/subscribe", protectRoute, manualSubscribe)
router.post("/manual/update-package/with-charge/:subscriptionId", protectRoute, manualUpdatePackageWithCharge);



export default router;