import axios from "axios";

const api = axios.create({
    baseURL: "https://cfbe.up.railway.app",
});

export const getUserData = async (phoneNumber) => {
    try {
        const response = await api.get(`/users/${phoneNumber}`);

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 404) {
            console.log("Người dùng không tồn tại");
            return null;
        } else if (response.status === 500) {
            console.error("Lỗi API:", response.data);
            throw new Error("Đã xảy ra lỗi server khi gửi yêu cầu đến API");
        } else {
            throw new Error("Đã xảy ra lỗi khi gửi yêu cầu đến API");
        }
    } catch (error) {
        if (error.response && error.response.data) {
            console.error(
                "Lỗi khi lấy thông tin người dùng:",
                error.response.data.message
            );
        } else {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
        }
        throw new Error("Lỗi khi lấy thông tin người dùng từ API");
    }
};

export const updateUserData = async (phoneNumber, updatedData) => {
    try {
        const response = await api.put(`/users/${phoneNumber}`, updatedData);
        if (response.status === 200) {
            return response.data;
        } else if (response.status === 404) {
            console.log("Người dùng không tồn tại");
            return null;
        } else if (response.status === 500) {
            console.error("Lỗi API:", response.data);
            throw new Error("Đã xảy ra lỗi server khi gửi yêu cầu đến API");
        } else {
            throw new Error("Đã xảy ra lỗi khi gửi yêu cầu đến API");
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật thông tin người dùng:", error.message);
        throw new Error("Lỗi khi cập nhật thông tin người dùng từ API");
    }
};

export const updatePassword = async (phoneNumber, oldPassword, newPassword) => {
    try {
        const response = await api.put(
            `/users/${phoneNumber}/change-password`,
            {
                oldPassword,
                newPassword,
            }
        );

        if (response.status === 200) {
            console.log("Mật khẩu đã được cập nhật thành công");
            return response.data;
        } else if (response.status === 404) {
            console.log("Người dùng không tồn tại");
            return null;
        } else if (response.status === 400) {
            console.log("Mật khẩu cũ không chính xác");
            return null;
        } else if (response.status === 500) {
            console.error("Lỗi API:", response.data);
            throw new Error("Đã xảy ra lỗi server khi gửi yêu cầu đến API");
        } else {
            throw new Error("Đã xảy ra lỗi khi gửi yêu cầu đến API");
        }
    } catch (error) {
        console.error("Lỗi khi cập nhật mật khẩu:", error.message);
        throw new Error("Lỗi khi cập nhật mật khẩu từ API");
    }
};

export const signIn = async (phoneNumber, password) => {
    try {
        const response = await api.post("/login", {
            phoneNumber,
            password,
        });

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            return { error: "Số điện thoại hoặc mật khẩu không chính xác" };
        } else {
            console.error("Error signing in:", error);
            throw new Error("Error signing in from API");
        }
    }
};

export const deleteUser = async (phoneNumber, password) => {
    try {
        const response = await api.delete(`/users/${phoneNumber}`, {
            data: { password },
        });

        if (response.status === 200) {
            console.log("Xóa tài khoản thành công");
            return true;
        } else if (response.status === 404) {
            console.log("Người dùng không tồn tại");
            return false;
        } else if (response.status === 400) {
            console.log("Sai mật khẩu");
            return false;
        } else if (response.status === 500) {
            console.error("Lỗi API:", response.data);
            throw new Error("Đã xảy ra lỗi server khi gửi yêu cầu đến API");
        } else {
            throw new Error("Đã xảy ra lỗi khi gửi yêu cầu đến API");
        }
    } catch (error) {
        console.error("Lỗi khi xóa tài khoản:", error.message);
        throw error;
    }
};

export const signUp = async (fullName, phoneNumber, password) => {
    try {
        const response = await api.post("/signup", {
            fullName,
            phoneNumber,
            password,
        });

        if (response.status === 201) {
            console.log("Đăng ký thành công");
            return true;
        } else if (response.status === 409) {
            console.log("Người dùng đã tồn tại");
            return false;
        } else if (response.status === 500) {
            console.error("Lỗi API:", response.data);
            throw new Error("Đã xảy ra lỗi server khi gửi yêu cầu đến API");
        } else {
            throw new Error("Đã xảy ra lỗi khi gửi yêu cầu đến API");
        }
    } catch (error) {
        console.error("Lỗi khi đăng ký:", error.message);
        throw new Error("Lỗi khi đăng ký từ API");
    }
};

export const getProductsList = async () => {
    try {
        const response = await api.get("/products");

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 404) {
            console.log("Danh sách sản phẩm không tồn tại");
            return null;
        } else if (response.status === 500) {
            console.error("Lỗi API:", response.data);
            throw new Error("Đã xảy ra lỗi server khi gửi yêu cầu đến API");
        } else {
            throw new Error("Đã xảy ra lỗi khi gửi yêu cầu đến API");
        }
    } catch (error) {
        if (error.response && error.response.data) {
            console.error(
                "Lỗi khi lấy thông tin danh sách sản phẩm:",
                error.response.data.message
            );
        } else {
            console.error("Lỗi khi lấy thông tin danh sách sản phẩm:", error);
        }
        throw new Error("Lỗi khi lấy thông tin danh sách sản phẩm từ API");
    }
};

export const getFavoritesListById = async (userId) => {
    try {
        const response = await api.get(`/favorites/${userId}`);
        if (response.status === 200) {
            console.log("GET FAVORITE LIST BY USER ID SUCCESSFULLY");
            return response.data.favorites;
        } else if (response.status === 404) {
            throw new Error("Favorites not found for this user");
        } else if (response.status === 400) {
            throw new Error("Invalid userId");
        } else {
            throw new Error("Failed to fetch favorites");
        }
    } catch (error) {
        console.error("Error fetching favorites:", error);
        throw error;
    }
};

export const checkProductInFavorites = async (userId, productId) => {
    try {
        const response = await api.get(
            `/favorites/${userId}/products/${productId}`
        );
        if (response.status === 200) {
            console.log("Product exists in favorites");
            return true;
        } else {
            console.log("Product does not exist in favorites");
            return false;
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.log("Product does not exist in favorites");
            return false;
        } else {
            console.error("Error checking product in favorites:", error);
            return null;
        }
    }
};

export const addToFavorites = async (userId, products) => {
    try {
        const response = await api.post("/favorites", { userId, products });
        if (response.status === 201) {
            console.log("ADD TO FAVORITES LIST SUCCESSFULLY");
            return response.data.favorites;
        } else {
            throw new Error("Failed to add product to favorites");
        }
    } catch (error) {
        console.error("Error adding product to favorites:", error);
        throw error;
    }
};

export const removeFromFavorites = async (userId, productId) => {
    try {
        const response = await api.delete(`/favorites/${userId}/${productId}`);
        if (response.status === 200) {
            console.log("REMOVE FROM FAVORITES LIST SUCCESSFULLY");
            return response.data.favorites;
        } else {
            throw new Error("Failed to remove product from favorites");
        }
    } catch (error) {
        console.error("Error removing product from favorites:", error);
        throw error;
    }
};

export const getVouchers = async () => {
    try {
        const response = await api.get(`/vouchers`);

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 404) {
            console.log("Danh sách khuyến mãi không tồn tại");
            return null;
        } else if (response.status === 500) {
            console.error("Lỗi API:", response.data);
            throw new Error("Đã xảy ra lỗi server khi gửi yêu cầu đến API");
        } else {
            throw new Error("Đã xảy ra lỗi khi gửi yêu cầu đến API");
        }
    } catch (error) {
        if (error.response && error.response.data) {
            console.error(
                "Lỗi khi lấy thông tin danh sách khuyến mãi:",
                error.response.data.message
            );
        } else {
            console.error("Lỗi khi lấy thông tin danh sách khuyến mãi:", error);
        }
        throw new Error("Lỗi khi lấy thông tin danh sách khuyến mãi từ API");
    }
};

export const getOrderData = async () => {
    try {
        const response = await api.get(`/orders`);

        if (response.status === 200) {
            return response.data;
        } else if (response.status === 404) {
            console.log("Đơn hàng không tồn tại");
            return null;
        } else if (response.status === 500) {
            console.error("Lỗi API:", response.data);
            throw new Error("Đã xảy ra lỗi server khi gửi yêu cầu đến API");
        } else {
            throw new Error("Đã xảy ra lỗi khi gửi yêu cầu đến API");
        }
    } catch (error) {
        if (error.response && error.response.data) {
            console.error(
                "Lỗi khi lấy thông tin đơn hàng:",
                error.response.data.message
            );
        } else {
            console.error("Lỗi khi lấy thông tin đơn hàng:", error);
        }
        throw new Error("Lỗi khi lấy thông tin đơn hàng từ API");
    }
};
