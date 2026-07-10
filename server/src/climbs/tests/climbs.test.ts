import { it, describe } from "vitest";
import AuthRequest from "@/tests/AuthRequest";
import initialize_app from "@/utils/express_app";
import authQueries from "@/auth/authQueries";
const app = initialize_app();

describe("POST /climbs", () => {
  it("successfully posts climb", async () => {
    const username = "leah";
    const password = "tiktin";
    const { id } = await authQueries.createUser(username, password);
    const authRequest = new AuthRequest(app, id, username);
    await authRequest
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
    const authRequest = new AuthRequest(app, id, username);

    await authRequest
      .post("/api/v1/climbs")
      .field("grade", "")
      .field("color", "green")
      .expect(200);
  });

  it("throws error when no color provided", async () => {
    const username = "leah";
    const password = "tiktin";
    const { id } = await authQueries.createUser(username, password);
    const authRequest = new AuthRequest(app, id, username);

    await authRequest.post("/api/v1/climbs").field("grade", "V5").expect(400);
  });
});

describe("GET /climbs", () => {
  it("gets climb", async () => {
    const username = "leah";
    const password = "tiktin";
    const { id } = await authQueries.createUser(username, password);
    let climb_id = 0;
    const authRequest = new AuthRequest(app, id, username);

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
            .then((res) => {
              console.log(res.body);
              return res;
            })
            //.expect(200)
            .then((res) => {
              expect(res.body.grade).toEqual("V5");
            })
        );
      });
  });

  it("throws not found error if climb does not exists", async () => {
    const username = "leah";
    const password = "tiktin";
    const { id } = await authQueries.createUser(username, password);
    const authRequest = new AuthRequest(app, id, username);

    await authRequest.get(`/api/v1/climbs/1003`).expect(404);
  });

  it("throws error when accessing someone elses climb", async () => {
    const user1 = "leah";
    const password1 = "tiktin";
    const user2 = "andrew";
    const password2 = "tiktin";
    const { id: id1 } = await authQueries.createUser(user1, password1);
    const { id: id2 } = await authQueries.createUser(user2, password2);
    let climb_id = 0;
    const authRequest1 = new AuthRequest(app, id1, user1);
    const authRequest2 = new AuthRequest(app, id2, user2);

    await authRequest1
      .post("/api/v1/climbs")
      .field("grade", "V5")
      .field("color", "green")
      .expect(200)
      .then((res) => {
        climb_id = res.body.id;
      })
      .then(() => {
        authRequest2.get(`/api/v1/climbs/${climb_id}`).expect(401);
      });
  });
});
