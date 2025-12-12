const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//GET /
app.get("/", (req, res) => {
  res.send(`
    <link rel="stylesheet" href="/styles.css">

    <h1>BMI Calculator</h1>
    <div class="styledForm">
      <form method="POST" action="/calculate-bmi">
        <label>Weight (kg):</label><br />
        <input type="number" name="weight" step="0.1" required /><br /><br />

        <label>Height (cm):</label><br />
        <input type="number" name="height" step="0.1" required /><br /><br />

        <button type="submit" class="btn">Calculate BMI</button>
      </form>
    </div>
  `);
});

//POST /calculate-bmi
app.post("/calculate-bmi", (req, res) => {
  const weight = parseFloat(req.body.weight);
  const heightCm = parseFloat(req.body.height); //cm

  if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
    return res.send("Invalid input. Please enter positive values.");
  }

  const heightM = heightCm / 100; //convert cm to meters
  const bmi = weight / (heightM * heightM);

  var message = "";
  var colorClass="";
  if (bmi < 18.5) {
    message = "underweight";
    colorClass="blueRes"
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    message = "Normal weight";
    colorClass="greenRes"
  } else if (bmi >= 25 && bmi <= 29.9) {
    message = "Overweight";
    colorClass="yellowRes"
  } else {
    message = "Obese";
    colorClass="redRes"
  }

  res.send(`
   <link rel="stylesheet" href="/styles.css">

    <h1>Your BMI Result</h1>
    <p>Weight: ${weight} kg</p>
    <p>Height: ${heightCm} cm</p>
    <h2 class="${colorClass}">You are in: ${message}</h2>
    <h2>BMI = ${bmi.toFixed(2)}</h2>

    <button type="submit" class="btn"><a href="/">Back</a></button>
    
  `);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running `);
});
