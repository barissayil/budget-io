import "@testing-library/jest-dom/extend-expect";
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).TextDecoder = TextDecoder;
