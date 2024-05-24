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
Note: Depending on how many workspaces your API key has access to, this could take a while...

Example:

```
{
    "summary": {
        "workspaces": 28,
        "collections": 102
    },
    "results": {
        "workspaces": [
            {
                "id": "dbc8...",
                "name": "Team Workspace",
                "visibility": "team",
                "collections": [
                    {
                        "uid": "3438...",
                        "name": "Dronen - erds-Product Recommendations API Copy",
                        "requests": [
                            {
                                "name": "Get product recommendations",
                                "tests": 1
                            },
                            {
                                "name": "{{baseUrl}}/v2/recommendations?customerId={{customerId}}&limit={{limit}}",
                                "tests": 1
                            }
                        ],
                        "requestSummary": {
                            "total": 2,
                            "withTests": {
                                "number": 2,
                                "percent": "100%"
                            },
                            "withoutTests": {
                                "number": 0,
                                "percent": "0%"
                            }
                        }
                    },
                    {
                        "uid": "3445...",
                        "name": "Subscriptions Service - API Documentation",
                        "requests": [
                            {
                                "name": "Get a subscription by ID",
                                "tests": 0
                            },
                            {
                                "name": "Update a subscription by ID",
                                "tests": 0
                            },
                            {
                                "name": "Delete a subscription by ID",
                                "tests": 0
                            },
                            {
                                "name": "Get all subscriptions",
                                "tests": 0
                            },
                            {
                                "name": "Create a new subscription",
                                "tests": 0
                            }
                        ],
                        "requestSummary": {
                            "total": 5,
                            "withTests": {
                                "number": 0,
                                "percent": "0%"
                            },
                            "withoutTests": {
                                "number": 5,
                                "percent": "100%"
                            }
                        }
                    },
                    {
                        "uid": "34380....",
                        "name": "Subscriptions Service - API Documentation",
                        "requests": [
                            {
                                "name": "Get a subscription by ID",
                                "tests": 0
                            },
                            {
                                "name": "Update a subscription by ID",
                                "tests": 0
                            },
                            {
                                "name": "Delete a subscription by ID",
                                "tests": 0
                            },
                            {
                                "name": "Get all subscriptions",
                                "tests": 3
                            },
                            {
                                "name": "Create a new subscription",
                                "tests": 0
                            },
                            {
                                "name": "{{baseUrl}}/subscriptions",
                                "tests": 3
                            }
                        ],
                        "requestSummary": {
                            "total": 6,
                            "withTests": {
                                "number": 2,
                                "percent": "33.33333333333333%"
                            },
                            "withoutTests": {
                                "number": 4,
                                "percent": "66.66666666666666%"
                            }
                        }
                    },
                    {
                        "uid": "3438....
```
