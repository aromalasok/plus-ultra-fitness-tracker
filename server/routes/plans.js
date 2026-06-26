import express from "express";
import Plan from "../models/Plan.js";
import generateWorkoutPlan from "../utils/generateWorkoutPlan.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const plans = await Plan.find().sort({ createdAt: -1 }).limit(20);
  res.json(plans);
});

router.post("/", async (req, res) => {
  try {
    const { name = "", age, weight, height, intensity, goal } = req.body;

    if (!age || !weight || !height || !intensity || !goal) {
      return res.status(400).json({ message: "Age, weight, height, intensity, and goal are required." });
    }

    const generatedPlan = generateWorkoutPlan({ age, weight, height, intensity, goal });
    const savedPlan = await Plan.create({
      name,
      age,
      weight,
      height,
      intensity,
      goal,
      generatedPlan
    });

    res.status(201).json(savedPlan);
  } catch (error) {
    res.status(500).json({ message: "Could not generate plan.", details: error.message });
  }
});

export default router;
