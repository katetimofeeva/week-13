import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import Blog from "../pages/blog/index";

// Mock useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockPush = jest.fn();

const mockBlog = [
  {
    id: 1,
    title: "Understanding JavaScript Closures",
    author: "1",
    date: "2023-09-10",
    content:
      "Closures are a fundamental concept in JavaScript. They allow a function to access variables from an outer function even after the outer function has returned. This makes closures an important tool for managing scope and state in JavaScript applications.",
    tags: ["JavaScript", "Closures", "Functions"],
  },
  {
    id: 2,
    title: "Introduction to Next.js",
    author: "2",
    date: "2023-08-15",
    content:
      "Next.js is a popular React framework that enables server-side rendering and static site generation. It simplifies the process of building React applications by providing an easy-to-use structure and tooling for building scalable web applications.",
    tags: ["Next.js", "React", "SSR"],
  },
];

describe("render Blog page", () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      push: mockPush,
    }));
  });

  it("render a heading", () => {
    render(<Blog />);
    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Blog");
  });

  it("render list of articles in blog with data", () => {
    render(<Blog blogs={mockBlog} />);
    mockBlog.forEach(({ title, author, date, content }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(content)).toBeInTheDocument();
      expect(screen.getByText(date)).toBeInTheDocument();
    });
  });
  it("don't render list of articles in blog without data", () => {
    render(<Blog blogs={[]} />);

    const heading = screen.getByText(/we do not have any articles/i);
    expect(heading).toBeInTheDocument();
  });

  it("navigates to the correct page on click", async () => {
    render(
      <Blog
        blogs={[
          {
            id: 2,
            title: "Introduction to Next.js",
            author: "2",
            date: "2023-08-15",
            content:
              "Next.js is a popular React framework that enables server-side rendering and static site generation. It simplifies the process of building React applications by providing an easy-to-use structure and tooling for building scalable web applications.",
            tags: ["Next.js", "React", "SSR"],
          },
        ]}
      />
    );

    const link = screen.getByRole("link", { name: /more/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", `/blog/2`);
  });
});
