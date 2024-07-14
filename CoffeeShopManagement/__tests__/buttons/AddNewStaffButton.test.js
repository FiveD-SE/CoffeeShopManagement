import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddNewStaffButton from "../../components/Admin/Button/AddNewStaffButton";

describe("AddNewStaffButton", () => {
    const onPressMock = jest.fn();

    test("renders correctly", () => {
        const { getByText, getByTestId } = render(
            <AddNewStaffButton onPress={onPressMock} />
        );

        expect(getByText("Thêm nhân viên mới")).toBeTruthy();
        expect(getByTestId("addStaffButton")).toBeTruthy();
    });

    test("calls onPress when button is pressed", () => {
        const { getByTestId } = render(
            <AddNewStaffButton onPress={onPressMock} />
        );

        fireEvent.press(getByTestId("addStaffButton"));
        expect(onPressMock).toHaveBeenCalled();
    });
});
