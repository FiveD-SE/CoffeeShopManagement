import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ChooseDeliveryButton from "../../components/Client/Button/ChooseDeliveryButton";

describe("ChooseDeliveryButton", () => {
    const onPressMock = jest.fn();
    const title = "Delivery Option";

    test("renders correctly with given title", () => {
        const { getByTestId } = render(
            <ChooseDeliveryButton title={title} onPress={onPressMock} />
        );

        const titleText = getByTestId("titleText");
        const buttonText = getByTestId("buttonText");
        const chooseButton = getByTestId("chooseButton");

        expect(titleText).toBeTruthy();
        expect(buttonText).toBeTruthy();
        expect(chooseButton).toBeTruthy();
        expect(titleText.props.children).toBe(title);
        expect(buttonText.props.children).toBe("Chọn");
    });

    test("calls onPress when button is pressed", () => {
        const { getByTestId } = render(
            <ChooseDeliveryButton title={title} onPress={onPressMock} />
        );

        const chooseButton = getByTestId("chooseButton");
        fireEvent.press(chooseButton);
        expect(onPressMock).toHaveBeenCalled();
    });
});
