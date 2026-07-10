import { it, describe } from "vitest";
import initialize_app from "@/utils/express_app";
import authQueries from "@/auth/authQueries";
import AuthRequest from "@/tests/AuthRequest";

const app = initialize_app();

describe("GET /users/me/climbs", () => {
  it("inserts and then retrieves climbs", async () => {
    const username = "leah";
    const password = "tiktin";
    const { id } = await authQueries.createUser(username, password);
    const authRequest = new AuthRequest(app, id, username);

    return authRequest
      .post("/api/v1/climbs")
      .field("grade", "V5")
      .attach("picture", "./src/assets/climb1.jpg")
      .field("color", "blue")
      .then(() => {
        return authRequest
          .get("/api/v1/users/me/climbs")
          .expect(200)
          .then((res) => {
            const data = res.body;
            expect(data).toHaveLength(1);
            expect(data[0].color).toEqual("blue");
            expect(data[0].grade).toEqual("V5");
            expect(data[0]).toHaveProperty("picture");
          });
      });
  });
});
