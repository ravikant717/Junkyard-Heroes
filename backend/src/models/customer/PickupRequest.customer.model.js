import mongoose from "mongoose";

const pickupRequestSchema = new mongoose.Schema(
  {
    //In MongoDB (with Mongoose), a reference is a way to link documents in different collections. In the schema, this is done using the ref property:
    customer: {
      type: mongoose.Schema.Types.ObjectId, //to create a reference to the user model
      ref: "User", //to create a reference to the user model
      required: true,
    },
    pickupData: {
      type: Date,
      required: true,
    },
    pickUpTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed"],
      default: "pending",
    },
  },
  { timestamps: true } //to add createdAt and updatedAt fields);
);

const PickupRequest = mongoose.model("PickupRequest", pickupRequestSchema);
export default PickupRequest;
