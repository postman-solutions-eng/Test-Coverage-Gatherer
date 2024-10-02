#! /usr/bin/env node
"use strict";

const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const axios = require("axios");
const fs = require("fs");

const WorkspaceFinder = require("./workspace-finder.js");
const CollectionFinder = require("./collection-finder.js");
const RequestFinder = require("./request-finder.js");

const argv = yargs(hideBin(process.argv))
  .usage("Usage: $0 --apiKey [str] --outputFile [str] --workspaceId [str]")
  .option("apiKey", {
    alias: ["k"],
    describe: "The Postman API Key with access to the Team or Workspace",
  })
  .option("workspaceId", {
    alias: ["w"],
    describe: "The id of the workspace to check for test coverage",
  })
  .option("outputFile", {
    alias: ["o"],
    describe: "The location and filename for output",
  })
  .default("outputFile", "pm-test-coverage.json")
  .demandOption(["apiKey"])
  .epilog(
    `This command line tool will navigate through every team that the
Postman users API Key has access to and report back on test coverage. 
Alternatively, you may supply the optional --workspaceId with the id
of the workspace, and only that workspace will be analyzed and returned`
  )
  .parse();

let apiKey = argv.apiKey;
let workspaceId = argv.workspaceId;
let outputLocation = argv.outputFile;

if (workspaceId != null) {
  console.log(workspaceId);
}

axios.defaults.headers.common["X-API-Key"] = apiKey;

const workingResults = {
  summary: {},
  results: {
    workspaces: [],
  },
};

async function dataCoordinator() {
  const workspaceFinder = new WorkspaceFinder(
    workingResults.summary,
    workingResults.results.workspaces
  );

  if (workspaceId != null) {
    await workspaceFinder.attachWorkspace(workspaceId);
  } else {
    await workspaceFinder.attachWorkspaces();
  }

  const collectionFinder = new CollectionFinder(
    workingResults.summary,
    workingResults.results.workspaces
  );

  await collectionFinder.attachCollections();

  for (const workspace of workingResults.results.workspaces) {
    const requestFinder = new RequestFinder(workspace.collections);
    await requestFinder.attachRequests();
  }

  fs.writeFileSync(outputLocation, JSON.stringify(workingResults));
}

dataCoordinator();
