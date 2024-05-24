const mulitpleApiCaller = require("./multiple-api-caller.js");

const workspacesApi = "https://api.getpostman.com/workspaces";
module.exports = class WorkspaceFinder {
  constructor(summationPoint, attachPoint) {
    this.summationPoint = summationPoint;
    this.attachPoint = attachPoint;
  }

  async attachWorkspaces() {
    console.log(`Getting workspaces`);
    const responses = await mulitpleApiCaller([workspacesApi]);
    const workspaces = responses[0].workspaces;

    this.summationPoint.workspaces = workspaces.length;
    console.log(`Processing ${workspaces.length} workspaces`);

    workspaces.forEach((workspace) => {
      let workspaceToAdd = {
        id: workspace.id,
        name: workspace.name,
        visibility: workspace.visibility,
        collections: [],
      };

      this.attachPoint.push(workspaceToAdd);
    });
  }
};
