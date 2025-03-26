import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useState } from "react";
import axios from "axios";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [
  // { rel: "stylesheet", href: "/dist/styles.css" },
  {
    rel: "preconnect",
    href: "https://fonts.googleapis.com"
  },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const styles = {
  classic: "🎩 Вишуканий та літературний стиль.",
  modern: "💬 Сучасний розмовний стиль.",
  humor: "😄 Жартівливий стиль.",
  poetic: "🌸 Поетичний та образний стиль.",
  academic: "📚 Науковий та аналітичний стиль."
};
function meta({}) {
  return [{
    title: "New React Router App"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = withComponentProps(function Home() {
  const [message, setMessage] = useState("");
  const [style, setStyle] = useState("academic");
  const [reply, setReply] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/chat`, {
        message,
        style
      });
      setReply(response.data.reply);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };
  return /* @__PURE__ */ jsxs("div", {
    className: "p-4 space-y-4",
    children: [/* @__PURE__ */ jsx("h1", {
      className: "text-3xl font-bold text-center",
      children: "Запит до квантової механіки"
    }), /* @__PURE__ */ jsxs("form", {
      onSubmit: handleSubmit,
      className: "flex flex-col items-center space-y-4",
      children: [/* @__PURE__ */ jsx("textarea", {
        placeholder: "Введіть ваше питання",
        value: message,
        onChange: (e) => setMessage(e.target.value),
        className: "w-1/2 p-3 border rounded-md"
      }), /* @__PURE__ */ jsxs("div", {
        className: "w-1/2",
        children: [/* @__PURE__ */ jsx("label", {
          className: "text-lg font-semibold",
          children: "Оберіть стиль відповіді"
        }), /* @__PURE__ */ jsx("select", {
          value: style,
          onChange: (e) => setStyle(e.target.value),
          className: "w-full p-2 mt-2 border rounded-md",
          children: Object.keys(styles).map((key) => /* @__PURE__ */ jsx("option", {
            value: key,
            children: styles[key]
          }, key))
        })]
      }), /* @__PURE__ */ jsx("button", {
        type: "submit",
        className: "p-2 bg-blue-500 text-white rounded-md",
        children: "Відправити"
      })]
    }), reply && /* @__PURE__ */ jsxs("div", {
      className: "mt-4 p-4 bg-gray-100 border rounded-md",
      children: [/* @__PURE__ */ jsx("h2", {
        className: "text-xl font-semibold",
        children: "Відповідь:"
      }), /* @__PURE__ */ jsx("div", {
        className: "overflow-auto max-h-60",
        children: /* @__PURE__ */ jsx("p", {
          children: reply
        })
      })]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/gemini/assets/entry.client-Ks5PdKEw.js", "imports": ["/gemini/assets/chunk-GNGMS2XR-Dos2DHKy.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/gemini/assets/root-DJ2yfi4W.js", "imports": ["/gemini/assets/chunk-GNGMS2XR-Dos2DHKy.js", "/gemini/assets/with-props-CmJzUyz8.js"], "css": ["/gemini/assets/root-a1nsgSSd.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/gemini/assets/home-CFShvYOJ.js", "imports": ["/gemini/assets/with-props-CmJzUyz8.js", "/gemini/assets/chunk-GNGMS2XR-Dos2DHKy.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/gemini/assets/manifest-8d8f6b2e.js", "version": "8d8f6b2e" };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const publicPath = "/gemini/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routes,
  ssr
};
