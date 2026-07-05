import { it, describe } from "vitest";
import app from "@/tests/setupTests";
import { createTestUser } from "@/tests/helpers";
import { authRequest } from "@/tests/mocks";

describe("POST /climbs", () => {
  it("successfully posts climb", async () => {
    const username = "leah";
    const password = "tiktin";
    const id = await createTestUser(username, password);

    await authRequest(app, id, username)
      .post("/api/v1/climbs")
      .field("grade", "V5")
      .attach("picture", "./src/assets/climb1.jpg")
      .field("color", "blue")
      .expect(200)
      .then((res) => {
        expect(res.body.grade).toEqual("V5");
        expect(res.body.color).toEqual("blue");
        expect(res.body).toHaveProperty("picture");
      });
  });

  it("works when no grade or picture specified", async () => {
    const username = "leah";
    const password = "tiktin";
    const id = await createTestUser(username, password);
    await authRequest(app, id, username)
      .post("/api/v1/climbs")
      .field("grade", "")
      .field("color", "green")
      .expect(200);
  });

  it("throws error when no color provided", async () => {
    const username = "leah";
    const password = "tiktin";
    const id = await createTestUser(username, password);

    await authRequest(app, id, username)
      .post("/api/v1/climbs")
      .field("grade", "V5")
      .expect(400);
  });
});

describe("POST /climbs", () => {
  it("successfully posts climb", async () => {
    const username = "leah";
    const password = "tiktin";
    const id = await createTestUser(username, password);

    await authRequest(app, id, username)
      .post("/api/v1/climbs")
      .field("grade", "V5")
      .attach("picture", "./src/assets/climb1.jpg")
      .field("color", "blue")
      .expect(200)
      .then((res) => {
        expect(res.body.grade).toEqual("V5");
        expect(res.body.color).toEqual("blue");
        expect(res.body).toHaveProperty("picture");
      });
  });

  it("works when no grade or picture specified", async () => {
    const username = "leah";
    const password = "tiktin";
    const id = await createTestUser(username, password);
    await authRequest(app, id, username)
      .post("/api/v1/climbs")
      .field("grade", "")
      .field("color", "green")
      .expect(200);
  });

  it("throws error when no color provided", async () => {
    const username = "leah";
    const password = "tiktin";
    const id = await createTestUser(username, password);

    await authRequest(app, id, username)
      .post("/api/v1/climbs")
      .field("grade", "V5")
      .expect(400);
  });
});
