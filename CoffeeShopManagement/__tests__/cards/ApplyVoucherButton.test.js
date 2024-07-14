import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ApplyVoucherButton from "../../components/Client/Button/ApplyVoucherButton";

describe("ApplyVoucherButton", () => {
    const onPressMock = jest.fn();

    test("renders correctly", () => {
        const { getByTestId } = render(
            <ApplyVoucherButton onPress={onPressMock} />
        );

        const button = getByTestId("applyVoucherButton");
        const icon = getByTestId("voucherIcon");

        expect(button).toBeTruthy();
        expect(icon).toBeTruthy();
    });

    test("calls onPress when button is pressed", () => {
        const { getByTestId } = render(
            <ApplyVoucherButton onPress={onPressMock} />
        );

        const button = getByTestId("applyVoucherButton");
        fireEvent.press(button);
        expect(onPressMock).toHaveBeenCalled();
    });
});
