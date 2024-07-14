import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";
import AddItemButton from "../../components/Admin/Button/AddItemButton";

jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
}));

describe("AddItemButton", () => {
    it("renders correctly", () => {
        const { getByTestId } = render(<AddItemButton />);
        expect(getByTestId("add-button")).toBeTruthy();
    });

    it("navigates to AdminAddItem screen when pressed", () => {
        const mockNavigate = jest.fn();
        useNavigation.mockReturnValue({ navigate: mockNavigate });

        const { getByTestId } = render(<AddItemButton />);
        fireEvent.press(getByTestId("add-button"));

        expect(mockNavigate).toHaveBeenCalledWith("AdminAddItem");
    });
});
