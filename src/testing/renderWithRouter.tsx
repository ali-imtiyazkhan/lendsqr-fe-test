import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter, type MemoryRouterProps } from "react-router-dom";

type RouterOptions = {
  routerProps?: MemoryRouterProps;
};

export function renderWithRouter(
  ui: ReactElement,
  { routerProps, ...options }: RenderOptions & RouterOptions = {},
) {
  return render(<MemoryRouter {...routerProps}>{ui}</MemoryRouter>, options);
}
