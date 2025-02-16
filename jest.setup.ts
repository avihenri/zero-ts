import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder as NodeTextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = NodeTextDecoder as unknown as typeof globalThis.TextDecoder;
