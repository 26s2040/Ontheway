import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  userEmail: { type: String, required: true }, // Email as the identifier for the user
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
  address: { type: String, required: true },
  status: { type: String, default: "pending" }, // Default status for the request
  createdAt: { type: Date, default: Date.now },
});

const RequestModel = mongoose.model("requests", RequestSchema);

export default RequestModel;
