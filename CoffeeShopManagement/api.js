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
		const response = await api.patch(`/users/${phoneNumber}`, updatedData);
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

export const signIn = async (phoneNumber, password) => {
	try {
		const response = await api.post("/login", {
			phoneNumber,
			password,
		});

		if (response.status === 200) {
			return response.data;
		} else if (response.status === 404) {
			console.log("Người dùng không tồn tại");
			return null;
		} else if (response.status === 401) {
			console.log("Sai mật khẩu");
			return null;
		} else if (response.status === 500) {
			console.error("Lỗi API:", response.data);
			throw new Error("Đã xảy ra lỗi server khi gửi yêu cầu đến API");
		} else {
			throw new Error("Đã xảy ra lỗi khi gửi yêu cầu đến API");
		}
	} catch (error) {
		if (error.response && error.response.data) {
			console.error("Lỗi khi đăng nhập:", error.response.data.message);
		} else {
			console.error("Lỗi khi đăng nhập:", error);
		}
		throw new Error("Lỗi khi đăng nhập từ API");
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
		if (error.response && error.response.data) {
			console.error("Lỗi khi đăng ký:", error.response.data.message);
		} else {
			console.error("Lỗi khi đăng ký:", error);
		}
		throw new Error("Lỗi khi đăng ký từ API");
	}
};

export const getFavoritesListById = async (userId) => {
	try {
		const response = await api.get(`/favorites/${userId}`);
		console.log(response.data);
		if (response.status === 200) {
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

export const addToFavorites = async (userId, products) => {
	try {
		const response = await api.post("/favorites", { userId, products });
		if (response.status === 201) {
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