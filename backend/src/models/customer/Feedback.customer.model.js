import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    request: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PickupRequest", // Reference to the PickupRequest model
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    dealer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Dealer", // Reference to the Dealer model
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: String,
  },
  { timestamps: true }
); //to add createdAt and updatedAt fields);

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
