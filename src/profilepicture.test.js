import React from "react";
import ProfilePicture from "./profilepicture";
import { render } from "@testing-library/react";

test("renders img with src set to url prop", () => {
    const { container } = render(<ProfilePicture url="/funkychicken.gif" />);
    console.log(container.querySelector("img").getAttribute("src"));

    expect(container.querySelector("img").getAttribute("src")).toBe(true);

test("renders img with src to default.jpg when no url prop is present", () => {
    const { container } = render(<ProfilePicture />);

    expect(container.querySelector("img").getAttribute("src")).toBe("/default.jpg");

test("renders first and last props in alt attribute", () => {
    const { container } = render(<ProfilePicture first="Funky" last="Chicken" />);

    expect(container.querySelector("img").getAttribute("alt")).toBe("Funky Chicken");
});

test('onClick prop gets called when img is clicked', () => {
    const onClick = jest.fn();
    const {container} = render (<ProfilePicture onClick={onClick} />);

    fireEvent.click(
        container.querySelector('img')
    );

    fireEvent.click(
        container.querySelector('img')
    );

    expect(
        onClick.mock.calls.length
    ).toBe(1);
});
