import app from "./src/app";
import { envConfigs } from "./src/config/env-configs";

const PORT = envConfigs.port || 4406
app.listen(PORT, () => {
  console.log(`Server running on http://loalhost:${PORT}`);
})