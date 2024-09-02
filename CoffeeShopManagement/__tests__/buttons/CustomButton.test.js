import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CustomButton from "../../components/Client/Button/CustomButton";
import { Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

jest.mock("@expo/vector-icons", () => ({
    Ionicons: "Ionicons",
}));

describe("CustomButton", () => {
    const mockOnPress = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders correctly with text", () => {
        const { getByTestId } = render(
            <CustomButton text="Test Button" onPress={mockOnPress} />
        );
        const buttonText = getByTestId("custom-button-text");
        expect(buttonText).toBeTruthy();
        expect(buttonText.props.children).toBe("Test Button");
    });

    test("renders correctly with arrow icon", () => {
        const { getByTestId } = render(
            <CustomButton
                text="Test Button"
                onPress={mockOnPress}
                arrow={true}
            />
        );
        const arrowIcon = getByTestId("custom-button-arrow-icon");
        expect(arrowIcon).toBeTruthy();
    });

    test("does not render arrow icon when arrow prop is false", () => {
        const { queryByTestId } = render(
            <CustomButton
                text="Test Button"
                onPress={mockOnPress}
                arrow={false}
            />
        );
        const arrowIcon = queryByTestId("custom-button-arrow-icon");
        expect(arrowIcon).toBeNull();
    });

    test("calls onPress when button is pressed", () => {
        const { getByTestId } = render(
            <CustomButton text="Test Button" onPress={mockOnPress} />
        );
        const button = getByTestId("custom-button-pressable");
        fireEvent.press(button);
        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });

    test("animates on press in and press out", () => {
        const animatedSpy = jest.spyOn(Animated, "spring");
        const { getByTestId } = render(
            <CustomButton text="Test Button" onPress={mockOnPress} />
        );
        const button = getByTestId("custom-button-pressable");

        fireEvent(button, "pressIn");
        expect(animatedSpy).toHaveBeenCalledWith(expect.any(Animated.Value), {
            toValue: 0.95,
            useNativeDriver: true,
        });

        fireEvent(button, "pressOut");
        expect(animatedSpy).toHaveBeenCalledWith(expect.any(Animated.Value), {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        });
    });
});
