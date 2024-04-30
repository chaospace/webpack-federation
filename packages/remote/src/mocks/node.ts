import handlers from "./handlers";
import { setupServer } from "msw/node";

// node 환경 서버 구성
export const server = setupServer(...handlers);
