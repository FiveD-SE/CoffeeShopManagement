import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";
import AddVoucherButton from "../../components/Admin/Button/AddVoucherButton";

jest.mock("@react-navigation/native");

describe("AddVoucherButton", () => {
    const navigation = {
        navigate: jest.fn(),
    };

    beforeEach(() => {
        useNavigation.mockReturnValue(navigation);
    });

    test("renders correctly with given props", () => {
        const { getByTestId } = render(<AddVoucherButton />);
        const touchable = getByTestId("addVoucherButton");
        expect(touchable).toBeTruthy();
    });

    test("TouchableOpacity calls goToAddVoucherScreen when pressed", () => {
        const { getByTestId } = render(<AddVoucherButton />);
        const touchable = getByTestId("addVoucherButton");
        fireEvent.press(touchable);
        expect(navigation.navigate).toHaveBeenCalledWith("AdminAddVoucher");
    });

    test("Ionicons renders correctly", () => {
        const { getByTestId } = render(<AddVoucherButton />);
        const icon = getByTestId("addIcon");
        expect(icon).toBeTruthy();
    });
});
