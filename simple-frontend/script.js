const form = document.getElementById("fitnessForm");
const resetBtn = document.getElementById("resetBtn");
const resultTitle = document.getElementById("resultTitle");
const resultSubtitle = document.getElementById("resultSubtitle");
const resultContent = document.getElementById("resultContent");

const intensityDetails = {
  low: {
    days: 3,
    session: "30-40 min",
    note: "Start light and focus on consistency."
  },
  moderate: {
    days: 4,
    session: "40-55 min",
    note: "Use balanced workouts and improve each week."
  },
  high: {
    days: 5,
    session: "55-70 min",
    note: "Train hard, but protect recovery and sleep."
  }
};

const goalDetails = {
  "weight-loss": {
    title: "Weight Loss Plan",
    focus: "Cardio, full-body circuits, and steady calorie control",
    workouts: ["Incline walk or jog", "Squat to press", "Mountain climbers", "Plank shoulder taps"],
    nutrition: "Eat enough protein, drink water, and maintain a small calorie deficit."
  },
  muscle: {
    title: "Muscle Building Plan",
    focus: "Strength training, progressive overload, and recovery",
    workouts: ["Goblet squats", "Push-ups or bench press", "Rows", "Romanian deadlifts"],
    nutrition: "Eat enough protein and include carbs around your workouts."
  }
};

function calculateBmi(weight, height) {
  const heightMeters = height / 100;
  return (weight / (heightMeters * heightMeters)).toFixed(1);
}

function getSelectedGoal() {
  return document.querySelector("input[name='goal']:checked").value;
}

function generatePlan(data) {
  const intensity = intensityDetails[data.intensity];
  const goal = goalDetails[data.goal];
  const warmup = data.age < 30 ? "5-7 min dynamic warmup" : "8-10 min joint-friendly warmup";
  const recovery = data.age >= 45 || data.intensity === "high"
    ? "Add stretching or mobility after every session."
    : "Use one easy walk or mobility day.";

  return {
    title: goal.title,
    focus: goal.focus,
    bmi: calculateBmi(data.weight, data.height),
    days: intensity.days,
    session: intensity.session,
    warmup,
    tips: [intensity.note, goal.nutrition, recovery],
    schedule: [
      { day: "Day 1", work: `${goal.workouts[0]} + ${goal.workouts[1]} circuit` },
      { day: "Day 2", work: "Core training + easy cardio" },
      { day: "Day 3", work: `${goal.workouts[2]} + ${goal.workouts[3]} circuit` },
      { day: "Day 4", work: data.intensity === "low" ? "Rest or 25 min walk" : "Full-body conditioning" },
      { day: "Day 5", work: data.intensity === "high" ? "Strength finisher + intervals" : "Rest or stretching" }
    ]
  };
}

function showPlan(name, plan) {
  resultTitle.textContent = name ? `${name}'s ${plan.title}` : plan.title;
  resultSubtitle.textContent = plan.focus;

  const scheduleHtml = plan.schedule
    .map((item) => `
      <article class="plan-item">
        <strong>${item.day}</strong>
        <p>${item.work}</p>
      </article>
    `)
    .join("");

  const tipsHtml = plan.tips.map((tip) => `<p>${tip}</p>`).join("");

  resultContent.className = "";
  resultContent.innerHTML = `
    <div class="summary">
      <div>
        <span>BMI</span>
        <strong>${plan.bmi}</strong>
      </div>
      <div>
        <span>Days</span>
        <strong>${plan.days}/week</strong>
      </div>
      <div>
        <span>Session</span>
        <strong>${plan.session}</strong>
      </div>
    </div>

    <div class="plan-list">
      ${scheduleHtml}
    </div>

    <div class="tips">
      <strong>${plan.warmup}</strong>
      ${tipsHtml}
    </div>
  `;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = {
    name: document.getElementById("name").value.trim(),
    age: Number(document.getElementById("age").value),
    weight: Number(document.getElementById("weight").value),
    height: Number(document.getElementById("height").value),
    intensity: document.getElementById("intensity").value,
    goal: getSelectedGoal()
  };

  if (data.age < 12 || data.age > 90) {
    alert("Please enter a valid age.");
    return;
  }

  if (data.weight < 25 || data.height < 100) {
    alert("Please enter valid height and weight values.");
    return;
  }

  const plan = generatePlan(data);
  localStorage.setItem("plusUltraProfile", JSON.stringify({ ...data, plan }));
  showPlan(data.name, plan);
});

resetBtn.addEventListener("click", () => {
  form.reset();
  localStorage.removeItem("plusUltraProfile");
  resultTitle.textContent = "Your Plan Appears Here";
  resultSubtitle.textContent = "Complete the form and click Generate Plan.";
  resultContent.className = "empty-box";
  resultContent.innerHTML = `
    <img src="logo.svg" alt="" />
    <p>No plan generated yet.</p>
  `;
});

window.addEventListener("load", () => {
  const saved = localStorage.getItem("plusUltraProfile");

  if (!saved) {
    return;
  }

  const data = JSON.parse(saved);
  document.getElementById("name").value = data.name;
  document.getElementById("age").value = data.age;
  document.getElementById("weight").value = data.weight;
  document.getElementById("height").value = data.height;
  document.getElementById("intensity").value = data.intensity;
  document.querySelector(`input[name='goal'][value='${data.goal}']`).checked = true;
  showPlan(data.name, data.plan);
});
