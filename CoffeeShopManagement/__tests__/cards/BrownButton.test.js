import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BrownButton from "../../components/Client/Button/BrownButton";
import { Animated } from "react-native";

describe("BrownButton", () => {
    const onPressMock = jest.fn();

    beforeAll(() => {
        jest.useFakeTimers();
        Animated.spring = jest.fn(() => ({
            start: jest.fn((callback) => {
                if (callback) callback();
            }),
        }));
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    test("renders correctly", () => {
        const { getByTestId } = render(
            <BrownButton text="Click Me" onPress={onPressMock} />
        );

        const button = getByTestId("brownButton");
        const animatedView = getByTestId("animatedView");

        expect(button).toBeTruthy();
        expect(animatedView).toBeTruthy();
    });

    test("calls onPress when button is pressed", () => {
        const { getByTestId } = render(
            <BrownButton text="Click Me" onPress={onPressMock} />
        );

        const button = getByTestId("brownButton");
        fireEvent.press(button);
        expect(onPressMock).toHaveBeenCalled();
    });

    test("handles press in and press out animations", () => {
        const { getByTestId } = render(
            <BrownButton text="Click Me" onPress={onPressMock} />
        );

        const button = getByTestId("brownButton");
        const animatedView = getByTestId("animatedView");

        fireEvent(button, "onPressIn");
        jest.advanceTimersByTime(100);
        expect(Animated.spring).toHaveBeenCalledWith(
            expect.any(Object),
            expect.objectContaining({
                toValue: 0.95,
            })
        );

        fireEvent(button, "onPressOut");
        jest.advanceTimersByTime(100);
        expect(Animated.spring).toHaveBeenCalledWith(
            expect.any(Object),
            expect.objectContaining({
                toValue: 1,
            })
        );
    });
});
