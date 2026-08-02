import config from "./config";
import initialize_app from "@/express_app";

const app = initialize_app();

app.listen(config.port, () => {
  `server started on part ${config.port}`;
});
