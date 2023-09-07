/* eslint-disable react-refresh/only-export-components */
import { defineEventHandler, fromNodeMiddleware } from "h3";
import { renderPage } from "vite-plugin-ssr/server";

export default defineEventHandler(
  fromNodeMiddleware(async (req, res, next) => {
    const { httpResponse } = await renderPage({ urlOriginal: req.url! });

    if (!httpResponse) {
      return next();
    }

    const { body, statusCode, headers, earlyHints } = httpResponse;

    res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
    headers.forEach(([name, value]) => res.setHeader(name, value));


    res.statusCode = statusCode
    return body
    // For HTTP streams use httpResponse.pipe() instead, see https://vite-plugin-ssr.com/stream
  })
);
