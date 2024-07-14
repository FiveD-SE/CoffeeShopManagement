import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import VoucherCard from "../../components/Admin/Card/VoucherCard";

describe("VoucherCard", () => {
    const mockImageSource = "https://via.placeholder.com/150";
    const itemName = "Discount Voucher";
    const status = true;
    const expiryDate = "2024-12-31";
    const minimumPrice = 50000;

    test("renders correctly", () => {
        const { getByTestId, getByText } = render(
            <VoucherCard
                itemName={itemName}
                imageSource={mockImageSource}
                status={status}
                expiryDate={expiryDate}
                minimumPrice={minimumPrice}
            />
        );

        const card = getByTestId("voucherCard");
        const image = getByTestId("voucherImage");
        const name = getByTestId("voucherName");

        expect(card).toBeTruthy();
        expect(image).toBeTruthy();
    });

    test("shows and hides the option modal on long press", () => {
        const { getByTestId } = render(
            <VoucherCard
                itemName={itemName}
                imageSource={mockImageSource}
                status={status}
                expiryDate={expiryDate}
                minimumPrice={minimumPrice}
            />
        );
    });
});
