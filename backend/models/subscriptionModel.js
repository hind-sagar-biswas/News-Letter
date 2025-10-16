import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    servicePlan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ServicePlan',
      required: true,
    },
    startingDate: {
      type: Date,
      required: true,
    },
    endingDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'active', 'expired'],
      default: 'pending',
      required: true
    },
    price: {
      type: Number,
      required: true,
    },
    paid: {
      type: Boolean,
      default: false
    },
    invoiceId: {
      type: String,
      unique: true,
      sparse: true,
    },
    transactionId: {
      type: String
    }
  },
  { timestamps: true }
);

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
