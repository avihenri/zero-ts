import "@testing-library/jest-dom";
import React from 'react';
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

jest.mock("lucide-react", () => ({
  Check: () => React.createElement('svg', { 'data-testid': 'check-icon' }),
  X: () => React.createElement('svg', { 'data-testid': 'x-icon' }),
  GripVertical: () => React.createElement('div', { 'data-testid': 'grip-icon' }),
  BeerIcon: () => React.createElement('svg', { 'data-testid': 'beer-icon' }),
  LucideIcon: () => React.createElement('svg', { 'data-testid': 'lucide-icon' }),
  ShoppingBasket: () => React.createElement('svg', { 'data-testid': 'shopping-basket' }),
  Soup: () => React.createElement('svg', { 'data-testid': 'soup' }),
}));

jest.mock("mapbox-gl/dist/mapbox-gl.css", () => ({}));