const mulitpleApiCaller = require("./multiple-api-caller.js");

const collectionsApi = "https://api.getpostman.com/collections?workspace=";
module.exports = class CollectionFinder {
  constructor(summationPoint, workspaces) {
    this.summationPoint = summationPoint;
    this.workspaces = workspaces;
  }

  async attachCollections() {
    let collectionCount = 0;

    for (const workspace of this.workspaces) {
      const endpoint = collectionsApi + workspace.id;
      const response = await mulitpleApiCaller([endpoint]);

      const collections = response[0].collections;

      collectionCount += collections.length;

      collections.forEach((collection) => {
        workspace.collections.push({
          collectionUid: collection.uid,
          collectionName: collection.name,
          requests: [],
        });
      });
    }
    this.summationPoint.totalCollections = collectionCount;
  }
};
