const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig");
const commentsHelper = require("../comments/commentsModel");

describe("Comments", () => {
  beforeEach(async () => {
    await db("comments").truncate();
  });

  describe("GET Comments", () => {
    it("should add 2 comments", async () => {
      let activity_id = 3;
      await commentsHelper.addComment({
        user_id: 3,
        comment: "test comment",
        activity_id: 3
      });
      await commentsHelper.addComment({
        user_id: 3,
        comment: "test comment2",
        activity_id: 3
      });

      const test = await commentsHelper.getComments(activity_id);
      expect(test).toHaveLength(2);
    });

    it("should have 0 comments because wrong activity id", async () => {
      activity_id = 1;
      await commentsHelper.addComment({
        user_id: 3,
        comment: "test comment",
        activity_id: 3
      });
      await commentsHelper.addComment({
        user_id: 3,
        comment: "test comment2",
        activity_id: 3
      });

      const test = await commentsHelper.getComments(activity_id);
      expect(test).toHaveLength(0);
    });
  });

  describe("POST Comment", () => {
    it("should return 204", async () => {
      let comment = {
        user_id: 3
      };

      request(server)
        .post("/:id")
        .send(comment)
        .expect(204);
    });

    it("should return 201", async () => {
      let comment = {
        user_id: 3,
        comment: "test comment",
        activity_id: 3
      };

      request(server)
        .post("/:id")
        .send(comment)
        .expect(201);
    });
  });

  describe("PUT Comment", () => {
    it("should return 201", async () => {
      let comment = {
        id: 1,
        comment: "test update comment"
      };

      await commentsHelper.addComment({
        user_id: 3,
        comment: "test comment",
        activity_id: 3
      });

      request(server)
        .put("/")
        .send(comment)
        .expect(201);
    });

    it("should return 204", async () => {
      let comment = {
        comment: "test update comment"
      };

      await commentsHelper.addComment({
        user_id: 3,
        comment: "test comment",
        activity_id: 3
      });

      request(server)
        .put("/")
        .send(comment)
        .expect(204);
    });
  });

  describe("DELETE Comment", () => {
    it("Should have 1 comment left", async () => {
      comment_id = 1;
      activity_id = 3;
      await commentsHelper.addComment({
        user_id: 3,
        comment: "test comment",
        activity_id: 3
      });
      await commentsHelper.addComment({
        user_id: 3,
        comment: "test comment",
        activity_id: 3
      });

      const res = await commentsHelper.deleteComment(comment_id);
      const test = await commentsHelper.getComments(activity_id);
      expect(test).toHaveLength(1);
    });

    it("Should return 2nd comment", async () => {
      deleted_comment_id = 1;
      comment_id = 2;
      activity_id = 3;
      await commentsHelper.addComment({
        user_id: 3,
        comment: "test comment",
        activity_id: 3
      });
      await commentsHelper.addComment({
        user_id: 3,
        comment: "test comment 2",
        activity_id: 3
      });

      const res = await commentsHelper.deleteComment(deleted_comment_id);
      const test = await db("comments")
        .where({ id: comment_id })
        .first();
      expect(test.comment).toEqual("test comment 2");
    });
  });
});
