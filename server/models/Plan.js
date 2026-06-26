import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: ""
    },
    age: {
      type: Number,
      required: true
    },
    weight: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    intensity: {
      type: String,
      enum: ["low", "moderate", "high"],
      required: true
    },
    goal: {
      type: String,
      enum: ["weight-loss", "muscle"],
      required: true
    },
    generatedPlan: {
      type: Object,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);
