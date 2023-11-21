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

describe("POST /api/articles/:article_id/comments", () => {
  test("201 adds a comment for an article.", () => {
    const newComment = {
      body: "superDuperist comment of all time",
      author: "icellusedkars",
    };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(201)
      .then(({ body }) => {
        body.addedComments.forEach((comment) =>
          expect(comment).toMatchObject({
            comment_id: 19,
            body: "superDuperist comment of all time",
            votes: 0,
            author: "icellusedkars",
            article_id: 2,
            created_at: expect.any(String),
          })
        );
      });
  });

  test("400 error when trying to add a comment for an article with non existant user/author.", () => {
    const newComment = {
      body: "superDuperist comment of all time",
      author: "chuckleBrother",
    };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  test("404 responds with error when attempting to add a comment for a non existant article_id.", () => {
    const newComment = {
      body: "superDuperist comment of all time",
      author: "icellusedkars",
    };
    return request(app)
      .post("/api/articles/999/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  test("400 responds with error when attempt to add a comment with insufficient keys in body.", () => {
    const newComment = {
      author: "icellusedkars",
    };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});
