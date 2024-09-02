import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";
import AddNewItemButton from "../../components/Admin/Button/AddNewItemButton";

jest.mock("@react-navigation/native");

describe("AddNewItemButton", () => {
    const navigation = {
        navigate: jest.fn(),
    };

    beforeEach(() => {
        useNavigation.mockReturnValue(navigation);
    });

    test("renders correctly", () => {
        const { getByText, getByTestId } = render(<AddNewItemButton />);

        expect(getByText("Thêm sản phẩm mới")).toBeTruthy();
        expect(getByTestId("addIcon")).toBeTruthy();
    });

    test("navigates to AdminAddItem screen on button press", () => {
        const { getByText } = render(<AddNewItemButton />);

        fireEvent.press(getByText("Thêm sản phẩm mới"));
        expect(navigation.navigate).toHaveBeenCalledWith("AdminAddItem");
    });
});
