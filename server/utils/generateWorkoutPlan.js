const intensityMap = {
  low: {
    weeklyDays: 3,
    sessionLength: "30-40 min",
    note: "Build consistency with lighter sessions and extra recovery."
  },
  moderate: {
    weeklyDays: 4,
    sessionLength: "40-55 min",
    note: "Balanced training with steady progression."
  },
  high: {
    weeklyDays: 5,
    sessionLength: "55-70 min",
    note: "Harder sessions with careful warmups and recovery."
  }
};

const goalDetails = {
  "weight-loss": {
    label: "Weight Loss",
    focus: "Cardio, full-body circuits, and calorie-friendly consistency",
    workouts: ["Incline walk or jog", "Squat to press", "Mountain climbers", "Plank shoulder taps"],
    nutrition: "Prioritize protein, vegetables, water, and a small calorie deficit."
  },
  muscle: {
    label: "Muscle Building",
    focus: "Strength training, progressive overload, and enough recovery",
    workouts: ["Goblet squats", "Push-ups or bench press", "Rows", "Romanian deadlifts"],
    nutrition: "Prioritize protein, carbs around workouts, and consistent meals."
  }
};

function calculateBmi(weight, height) {
  const heightMeters = Number(height) / 100;
  return (Number(weight) / (heightMeters * heightMeters)).toFixed(1);
}

export default function generateWorkoutPlan(profile) {
  const age = Number(profile.age);
  const intensity = intensityMap[profile.intensity];
  const goal = goalDetails[profile.goal];
  const recoveryDay = age >= 45 || profile.intensity === "high" ? "Add mobility and stretching after every session." : "Use one light walk or mobility day.";
  const warmup = age < 30 ? "5-7 min dynamic warmup" : "8-10 min joint-friendly warmup";

  return {
    title: `${goal.label} Plan`,
    bmi: calculateBmi(profile.weight, profile.height),
    focus: goal.focus,
    weeklyDays: intensity.weeklyDays,
    sessionLength: intensity.sessionLength,
    warmup,
    schedule: [
      { day: "Day 1", work: `${goal.workouts[0]} + ${goal.workouts[1]} circuit` },
      { day: "Day 2", work: "Core training + easy cardio" },
      { day: "Day 3", work: `${goal.workouts[2]} + ${goal.workouts[3]} circuit` },
      { day: "Day 4", work: profile.intensity === "low" ? "Rest or 25 min walk" : "Full-body conditioning" },
      { day: "Day 5", work: profile.intensity === "high" ? "Strength finisher + intervals" : "Rest or stretching" }
    ],
    tips: [intensity.note, goal.nutrition, recoveryDay]
  };
}
