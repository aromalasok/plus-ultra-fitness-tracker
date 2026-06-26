import React, { useMemo, useState } from "react";

const initialForm = {
  name: "",
  age: "",
  weight: "",
  height: "",
  intensity: "moderate",
  goal: "weight-loss"
};

const intensityMap = {
  low: {
    label: "Low",
    weeklyDays: 3,
    sessionLength: "30-40 min",
    note: "Build consistency with lighter sessions and extra recovery."
  },
  moderate: {
    label: "Moderate",
    weeklyDays: 4,
    sessionLength: "40-55 min",
    note: "Balanced training with steady progression."
  },
  high: {
    label: "High",
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
  if (!weight || !heightMeters) return null;
  return (Number(weight) / (heightMeters * heightMeters)).toFixed(1);
}

function createPlan(form) {
  const age = Number(form.age);
  const bmi = calculateBmi(form.weight, form.height);
  const intensity = intensityMap[form.intensity];
  const goal = goalDetails[form.goal];
  const recoveryDay = age >= 45 || form.intensity === "high" ? "Add mobility and stretching after every session." : "Use one light walk or mobility day.";
  const warmup = age < 30 ? "5-7 min dynamic warmup" : "8-10 min joint-friendly warmup";

  return {
    title: `${goal.label} Plan`,
    bmi,
    focus: goal.focus,
    weeklyDays: intensity.weeklyDays,
    sessionLength: intensity.sessionLength,
    warmup,
    recoveryDay,
    schedule: [
      { day: "Day 1", work: `${goal.workouts[0]} + ${goal.workouts[1]} circuit` },
      { day: "Day 2", work: "Core training + easy cardio" },
      { day: "Day 3", work: `${goal.workouts[2]} + ${goal.workouts[3]} circuit` },
      { day: "Day 4", work: form.intensity === "low" ? "Rest or 25 min walk" : "Full-body conditioning" },
      { day: "Day 5", work: form.intensity === "high" ? "Strength finisher + intervals" : "Rest or stretching" }
    ],
    tips: [intensity.note, goal.nutrition, recoveryDay]
  };
}

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [plan, setPlan] = useState(null);

  const isFormReady = useMemo(() => {
    return form.age && form.weight && form.height && Number(form.age) > 0 && Number(form.weight) > 0 && Number(form.height) > 0;
  }, [form]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!isFormReady) return;
    setPlan(createPlan(form));
  }

  function resetForm() {
    setForm(initialForm);
    setPlan(null);
  }

  return (
    <main className="app-shell">
      <section className="hero" aria-labelledby="page-title">
        <nav className="topbar" aria-label="Main navigation">
          <a className="brand" href="#page-title" aria-label="Plus Ultra home">
            <img src="/logo.svg" alt="" className="brand-logo" />
            <span>Plus Ultra</span>
          </a>
          <a className="nav-link" href="#plan-form">Generate Plan</a>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">MERN fitness tracker starter</p>
            <h1 id="page-title">Plus Ultra</h1>
            <p>
              Enter your body details and goal to generate a simple AI-style workout plan that fits your current level.
            </p>
          </div>

          <div className="metric-strip" aria-label="Application highlights">
            <div>
              <span className="metric-icon" aria-hidden="true">DU</span>
              <strong>Goal Based</strong>
              <span>Weight loss or muscle gain</span>
            </div>
            <div>
              <span className="metric-icon" aria-hidden="true">HP</span>
              <strong>Body Aware</strong>
              <span>Uses age, height, and weight</span>
            </div>
            <div>
              <span className="metric-icon" aria-hidden="true">IN</span>
              <strong>Intensity Fit</strong>
              <span>Low, moderate, or high</span>
            </div>
          </div>
        </div>
      </section>

      <section className="workspace" aria-label="Workout planner">
        <form className="planner-card" id="plan-form" onSubmit={handleSubmit}>
          <div className="section-heading">
            <span className="heading-icon" aria-hidden="true">AI</span>
            <div>
              <h2>Generate Your Plan</h2>
              <p>All fields except name are required.</p>
            </div>
          </div>

          <label>
            Name
            <input name="name" type="text" value={form.name} onChange={updateField} placeholder="Alex" autoComplete="name" />
          </label>

          <div className="field-grid">
            <label>
              Age
              <input name="age" type="number" min="12" max="90" value={form.age} onChange={updateField} placeholder="21" required />
            </label>
            <label>
              Weight (kg)
              <input name="weight" type="number" min="25" max="250" value={form.weight} onChange={updateField} placeholder="70" required />
            </label>
            <label>
              Height (cm)
              <input name="height" type="number" min="100" max="240" value={form.height} onChange={updateField} placeholder="175" required />
            </label>
          </div>

          <label>
            Workout Intensity
            <select name="intensity" value={form.intensity} onChange={updateField}>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </label>

          <fieldset>
            <legend>Goal</legend>
            <div className="radio-row">
              <label className="radio-card">
                <input type="radio" name="goal" value="weight-loss" checked={form.goal === "weight-loss"} onChange={updateField} />
                <span>Weight Loss</span>
              </label>
              <label className="radio-card">
                <input type="radio" name="goal" value="muscle" checked={form.goal === "muscle"} onChange={updateField} />
                <span>Muscle Building</span>
              </label>
            </div>
          </fieldset>

          <div className="button-row">
            <button className="primary-button" type="submit" disabled={!isFormReady}>
              Generate
            </button>
            <button className="ghost-button" type="button" onClick={resetForm}>
              Reset
            </button>
          </div>
        </form>

        <aside className="result-panel" aria-live="polite">
          {plan ? (
            <>
              <div className="section-heading">
                <span className="heading-icon" aria-hidden="true">PL</span>
                <div>
                  <h2>{form.name ? `${form.name}'s ${plan.title}` : plan.title}</h2>
                  <p>{plan.focus}</p>
                </div>
              </div>

              <div className="summary-grid">
                <div>
                  <span>BMI</span>
                  <strong>{plan.bmi}</strong>
                </div>
                <div>
                  <span>Days</span>
                  <strong>{plan.weeklyDays}/week</strong>
                </div>
                <div>
                  <span>Session</span>
                  <strong>{plan.sessionLength}</strong>
                </div>
              </div>

              <div className="plan-list">
                {plan.schedule.map((item) => (
                  <article key={item.day}>
                    <span>{item.day}</span>
                    <p>{item.work}</p>
                  </article>
                ))}
              </div>

              <div className="tip-box">
                <strong>{plan.warmup}</strong>
                {plan.tips.map((tip) => (
                  <p key={tip}>{tip}</p>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <img src="/logo.svg" alt="" />
              <h2>Your plan appears here</h2>
              <p>Fill the form and generate a workout plan tailored to your starting point.</p>
            </div>
          )}
        </aside>
      </section>
    </main>
  );
}
