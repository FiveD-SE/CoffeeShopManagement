import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import BranchCard from "../../components/Admin/Card/BranchCard"; // Adjust the path accordingly

describe("BranchCard", () => {
    const mockImage = { uri: "https://via.placeholder.com/150" };

    test("renders correctly", () => {
        const { getByTestId, getByText } = render(
            <BranchCard
                storeName="Store Name"
                branchName="Branch Name"
                distance={5}
                image={mockImage}
            />
        );

        const card = getByTestId("branchCard");
        const storeName = getByText("Store Name");
        const branchName = getByText("Branch Name");
        const distance = getByText("Cách đây 5 km");
        const image = getByTestId("branchImage");
        const checkbox = getByTestId("shipCheckbox");

        expect(card).toBeTruthy();
        expect(storeName).toBeTruthy();
        expect(branchName).toBeTruthy();
        expect(distance).toBeTruthy();
        expect(image).toBeTruthy();
        expect(checkbox).toBeTruthy();
    });

    test("checkbox changes value when pressed", () => {
        const { getByTestId, rerender } = render(
            <BranchCard
                storeName="Store Name"
                branchName="Branch Name"
                distance={5}
                image={mockImage}
            />
        );
    });
});
