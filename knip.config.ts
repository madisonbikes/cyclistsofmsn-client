export default {
  entry: [
    "index.html",
    "src/index.tsx",
    // for now, set this as an entry point but eventually move to shared project in monorepo
    "src/api/contract/types.ts",
  ],
  project: ["**/*.{js,ts,tsx}", "!**/__mocks__/**"],
};
