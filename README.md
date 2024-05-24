# Determine test coverage for your Postman workspaces

Still a work in progress, build locally with:

```
npm install
npm i -g
```

Run the application:

```
pm-test-coverage --apiKey=<Your Postman API Key here>
```

Output saved as a file (pm-test-coverage.json) in the directory you execute the command.

Example:

```
{
    "overallTallies": {
        "totalWorkspaces": 28,
        "totalCollections": 102
    },
    "results": {
        "workspaces": [
            {
                "id": "dbc.....",
                "name": "Team Workspace",
                "visibility": "team",
                "collections": [
                    {
                        "collectionUid": "343....",
                        "collectionName": "Product Recommendations API Copy",
                        "requests": [
                            {
                                "requestName": "Get product recommendations",
                                "numberOfTests": 1
                            },
                            {
                                "requestName": "{{baseUrl}}/v2/recommendations?customerId={{customerId}}&limit={{limit}}",
                                "numberOfTests": 1
                            }
                        ],
                        "summary": {
                            "totalRequests": 2,
                            "requestsWithTests": 2,
                            "requestsWithoutTests": 0,
                            "percentWithTests": "100%",
                            "percentWithoutTests": "0%"
                        }
                    },
                    {
                        "collectionUid": "344...",
                        "collectionName": "Subscriptions Service - API Documentation",
                        "requests": [
                            {
                                "requestName": "Get a subscription by ID",
                                "numberOfTests": 0
                            },
                            {
                                "requestName": "Update a subscription by ID",
                                "numberOfTests": 0
                            },
                            {
                                "requestName": "Delete a subscription by ID",
                                "numberOfTests": 0
                            },
                            {
                                "requestName": "Get all subscriptions",
                                "numberOfTests": 0
                            },
                            {
                                "requestName": "Create a new subscription",
                                "numberOfTests": 0
                            }
                        ],
                        "summary": {
                            "totalRequests": 5,
                            "requestsWithTests": 0,
                            "requestsWithoutTests": 5,
                            "percentWithTests": "0%",
                            "percentWithoutTests": "100%"
                        }
                    },
                    {
                        "collectionUid": "34380....
```
