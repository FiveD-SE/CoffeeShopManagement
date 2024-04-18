import React from "react";
import UserNavigator from "./UserNavigator";
// import CashierNavigator from "./CashierNavigator";
import AdminNavigator from "./AdminNavigator";

function AppNavigator({ role }) {
    if (role === "user") {
        return <UserNavigator />;
        // } else if (role === "cashier") {
        //     return <CashierNavigator />;
    } else if (role === "admin") {
        return <AdminNavigator />;
    }
}

export default AppNavigator;
