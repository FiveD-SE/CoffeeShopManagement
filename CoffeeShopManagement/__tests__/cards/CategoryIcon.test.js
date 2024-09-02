import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CategoryIcon from "../../components/Client/Button/CategoryIcon";

describe("CategoryIcon", () => {
    const onPressMock = jest.fn();
    const iconSource = { uri: "https://example.com/icon.png" };
    const size = 50;
    const name = "Category Name";

    test("renders correctly", () => {
        const { getByTestId } = render(
            <CategoryIcon
                iconSource={iconSource}
                size={size}
                name={name}
                onPress={onPressMock}
            />
        );

        const categoryIcon = getByTestId("categoryIcon");
        const iconButton = getByTestId("iconButton");
        const iconImage = getByTestId("iconImage");

        expect(categoryIcon).toBeTruthy();
        expect(iconButton).toBeTruthy();
        expect(iconImage).toBeTruthy();
    });

    test("calls onPress when button is pressed", () => {
        const { getByTestId } = render(
            <CategoryIcon
                iconSource={iconSource}
                size={size}
                name={name}
                onPress={onPressMock}
            />
        );

        const iconButton = getByTestId("iconButton");
        fireEvent.press(iconButton);
        expect(onPressMock).toHaveBeenCalled();
    });
});
