const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");
const actualEndPoints = require("../endpoints.json");
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

  test("400 responds with error when invalid article_id given", () => {
    const newComment = {
      body: "superDuperist comment of all time",
      author: "icellusedkars",
    };
    return request(app)
      .post("/api/articles/nonesense/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
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
});

describe("GET /api", () => {
  test("200: returns an object with describptions of all available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        const endpoints = response.body;
        expect(endpoints).toEqual(actualEndPoints);
      });
  });
});

describe("GET /api/articles", () => {
  test("200: responds with an array of all articles in order of date descending", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.allArticles).toHaveLength(13);
        expect(body.allArticles).toBeSortedBy("created_at");
        body.allArticles.forEach((article) => {
          expect(article).toMatchObject({
            author: expect.any(String),
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            article_img_url: expect.any(String),
            comment_count: expect.any(String),
          });
        });
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: responds with an article object, which should have all relevant properties", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const article = body.article;
        expect(article).toMatchObject({
          author: expect.any(String),
          title: expect.any(String),
          article_id: 1,
          body: expect.any(String),
          topic: expect.any(String),
          created_at: expect.any(String),
          votes: expect.any(Number),
          article_img_url: expect.any(String),
        });
      });
  });

  test("400: responds with an error when invalid article_id given", () => {
    return request(app)
      .get("/api/articles/potato")
      .expect(400)
      .then((response) => {
        const error = response.body.msg;
        expect(error).toBe("bad request");
      });
  });

  test("404: responds with an error when a non-existant article_id given", () => {
    return request(app)
      .get("/api/articles/898989")
      .expect(404)
      .then((response) => {
        const error = response.body.msg;
        expect(error).toBe("not found");
      });
  });
});

describe("PATCH /api/articles/:article_id", () => {
  test("200: adds the amount of votes in the given votes object to the total votes of given article_id", () => {
    const newVotes = { inc_votes: 2 };
    return request(app)
      .patch("/api/articles/1")
      .expect(200)
      .send(newVotes)
      .then(({ body }) => {
        const updatedRecord = body.updatedRecord;
        expect(updatedRecord).toHaveLength(1);
        expect(updatedRecord[0].votes).toBe(102);
        expect(updatedRecord[0].article_id).toBe(1);
      });
  });

  test("400: responds with error when given an object with the wrong fields", () => {
    const newVotes = { potatoes: 2 };
    return request(app)
      .patch("/api/articles/1")
      .expect(400)
      .send(newVotes)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  test("400: responds with error when given an invalid article_id", () => {
    const newVotes = { inc_votes: 2 };
    return request(app)
      .patch("/api/articles/not_an_id")
      .expect(400)
      .send(newVotes)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  test("404: responds with error when given a non existant article_id", () => {
    const newVotes = { inc_votes: 2 };
    return request(app)
      .patch("/api/articles/9998")
      .expect(404)
      .send(newVotes)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });

  test("400: responds with error if votes to be added is a negative value, dissallowing vote reduction", () => {
    const newVotes = { inc_votes: -2 };
    return request(app)
      .patch("/api/articles/1")
      .expect(400)
      .send(newVotes)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});

describe("GET /api/users", () => {
  test("200: responds with array of objects with required fields", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { allUsers } = body;
        expect(allUsers).toHaveLength(4);
        allUsers.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("204: responds with appropriate message when given an article_id to delete", () => {
    return request(app).delete("/api/comments/2").expect(204);
  });

  test("404: responds with appropriate error message when given a non existant article_id to delete", () => {
    return request(app)
      .delete("/api/comments/4000")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });

  test("400: responds with appropriate error message when given an invalid article_id", () => {
    return request(app)
      .delete("/api/comments/onion")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });
});

describe("GET /api/articles/:article_id (comment_count)", () => {
  test("200: responds with object with a count of the total of the articles with the requested article_id", () => {
    return request(app)
      .get("/api/articles/1?query=comment_count")
      .expect(200)
      .then(({ body }) => {
        const { resultCount } = body;
        expect(resultCount[0]).toMatchObject({
          count: "11",
        });
      });
  });

  test("400: responds with error when given invalid article_id", () => {
    return request(app)
      .get("/api/articles/not_an_id?query=comment_count")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("bad request");
      });
  });

  test("404: responds with error when given a non existant article_id", () => {
    return request(app)
      .get("/api/articles/9999?query=comment_count")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
