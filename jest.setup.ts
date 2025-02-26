import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder as NodeTextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = NodeTextDecoder as unknown as typeof globalThis.TextDecoder;

// mock ENV module (instead of `import.meta.env`)
jest.mock("./src/config/env", () => ({
  ENV: {
    POSTMAN_URL: "https://mock-api.com",
    POSTMAN_KEY: "mock-api-key",
  },
}));

global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ data: [] }), // Simulating an empty response
    })
  ) as jest.Mock;