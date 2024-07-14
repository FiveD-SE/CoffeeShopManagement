import React from "react";
import { render } from "@testing-library/react-native";
import ViewProductCard from "../../components/Admin/Card/ViewProductCard";

describe("ViewProductCard", () => {
    const mockImageSource = "https://via.placeholder.com/150";
    const title = "Test Product";
    const quantity = 10;
    const price = 100000;
    const unit = "kg";

    test("renders correctly", () => {
        const { getByTestId } = render(
            <ViewProductCard
                title={title}
                quantity={quantity}
                price={price}
                imageSource={mockImageSource}
                unit={unit}
            />
        );

        const card = getByTestId("viewProductCard");
        const image = getByTestId("productImage");

        expect(card).toBeTruthy();
        expect(image).toBeTruthy();
    });
});
