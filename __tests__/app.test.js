const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const {
  topicData,
  userData,
  articleData,
  commentData,
} = require("../db/data/test-data/index");

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
        expect(error.msg).toBe("path not found");
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: responds with all comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const articleComments = body.articleComments;
        expect(articleComments).toHaveLength(11);
        expect(articleComments).toBeSortedBy("created_at");
      });
  });

  test("404: responds with appropriate error when non existant article_id given", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then(({ body }) => {
        const error = body.msg;
        expect(error).toBe("not found");
      });
  });

  test("400: responds with error when given an invalid article_id", () => {
    return request(app)
      .get("/api/articles/not_an_id/comments")
      .expect(400)
      .then(({ body }) => {
        const err = body.msg;
        expect(err).toBe("bad request");
      });
  });

  test("404: responds with appropriate error when given a valid article_id when there are no comments for the article.", () => {
    return request(app)
      .get("/api/articles/13/comments")
      .expect(404)
      .then(({ body }) => {
        const err = body.msg;
        expect(err).toBe("not found");
      });
  });
});
