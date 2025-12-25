import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  type RenderOptions,
  render as rtlRender,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ReactElement, ReactNode } from "react";

export * from "@testing-library/react";
export { userEvent };

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

interface ExtendedRenderOptions extends Omit<RenderOptions, "wrapper"> {
  queryClient?: QueryClient;
  locale?: string;
  withQueryClient?: boolean;
}

export function render(
  ui: ReactElement,
  {
    queryClient,
    locale = "en",
    withQueryClient = true,
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  if (i18n.locale !== locale) {
    i18n.load(locale, {});
    i18n.activate(locale);
  }

  function Wrapper({ children }: { children: ReactNode }) {
    const client = queryClient ?? createTestQueryClient();

    let content = <I18nProvider i18n={i18n}>{children}</I18nProvider>;

    if (withQueryClient) {
      content = (
        <QueryClientProvider client={client}>{content}</QueryClientProvider>
      );
    }

    return content;
  }

  return {
    user: userEvent.setup(),
    ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
