import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import AddStaffButton from "../../components/Admin/Button/AddStaffButton";

describe("AddStaffButton", () => {
    const onPressMock = jest.fn();

    test("renders correctly with given props", () => {
        const { getByTestId } = render(
            <AddStaffButton onPress={onPressMock} />
        );
        const touchable = getByTestId("addStaffButton");
        expect(touchable).toBeTruthy();
    });

    test("TouchableOpacity calls onPress when pressed", () => {
        const { getByTestId } = render(
            <AddStaffButton onPress={onPressMock} />
        );
        const touchable = getByTestId("addStaffButton");
        fireEvent.press(touchable);
        expect(onPressMock).toHaveBeenCalled();
    });
});
