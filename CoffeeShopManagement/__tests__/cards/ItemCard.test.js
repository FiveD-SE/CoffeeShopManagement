import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ItemCard from "../../components/Admin/Card/ItemCard";

describe("ItemCard", () => {
    const mockImage = { uri: "https://via.placeholder.com/150" };
    const onPressMock = jest.fn();

    test("renders correctly", () => {
        const { getByTestId, getByText, queryByTestId } = render(
            <ItemCard
                title="Item Title"
                price="$10"
                imageSource={mockImage}
                onPress={onPressMock}
                enablePress={true}
            />
        );

        const card = getByTestId("itemCard");
        const image = getByTestId("itemImage");
        const title = getByText("Item Title");
        const price = getByText("$10");

        expect(card).toBeTruthy();
        expect(image).toBeTruthy();
        expect(title).toBeTruthy();
        expect(price).toBeTruthy();
    });

    test("calls onPress when button is pressed", () => {
        const { getByTestId } = render(
            <ItemCard
                title="Item Title"
                price="$10"
                imageSource={mockImage}
                onPress={onPressMock}
                enablePress={true}
            />
        );

        const card = getByTestId("itemCard");
        fireEvent.press(card);
        expect(onPressMock).toHaveBeenCalled();
    });
});
