const axios = require('axios');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  const { from, to } = JSON.parse(event.body);
  const API_KEY = process.env.API_KEY;

  try {
    const response = await axios.get('https://api.flightplandatabase.com/search/plans', {
      params: { from, to, limit: 5 },
      headers: { Authorization: API_KEY }
    });
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch flight plans' })
    };
  }
};
