import config from "./config";
import initialize_app from "@/utils/express_app";

const app = initialize_app();

app.listen(config.port, () => {
  console.log(`server started on part ${config.port}`);
});
