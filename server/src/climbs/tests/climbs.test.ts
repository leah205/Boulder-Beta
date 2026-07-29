import { it, describe } from "vitest";
import AuthRequest from "@/tests/AuthRequest";
import initialize_app from "@/utils/express_app";
const app = initialize_app();
import { createTestUser } from "@/tests/factories";

describe("POST /climbs", () => {
  it("successfully posts climb", async () => {
    const user = await createTestUser();
    const authRequest = new AuthRequest(app, user.id, user.username);
    await authRequest
      .post("/api/v1/climbs")
      .field("grade", "V5")
      .attach("picture", "./src/assets/images/climb1.jpeg")
      .field("color", "blue")
      .expect(200)
      .then((res) => {
        expect(res.body.grade).toEqual("V5");
        expect(res.body.color).toEqual("blue");
      });
  });

  it("works when no grade or picture specified", async () => {
    const user = await createTestUser();
    const authRequest = new AuthRequest(app, user.id, user.username);

    await authRequest
      .post("/api/v1/climbs")
      .field("grade", "")
      .field("color", "green")
      .expect(200);
  });

  it("throws error when no color provided", async () => {
    const user = await createTestUser();
    const authRequest = new AuthRequest(app, user.id, user.username);

    await authRequest.post("/api/v1/climbs").field("grade", "V5").expect(400);
  });
});

describe("GET /climbs", () => {
  it("gets climb", async () => {
    const user = await createTestUser();
    const authRequest = new AuthRequest(app, user.id, user.username);
    let climb_id = 0;

    await authRequest
      .post("/api/v1/climbs")
      .field("grade", "V5")
      .field("color", "blue")
      .expect(200)
      .then((res) => {
        climb_id = res.body.id;
      })
      .then(() => {
        return (
          authRequest
            .get(`/api/v1/climbs/${climb_id}`)

            //.expect(200)
            .then((res) => {
              expect(res.body.grade).toEqual("V5");
            })
        );
      });
  });

  it("throws not found error if climb does not exists", async () => {
    const user = await createTestUser();
    const authRequest = new AuthRequest(app, user.id, user.username);

    await authRequest.get(`/api/v1/climbs/1003`).expect(404);
  });

  it("throws error when accessing someone elses climb", async () => {
    const user1 = await createTestUser();
    const user2 = await createTestUser();
    let climb_id = 0;
    const authRequest1 = new AuthRequest(app, user1.id, user1.username);
    const authRequest2 = new AuthRequest(app, user2.id, user2.username);

    await authRequest1
      .post("/api/v1/climbs")
      .field("grade", "V5")
      .field("color", "green")
      .expect(200)
      .then((res) => {
        climb_id = res.body.id;
      })
      .then(() => {
        return authRequest2.get(`/api/v1/climbs/${climb_id}`).expect(403);
      });
  });
});
