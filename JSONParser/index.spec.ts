import { jsonParser } from "./index";

describe("JSON Parser test suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("returns 0 for a simple valid json object", async () => {
    const res = await jsonParser("test1.txt");
    expect(res).toEqual(0);
  });

  it("returns 1 for a simple invalid json object", async () => {
    jest.spyOn(console, "error");
    const res = await jsonParser("test2.txt");
    expect(res).toEqual(1);
    expect(console.error).toHaveBeenCalledWith(
      "Invalid JSON object formatting",
    );
  });

  it("returns 0 for a valid json object", async () => {
    const res = await jsonParser("test3.txt");
    expect(res).toEqual(0);
  });

  it("returns 1 for a simple invalid json object", async () => {
    jest.spyOn(console, "error");
    const res = await jsonParser("text5.txt");
    expect(res).toEqual(1);
    expect(console.error).toHaveBeenCalledWith(
      "Invalid JSON object formatting",
    );
  });
});
