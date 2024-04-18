import React from "react";
import UserNavigator from "./UserNavigator";
import CashierNavigator from "./CashierNavigator";

function AppNavigator({ role }) {
    if (role === "user") {
        return <UserNavigator />;
    } else if (role === "cashier") {
        return <CashierNavigator />;
    }
}

export default AppNavigator;
