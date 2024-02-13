import { Hono, HonoRequest } from "https://deno.land/x/hono@v3.5.5/mod.ts";
import { html } from "https://deno.land/x/hono@v3.5.5/helper.ts";
import {
  cors,
  Fragment,
  logger,
  serveStatic,
} from "https://deno.land/x/hono@v3.5.5/middleware.ts";

// // @deno-types="npm:@types/svgdom"
// import { createSVGWindow } from "https://esm.sh/svgdom";

// import search from "./search.tsx";
// // import nodered from "./rednode.tsx";
// import content from "./svg.tsx";
// declare global {
//   interface Window {
//     var DOMParser: typeof DOMParser;
//   }
// };
// const window = createSVGWindow();
// const document = window.document;

// const conn = Deno.listen({ port: 8000 });
// const httpConn = Deno.serveHttp(await conn.accept());
// const e = await httpConn.nextRequest();
// if (e) {
//   const { socket, response } = Deno.upgradeWebSocket(e.request);
//   socket.onopen = () => {
//     socket.send("Hello World!");
//   };
//   socket.onmessage = (e) => {
//     console.log(e.data);
//     socket.close();
//   };
//   socket.onclose = () => console.log("WebSocket has been closed.");
//   socket.onerror = (e) => console.error("WebSocket error:", e);
//   e.respondWith(response);
// }

const app = new Hono();

type WS = {
  socket: WebSocket;
  response: Response;
};

let day: WS;
let night: WS;
let domes: WS;
let outside: WS;
let ads: WS;
// app.use("/static/*", serveStatic({ root: "./" }));
// app.use("/public/*", serveStatic({ root: "./" }));
// app.use("/css/*", serveStatic({ root: "./" }));

// app.route("/red", nodered);
// app.route("/search", search);
// app.route("/svg", content);

app.get("/", serveStatic({ root: "./src/" }));
app.get("/left", (c, next) => {
  const data = day.response.body;
  console.log(data);
  if (day) {
  }
  return c.html(`<div hx-trigger="load" id="-1.6"
            class="w3-card-4 w3-padding w3-margin">
                <button class="w3-button w3-gray" hx-trigger="click" hx-post="/switch?target=-1.6">-1.6</button>
    </div>
    <div hx-trigger="load" id="1.6"
            class="w3-card-4 w3-padding w3-margin">
                <button class="w3-button w3-gray" hx-trigger="click" hx-post="/switch?target=1.6">1.6</button>
    </div>
    <div hx-trigger="load" id="2.6"
            class="w3-card-4 w3-padding w3-margin">
                <button class="w3-button w3-gray" hx-trigger="click" hx-post="/switch?target=2.6">2.6</button>
    </div>
    <div hx-trigger="load" id="1.5"
            class="w3-card-4 w3-padding w3-margin">
                <button class="w3-button w3-gray" hx-trigger="click" hx-post="/switch?target=1.5">1.5</button>
    </div>
    <div hx-trigger="load" id="2.5"
            class="w3-card-4 w3-padding w3-margin">
                <button class="w3-button w3-gray" hx-trigger="click" hx-post="/switch?target=2.5">2.5</button>
    </div>
    <div hx-trigger="load" id="ТП-4"
            class="w3-card-4 w3-padding w3-margin">
                <button class="w3-button w3-gray" hx-trigger="click" hx-post="/switch?target=ТП-4">ТП-4</button>
    </div>
  `);
});
// app.use("/switch", (c, next) => {
//   const target = c.req.query("target");
//   if (!target) {
//     return next();
//   }
//   const message = c.req.query("message") | "toggle";
//   if (ws.socket) {
//     ws.socket.send(JSON.stringify({ payload: message, target: target }));
//   }
//   return next();
// });
// app.use("/ws", async (c,n)=>{
//         ws = Deno.upgradeWebSocket(c.req.raw);
//         ws.socket.onopen = () => {
//             ws.socket.send(JSON.stringify({payload:  c.req.query("m"),target: c.req.query("t")}));
//         };
//         ws.socket.onmessage = (e) => {
//             console.log(e.data);
//             // socket.close();
//         };
//         ws.socket.onclose = () => console.log("WebSocket has been closed.");
//         ws.socket.onerror = (e) => console.error("WebSocket error:", e);
//         return ws.response;
// });
app.use("/ws/rooms/day", async (c, n) => {
  day = Deno.upgradeWebSocket(c.req.raw);
  day.socket.onopen = () => {
    day.socket.send(
      JSON.stringify({
        payload: c.req.query("message"),
        target: c.req.query("target"),
      }),
    );
  };
  day.socket.onmessage = (e) => {
    // console.log(e.data);
    // socket.close();
  };
  day.socket.onclose = () => console.log("WebSocket has been closed.");
  day.socket.onerror = (e) => console.error("WebSocket error:", e);
  return day.response;
});

app.use("/ws/rooms/night", async (c, n) => {
  night = Deno.upgradeWebSocket(c.req.raw);
  night.socket.onopen = () => {
    night.socket.send(
      JSON.stringify({
        payload: c.req.query("message"),
        target: c.req.query("target"),
      }),
    );
  };
  night.socket.onmessage = (e) => {
    // console.log(e.data);
    // socket.close();
  };
  night.socket.onclose = () => console.log("WebSocket has been closed.");
  night.socket.onerror = (e) => console.error("WebSocket error:", e);
  return night.response;
});

app.use("/ws/dome", async (c, n) => {
  domes = Deno.upgradeWebSocket(c.req.raw);
  domes.socket.onopen = () => {
    domes.socket.send(
      JSON.stringify({
        payload: c.req.query("message"),
        target: c.req.query("target"),
      }),
    );
  };
  domes.socket.onmessage = (e) => {
    // console.log(e.data);
    // socket.close();
  };
  domes.socket.onclose = () => console.log("WebSocket has been closed.");
  domes.socket.onerror = (e) => console.error("WebSocket error:", e);
  return domes.response;
});

app.use("/ws/outside/ads", async (c, n) => {
  ads = Deno.upgradeWebSocket(c.req.raw);
  ads.socket.onopen = () => {
    ads.socket.send(
      JSON.stringify({
        payload: c.req.query("message") || "sync",
        target: c.req.query("target"),
      }),
    );
  };
  ads.socket.onmessage = (e) => {
    // console.log(e.data);
    // socket.close();
  };
  ads.socket.onclose = () => console.log("WebSocket has been closed.");
  ads.socket.onerror = (e) => console.error("WebSocket error:", e);
  return ads.response;
});
app.use("/ws/outside", async (c, n) => {
  outside = Deno.upgradeWebSocket(c.req.raw);
  outside.socket.onopen = () => {
    outside.socket.send(
      JSON.stringify({
        payload: c.req.query("message"),
        target: c.req.query("target"),
      }),
    );
  };
  outside.socket.onmessage = (e) => {
    // console.log(e.data);
    // socket.close();
  };
  outside.socket.onclose = () => console.log("WebSocket has been closed.");
  outside.socket.onerror = (e) => console.error("WebSocket error:", e);
  return outside.response;
});
// app.get("/content", serveStatic({ path: "./static/walls.svg" }));

// app.get("/left", serveStatic({ path: "./static/leftbar.html" }));
// app.post("/right", serveStatic({ path: "./static/rightbar.html" }));
// serveStatic({ path: "./static/rightbar.html" });

app.use("*", logger());
app.showRoutes();
app.onError((e, c) => {
  console.error(e);
  // app.get("*", serveStatic({ path: "./static/404.html" }));
  return c.html(
    `<div hx-target="this" class="w3-center w3-card-4 w3-red"><h1>${e}</h1></div>`,
    400,
  );
});

Deno.serve(app.fetch);
