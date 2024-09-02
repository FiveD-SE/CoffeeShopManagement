import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomChooseButton from "../../components/Admin/Button/CustomChooseButton";

describe("CustomChooseButton", () => {
    const onPressMock = jest.fn();
    const title = "Test Button";

    test("renders correctly with given title", () => {
        const { getByText } = render(
            <CustomChooseButton onPress={onPressMock} title={title} />
        );
        expect(getByText(title)).toBeTruthy();
    });

    test("calls onPress when button is pressed", () => {
        const { getByTestId } = render(
            <CustomChooseButton onPress={onPressMock} title={title} />
        );
        fireEvent.press(getByTestId("customChooseButton"));
        expect(onPressMock).toHaveBeenCalled();
    });

    test("renders arrow icon correctly", () => {
        const { getByTestId } = render(
            <CustomChooseButton onPress={onPressMock} title={title} />
        );
        expect(getByTestId("arrowIcon")).toBeTruthy();
    });
});
