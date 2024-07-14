import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BrownTextButton from "../../components/Client/Button/BrownTextButton";

describe("BrownTextButton", () => {
    const onPressMock = jest.fn();

    test("renders correctly", () => {
        const { getByTestId } = render(
            <BrownTextButton text="Click Me" onPress={onPressMock} />
        );

        const button = getByTestId("brownTextButton");

        expect(button).toBeTruthy();
    });

    test("calls onPress when button is pressed", () => {
        const { getByTestId } = render(
            <BrownTextButton text="Click Me" onPress={onPressMock} />
        );

        const button = getByTestId("brownTextButton");
        fireEvent.press(button);
        expect(onPressMock).toHaveBeenCalled();
    });
});
