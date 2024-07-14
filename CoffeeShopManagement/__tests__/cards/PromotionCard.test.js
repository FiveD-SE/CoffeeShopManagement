import React from "react";
import { render } from "@testing-library/react-native";
import PromotionCard from "../../components/Admin/Card/PromotionCard";

describe("PromotionCard", () => {
    const mockImageSource = "https://via.placeholder.com/300x100";
    const promotionName = "Summer Sale";
    const promotionContent = "Get 50% off on all items!";
    const dateCreated = "2023-07-01";

    test("renders correctly", () => {
        const { getByTestId, getByText } = render(
            <PromotionCard
                promotionName={promotionName}
                promotionContent={promotionContent}
                dateCreated={dateCreated}
                imageSource={mockImageSource}
            />
        );

        const card = getByTestId("promotionCard");
        const image = getByTestId("promotionImage");

        expect(card).toBeTruthy();
        expect(image).toBeTruthy();
    });
});
