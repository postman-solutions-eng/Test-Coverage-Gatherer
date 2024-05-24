const axios = require("axios");

async function makeAPICall(endpoint) {
  const response = await axios.get(endpoint, {});
  const results = await response.data;

  return results;
}

async function makeMultipleAPICalls(endpoints) {
  const promises = endpoints.map(makeAPICall);
  const responses = await Promise.all(promises);
  return responses;
}

module.exports = makeMultipleAPICalls;
