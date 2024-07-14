import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";
import AddNewVoucherButton from "../../components/Admin/Button/AddNewVoucherButton";

jest.mock("@react-navigation/native");

describe("AddNewVoucherButton", () => {
    const navigation = {
        navigate: jest.fn(),
    };

    beforeEach(() => {
        useNavigation.mockReturnValue(navigation);
    });

    test("TouchableOpacity renders correctly", () => {
        const { getByTestId } = render(<AddNewVoucherButton />);
        const touchable = getByTestId("addVoucherButton");
        expect(touchable).toBeTruthy();
    });

    test("TouchableOpacity navigates to AdminAddVoucher screen on press", () => {
        const { getByTestId } = render(<AddNewVoucherButton />);
        const touchable = getByTestId("addVoucherButton");
        fireEvent.press(touchable);
        expect(navigation.navigate).toHaveBeenCalledWith("AdminAddVoucher");
    });
});
