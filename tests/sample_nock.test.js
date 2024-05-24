const nock = require("nock");
const axios = require("axios");

test("test API interaction", async () => {
  // Mock API response
  nock("https://some.api")
    .get("/with/a/request/path")
    .reply(200, { stuff: "happened" });
  console.warn(nock.activeMocks());

  const payload = await axios.get("https://some.api/with/a/request/path");
  expect(payload.data).toHaveProperty("stuff", "happened");
});
