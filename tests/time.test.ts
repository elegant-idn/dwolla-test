import request from "supertest";
import app from "../src/app";

describe("GET /time", () => {
  it("should return the current UTC time", async () => {
    const res = await request(app).get("/time");
    expect(res.status).toBe(200);
    expect(res.body.currentTime).toBeDefined();
  });

  it("should return the adjusted time for a valid timezone offset", async () => {
    const res = await request(app).get("/time").query({ timezone: "5" });
    expect(res.status).toBe(200);
    expect(res.body.adjustedTime).toBeDefined();
  });

  it("should return an error for an invalid timezone offset", async () => {
    const res = await request(app).get("/time").query({ timezone: "invalid" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid timezone offset");
  });
});
