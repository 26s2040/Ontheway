import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import Counter from "./Counter";

describe("Counter Component", () => {
  it("displays the correct initial count", () => {
    render(<Counter initialCount={5} />);
    const countElement = screen.getByTestId("count");
    expect(countElement).toHaveTextContent(5);
  });

  it("increments the count when increment button is clicked", () => {
    render(<Counter initialCount={5} />);
    const incrementButton = screen.getByTestId("increment");
    const countElement = screen.getByTestId("count");
    fireEvent.click(incrementButton);
    expect(countElement).toHaveTextContent(6);
  });

  it("decrements the count when decrement button is clicked", () => {
    render(<Counter initialCount={5} />);
    const decrementButton = screen.getByTestId("decrement");
    const countElement = screen.getByTestId("count");
    fireEvent.click(decrementButton);
    expect(countElement).toHaveTextContent(4);
  });

  it("resets the count to 0 when reset button is clicked", () => {
    render(<Counter initialCount={5} />);
    const restartButton = screen.getByTestId("restart");
    const countElement = screen.getByTestId("count");
    fireEvent.click(restartButton);
    expect(countElement).toHaveTextContent(0);
  });

  it("switches the sign of the count when switch sign button is clicked", () => {
    render(<Counter initialCount={5} />);
    const switchSignButton = screen.getByTestId("switchsign");
    const countElement = screen.getByTestId("count");
    fireEvent.click(switchSignButton);
    expect(countElement).toHaveTextContent("-5");
  });
});
