import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

const mockPeople = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Doe" },
];
describe("Home", () => {
  it("renders a heading", () => {
    render(<Home people={mockPeople} />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/List of people/i);
  });

  it("render list of people when data is provided", () => {
    render(<Home people={mockPeople} />);

    mockPeople.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it("don't render list of people without data", () => {
    render(<Home people={[]} />);

    const heading = screen.getByText(/you do not have any people/i);
    expect(heading).toBeInTheDocument();
  });
});
