import { createServer } from "vite";
import {
  defineLazyEventHandler,
  defineEventHandler,
  fromNodeMiddleware,
} from "h3";

export default defineLazyEventHandler(async () => {
  if (!import.meta.dev)
    return defineEventHandler(
      fromNodeMiddleware((_, __, next) => {
        return next();
      })
    );

  const viteDevServer = await createServer({
    server: { middlewareMode: true },
  });
  return defineEventHandler(fromNodeMiddleware(viteDevServer.middlewares));
});
