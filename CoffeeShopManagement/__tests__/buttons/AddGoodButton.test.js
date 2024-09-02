import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddGoodButton from "../../components/Admin/Button/AddGoodButton";

jest.mock("../../components/Admin/Modal/AddNewGoodModal", () => {
    const { Text } = require("react-native");
    return ({ visible, onClose }) => {
        if (visible) {
            return <Text>Mocked Modal</Text>;
        } else {
            return null;
        }
    };
});

describe("AddGoodButton", () => {
    it("renders correctly", () => {
        const { getByText } = render(<AddGoodButton title="Add Good" />);
        expect(getByText("Add Good")).toBeTruthy();
    });

    it("shows modal when button is pressed", () => {
        const { getByText, queryByText } = render(
            <AddGoodButton title="Add Good" />
        );

        expect(queryByText("Mocked Modal")).toBeNull();

        fireEvent.press(getByText("Add Good"));
        expect(getByText("Mocked Modal")).toBeTruthy();
    });
});
