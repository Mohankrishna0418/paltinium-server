import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";
import { createSecureRoute } from "../middleware/session-middleware";
import { prismaClient } from "../../integrations/prisma";

export const postsRoute = createSecureRoute();

postsRoute.post(
  "",
  zValidator(
    "json",
    z.object({ text: z.string().min(1, "only non-empty strings are allowed") })
  ),
  async (c) => {
    const { text } = c.req.valid("json");
    const user = c.get("user");

    const post = await prismaClient.post.create({
      data: {
        text,
        authorId: user.id,
      },
      include: {
        author: true,
    },
    });
    return c.json(post, 201);
  }
);

postsRoute.get("/:postId", async (c) => {
  const { postId } = c.req.param();
  const post = await prismaClient.post.findUnique({
    where: {
      id: postId,
    },
    include: {
        author: true,
    },
  });
  if (!post) {
    throw new HTTPException(404);
  }
  return c.json(post, 200);
});
