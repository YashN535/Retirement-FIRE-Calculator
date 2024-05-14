// Function to initialize or update the chart
let retirementChart = null;

function calculateRetirement() {
  const currentAge = parseInt(document.getElementById("currentAge").value);
  const retirementAge = parseInt(
    document.getElementById("retirementAge").value
  );
  const lifeExpectancy = parseInt(
    document.getElementById("lifeExpectancy").value
  );
  const preTaxSalary = parseFloat(
    document.getElementById("preTaxSalary").value
  );
  const postTaxSalary = parseFloat(
    document.getElementById("postTaxSalary").value
  );
  const currentSavings = parseFloat(
    document.getElementById("currentSavings").value
  );
  const annualSavings = parseFloat(
    document.getElementById("annualSavings").value
  );
  const annualReturnRate =
    parseFloat(document.getElementById("annualReturnRate").value) / 100;
  const annualRetirementSpending = parseFloat(
    document.getElementById("annualRetirementSpending").value
  );
  const monthlyExpenses = parseFloat(
    document.getElementById("monthlyExpenses").value
  );
  const inflationRate =
    parseFloat(document.getElementById("inflationRate").value) / 100;

  // Calculate annual expenses
  const annualExpenses = monthlyExpenses * 12;

  // Calculate the number of years to retirement and in retirement
  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = lifeExpectancy - retirementAge;

  // Future value of current saving and annual contribution
  const futureValueSavings =
    currentSavings * Math.pow(1 + annualReturnRate, yearsToRetirement);
  const futureValueContributions =
    (annualSavings * (Math.pow(1 + annualReturnRate, yearsToRetirement) - 1)) /
    annualReturnRate;

  // Adjusted return rate for inflation
  const adjustedReturnRate = (1 + annualReturnRate) / (1 + inflationRate) - 1;

  // Present value of the required retirement fund
  const retirementFundNeeded =
    (annualRetirementSpending *
      (1 - Math.pow(1 + adjustedReturnRate, -yearsInRetirement))) /
    adjustedReturnRate;

  // Calculate net worth at each age
  const netWorthOverTime = [];
  let totalSavings = currentSavings;
  for (let i = currentAge; i <= lifeExpectancy; i++) {
    // Calculate net worth at each age (savings only for now)
    const netWorth = totalSavings;

    // Push net worth to array
    netWorthOverTime.push(netWorth);

    // Update total savings for the next age
    totalSavings = (totalSavings + annualSavings) * (1 + annualReturnRate);
  }

  // Calculate FIRE number
  const fireNumber = annualRetirementSpending * 25;

  // Display result
  document.getElementById(
    "totalSavings"
  ).innerText = `Total savings by Retirement: ₹${totalSavings.toFixed(2)}`;
  document.getElementById(
    "requiredRetirementFund"
  ).innerText = `Required Retirement Fund: ₹${retirementFundNeeded.toFixed(2)}`;
  document.getElementById(
    "fireNumber"
  ).textContent = `FIRE Number: ₹${fireNumber.toFixed(2)}`;
  document.getElementById(
    "annualExpenses"
  ).textContent = `Annual Expenses: ₹${annualExpenses.toFixed(2)}`;
  document.getElementById("surplusDeficit").innerText = `Surplus/Deficit: ₹${(
    totalSavings - retirementFundNeeded
  ).toFixed(2)}`;

  // Update chart with new data
  const labels = Array.from(
    { length: lifeExpectancy - currentAge + 1 },
    (_, i) => currentAge + i
  );
  initializeChart(labels, netWorthOverTime, fireNumber);
}

// Function to initialize or update the chart
function initializeChart(labels, netWorthOverTime, fireNumber) {
  const ctx = document.getElementById("retirementChart").getContext("2d");

  if (retirementChart) {
    retirementChart.data.labels = labels;
    retirementChart.data.datasets[0].data = netWorthOverTime;
    retirementChart.data.datasets[1].data = Array(labels.length).fill(
      fireNumber
    );
    retirementChart.update();
  } else {
    retirementChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Net Worth Over Time",
            data: netWorthOverTime,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: true,
          },
          {
            label: "FIRE Number",
            data: Array(labels.length).fill(fireNumber),
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            borderDash: [10, 5],
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}

// Uncomment to add event listeners for form changes
// document.getElementById("currentAge").addEventListener("change", calculateRetirement);
// document.getElementById("retirementAge").addEventListener("change", calculateRetirement);
// document.getElementById("lifeExpectancy").addEventListener("change", calculateRetirement);
// document.getElementById("preTaxSalary").addEventListener("change", calculateRetirement);
// document.getElementById("postTaxSalary").addEventListener("change", calculateRetirement);
// document.getElementById("currentSavings").addEventListener("change", calculateRetirement);
// document.getElementById("annualSavings").addEventListener("change", calculateRetirement);
// document.getElementById("annualReturnRate").addEventListener("change", calculateRetirement);
// document.getElementById("annualRetirementSpending").addEventListener("change", calculateRetirement);
// document.getElementById("monthlyExpenses").addEventListener("change", calculateRetirement);
// document.getElementById("inflationRate").addEventListener("change", calculateRetirement);
