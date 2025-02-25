document.addEventListener('DOMContentLoaded', () => {
  const flightForm = document.getElementById('flightForm');
  if (flightForm) {
    flightForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const from = document.getElementById('from').value;
      const to = document.getElementById('to').value;

      try {
        const response = await fetch('/.netlify/functions/getFlightPlans', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ from, to })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch flight plans');
        }

        if (!Array.isArray(data)) {
          throw new Error('Invalid response format: Expected an array');
        }

        displayResults(data);
      } catch (error) {
        console.error('Error:', error);
        displayError(error.message); // Display the error message
      }
    });
  } else {
    console.error('Form not found');
  }
});

function displayResults(plans) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (!Array.isArray(plans) || plans.length === 0) {
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

function displayError(message) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `<p class="error">${message}</p>`;
}
