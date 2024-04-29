import { setupWorker } from "msw/browser";
import handlers from "./api";
console.log('setupWorker', handlers);
export const worker = setupWorker(...handlers);