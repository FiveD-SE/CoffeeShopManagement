import React from "react";
import { render } from "@testing-library/react-native";
import ProductCard from "../../components/Admin/Card/ProductCard";

describe("ProductCard", () => {
    const mockImage = { uri: "https://via.placeholder.com/150" };
    const name = "Test Product";
    const quantity = 10;
    const price = 100000;
    const unit = "kg";

    test("renders correctly", () => {
        const { getByTestId, getByText } = render(
            <ProductCard
                name={name}
                quantity={quantity}
                price={price}
                imageSource={mockImage}
                unit={unit}
            />
        );

        const card = getByTestId("productCard");
        const image = getByTestId("productImage");

        expect(card).toBeTruthy();
        expect(image).toBeTruthy();
    });
});
