"use strict";

const yargs = require("yargs");
const axios = require("axios");
const fs = require("fs");

const WorkspaceFinder = require("./workspace-finder.js");
const CollectionFinder = require("./collection-finder.js");
const RequestFinder = require("./request-finder.js");

let argv = yargs.argv;
let apiKey = argv.apiKey;

if (!apiKey) {
  console.log("Please supply an apiKey");
  process.exit();
}

axios.defaults.headers.common["X-API-Key"] = apiKey;

const workingResults = {
  overallTallies: {},
  results: {
    workspaces: [],
  },
};

async function dataCoordinator() {
  const workspaceFinder = new WorkspaceFinder(
    workingResults.overallTallies,
    workingResults.results.workspaces
  );
  await workspaceFinder.attachWorkspaces();

  const collectionFinder = new CollectionFinder(
    workingResults.overallTallies,
    workingResults.results.workspaces
  );

  await collectionFinder.attachCollections();

  for (const workspace of workingResults.results.workspaces) {
    const requestFinder = new RequestFinder(workspace.collections);
    await requestFinder.attachRequests();
  }

  fs.writeFileSync("results.json", JSON.stringify(workingResults));
}

dataCoordinator();
