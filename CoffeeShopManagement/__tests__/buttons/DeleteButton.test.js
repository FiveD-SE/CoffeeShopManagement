import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import DeleteButton from "../../components/Admin/Button/DeleteButton";
import { MaterialIcons } from "@expo/vector-icons";

describe("DeleteButton", () => {
    const onPressMock = jest.fn();

    test("renders correctly", () => {
        const { getByText, getByTestId } = render(
            <DeleteButton onPress={onPressMock} />
        );
        const button = getByTestId("deleteButton");
        const buttonText = getByText("Xóa");

        expect(button).toBeTruthy();
        expect(buttonText).toBeTruthy();

        expect(button.findByType(MaterialIcons)).toBeTruthy();
    });

    test("calls onPress when button is pressed", () => {
        const { getByTestId } = render(<DeleteButton onPress={onPressMock} />);
        const button = getByTestId("deleteButton");
        fireEvent.press(button);
        expect(onPressMock).toHaveBeenCalled();
    });
});
