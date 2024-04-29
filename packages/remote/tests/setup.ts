import "@testing-library/react/dont-cleanup-after-each";
import "@testing-library/dom";
import "@testing-library/react";
import { cleanup } from "@testing-library/react";

//개별 테스트 후 cleanup실행
afterEach(cleanup)
