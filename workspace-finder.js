const mulitpleApiCaller = require("./multiple-api-caller.js");

const workspacesApi = "https://api.getpostman.com/workspaces";
module.exports = class WorkspaceFinder {
  constructor(summationPoint, attachPoint) {
    this.summationPoint = summationPoint;
    this.attachPoint = attachPoint;
  }

  async attachWorkspaces() {
    const responses = await mulitpleApiCaller([workspacesApi]);
    const workspaces = responses[0].workspaces;

    this.summationPoint.totalWorkspaces = workspaces.length;

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
