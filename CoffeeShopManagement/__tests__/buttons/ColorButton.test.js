import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ColorButton from "../../components/Admin/Button/ColorButton";

describe("ColorButton", () => {
    const onPressMock = jest.fn();

    test("renders correctly with given props", () => {
        const { getByText, getByTestId } = render(
            <ColorButton
                color="blue"
                text="Click Me"
                textColor="#fff"
                onPress={onPressMock}
            />
        );

        const button = getByTestId("colorButton");
        const buttonText = getByText("Click Me");

        expect(button).toBeTruthy();
        expect(buttonText).toBeTruthy();

        expect(button.props.style.backgroundColor).toBe("blue");
    });

    test("calls onPress when button is pressed", () => {
        const { getByTestId } = render(
            <ColorButton
                color="blue"
                text="Click Me"
                textColor="#fff"
                onPress={onPressMock}
            />
        );

        const button = getByTestId("colorButton");
        fireEvent.press(button);
        expect(onPressMock).toHaveBeenCalled();
    });
});
