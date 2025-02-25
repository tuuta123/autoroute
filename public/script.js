document.getElementById('flightForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const from = document.getElementById('from').value;
  const to = document.getElementById('to').value;

  const response = await fetch('/.netlify/functions/getFlightPlans', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to })
  });

  const data = await response.json();
  displayResults(data);
});

function displayResults(plans) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (plans.length === 0) {
    resultsDiv.innerHTML = '<p>No flight plans found.</p>';
    return;
  }

  plans.forEach(plan => {
    const planDiv = document.createElement('div');
    planDiv.className = 'flight-plan';
    planDiv.innerHTML = `
      <h3>Flight Plan ID: ${plan.id}</h3>
      <p><strong>From:</strong> ${plan.fromICAO}</p>
      <p><strong>To:</strong> ${plan.toICAO}</p>
      <p><strong>Route:</strong> ${plan.route}</p>
    `;
    resultsDiv.appendChild(planDiv);
  });
}