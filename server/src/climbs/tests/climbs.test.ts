import { it, describe } from "vitest";
import { authRequest } from "@/tests/mocks";
import initialize_app from "@/utils/express_app";
import authQueries from "@/auth/authQueries";
const app = initialize_app();

describe("POST /climbs", () => {
  it("successfully posts climb", async () => {
    const username = "leah";
    const password = "tiktin";
    const { id } = await authQueries.createUser(username, password);

    await authRequest(app, id, username)
      .post("/api/v1/climbs")
      .field("grade", "V5")
      .attach("picture", "./src/assets/climb1.jpg")
      .field("color", "blue")
      .expect(200)
      .then((res) => {
        expect(res.body.grade).toEqual("V5");
        expect(res.body.color).toEqual("blue");
      });
  });

  it("works when no grade or picture specified", async () => {
    const username = "leah";
    const password = "tiktin";
    const { id } = await authQueries.createUser(username, password);
    await authRequest(app, id, username)
      .post("/api/v1/climbs")
      .field("grade", "")
      .field("color", "green")
      .expect(200);
  });

  it("throws error when no color provided", async () => {
    const username = "leah";
    const password = "tiktin";
    const { id } = await authQueries.createUser(username, password);

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
    const { id } = await authQueries.createUser(username, password);

    await authRequest(app, id, username)
      .post("/api/v1/climbs")
      .field("grade", "V5")
      .attach("picture", "./src/assets/climb1.jpg")
      .field("color", "blue")
      .expect(200)
      .then((res) => {
        console.log(res.body);
        expect(res.body.grade).toEqual("V5");
        expect(res.body.color).toEqual("blue");
      });
  });

  it("works when no grade or picture specified", async () => {
    const username = "leah";
    const password = "tiktin";
    const { id } = await authQueries.createUser(username, password);
    await authRequest(app, id, username)
      .post("/api/v1/climbs")
      .field("grade", "")
      .field("color", "green")
      .expect(200);
  });

  it("throws error when no color provided", async () => {
    const username = "leah";
    const password = "tiktin";
    const { id } = await authQueries.createUser(username, password);

    await authRequest(app, id, username)
      .post("/api/v1/climbs")
      .field("grade", "V5")
      .expect(400);
  });
});
