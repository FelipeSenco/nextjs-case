import Home from "../app/page";
import { render, screen } from "@testing-library/react";

describe("Home component", () => {
  test("Have the welcome text message", () => {
    render(<Home />);

    const welcomeMessage = screen.getByTestId("welcome-message");

    expect(welcomeMessage).toBeDefined();
  });
});
