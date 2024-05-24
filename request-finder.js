const mulitpleApiCaller = require("./multiple-api-caller.js");

const collectionApi = "https://api.getpostman.com/collections/";

function getItems(items) {
  let results = [];

  items.forEach((item) => {
    if ("event" in item && !("item" in item)) {
      let tests = item.event.filter((entry) => entry.listen === "test");
      let foundRequest;

      if (tests.length === 0) {
        foundRequest = {
          name: item.name,
          numberOfTests: 0,
        };
      } else {
        foundRequest = {
          name: item.name,
          numberOfTests: findTests(tests[0].script.exec),
        };
      }

      results.push(foundRequest);
    } else if ("item" in item) {
      results = results.concat(getItems(item.item));
    } else if ("name" in item) {
      let foundRequest = {
        name: item.name,
        numberOfTests: 0,
      };
      results.push(foundRequest);
    } else {
      console.log(item);
    }
  });

  return results;
}

function findTests(testLines) {
  let results = testLines.filter(
    (line) => line.includes("pm.test") && !line.includes("//pm.test")
  );
  return results.length;
}

module.exports = class RequestFinder {
  constructor(collections) {
    this.collections = collections;
  }

  async attachRequests() {
    for (const collection of this.collections) {
      const endpoint = collectionApi + collection.collectionUid;
      const responses = await mulitpleApiCaller([endpoint]);

      responses.forEach((response) => {
        const itemsResult = getItems(response.collection.item);

        const numberOfRequests = itemsResult.length;
        const coveredRequests = itemsResult.filter(
          (item) => item.numberOfTests > 0
        ).length;
        const uncoveredRequests = numberOfRequests - coveredRequests;
        const percentCovered = (coveredRequests / numberOfRequests) * 100;
        const percentUncovered = (uncoveredRequests / numberOfRequests) * 100;

        collection.summary = {
          totalRequests: numberOfRequests,
          requestsWithTests: coveredRequests,
          requestsWithoutTests: uncoveredRequests,
          percentWithTests: percentCovered + "%",
          percentWithoutTests: percentUncovered + "%",
        };

        itemsResult.forEach((item) => {
          let result = {
            requestName: item.name,
            numberOfTests: item.numberOfTests,
          };

          collection.requests.push(result);
        });
      });
    }
  }
};
