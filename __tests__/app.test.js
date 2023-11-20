const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const {
  topicData,
  userData,
  articleData,
  commentData,
} = require("../db/data/development-data/index");

beforeEach(() => seed({ topicData, userData, articleData, commentData }));
afterAll(() => db.end());

describe("GET /api/topics", () => {
  test("200: returns all topics", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then((response) => {
        const allTopics = response.body;
        expect(allTopics).toHaveLength(3);
        allTopics.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
  test("404: returns error when wrong path entered", () => {
    return request(app)
      .get("/api/tropics")
      .expect(404)
      .then((response) => {
        const error = response.body;
        expect(error.msg).toBe("path not found")
    });
  });
});
