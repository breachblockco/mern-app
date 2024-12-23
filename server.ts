import app from "./src/app";
import { config } from "./src/config/config";

const startServer = () => {
  const port = config || 3000;

  app.listen(port, () => {
    console.log(`Listening on PORT: ${config.port}`);
  });
};


startServer();