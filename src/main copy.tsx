import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import * as TanStackQueryProvider from "./integrations/tanstack-query/root-provider.tsx";
import reportWebVitals from "./reportWebVitals.ts";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import "./styles.css";
import { dynamicActivate } from "./locales/i18n.ts";

const TanStackQueryProviderContext = TanStackQueryProvider.getContext();
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProviderContext,
    title: undefined,
    header: undefined,
    permissionRule: undefined,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 30 * 1000,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

dynamicActivate("en");

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <TanStackQueryProvider.Provider {...TanStackQueryProviderContext}>
        <RouterProvider router={router} />
      </TanStackQueryProvider.Provider>
    </StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
