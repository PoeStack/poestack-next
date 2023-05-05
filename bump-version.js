const nextBuildId = require("next-build-id");
const fs = require("fs");

fs.writeFileSync(
  "src/utils/version.tsx",
  `export const POE_STACK_VERSION = "${Date.now()}_${nextBuildId.sync()}"`
);
