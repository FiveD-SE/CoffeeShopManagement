import React from "react";
import { render } from "@testing-library/react-native";
import OrderCard from "../../components/Admin/Card/OrderCard";

describe("OrderCard", () => {
    const orderId = "1234567890abcdef";
    const status = 1;
    const total = 100000;
    const date = { seconds: 1625097600 };

    test("renders correctly", () => {
        const { getByTestId, getByText } = render(
            <OrderCard
                orderId={orderId}
                status={status}
                total={total}
                date={date}
            />
        );

        const card = getByTestId("orderCard");
        const statusIndicator = getByTestId("statusIndicator");

        expect(card).toBeTruthy();
        expect(statusIndicator).toBeTruthy();
    });
});
