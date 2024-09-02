import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ShiftListButton from "../../components/Admin/Button/ShiftListButton";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

jest.mock("@react-navigation/native");

describe("ShiftListButton", () => {
    const navigation = {
        navigate: jest.fn(),
    };

    beforeEach(() => {
        useNavigation.mockReturnValue(navigation);
    });

    test("renders correctly", () => {
        const { getByTestId, getByText } = render(<ShiftListButton />);
        const button = getByTestId("shiftListButton");
        const buttonText = getByText("Danh sách ca làm");

        expect(button).toBeTruthy();
        expect(buttonText).toBeTruthy();

        const icon = button.findByType(FontAwesome5);
        expect(icon).toBeTruthy();
    });

    test("calls navigation when button is pressed", () => {
        const { getByTestId } = render(<ShiftListButton />);
        const button = getByTestId("shiftListButton");
        fireEvent.press(button);
        expect(navigation.navigate).toHaveBeenCalledWith("AddShift");
    });
});
