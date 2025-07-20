// App.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

test("renders LandingPage via Heropage content", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );

  const heading = screen.getByText(/we will deliver your/i);
  expect(heading).toBeInTheDocument();
});
