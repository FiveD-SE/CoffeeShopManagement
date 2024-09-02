import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddNewShiftButton from "../../components/Admin/Button/AddNewShiftButton";

describe("AddNewShiftButton", () => {
    const onPressMock = jest.fn();

    test("renders correctly", () => {
        const { getByText, getByTestId } = render(
            <AddNewShiftButton onPress={onPressMock} />
        );

        expect(getByText("Thêm ca làm việc mới")).toBeTruthy();
        expect(getByTestId("shiftIcon")).toBeTruthy();
    });

    test("calls onPress when button is pressed", () => {
        const { getByText } = render(
            <AddNewShiftButton onPress={onPressMock} />
        );

        fireEvent.press(getByText("Thêm ca làm việc mới"));
        expect(onPressMock).toHaveBeenCalled();
    });
});
