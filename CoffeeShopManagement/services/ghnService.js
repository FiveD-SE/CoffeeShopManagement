import axios from "axios";
import {
    REACT_APP_GHN_TOKEN,
    REACT_APP_GHN_SHOP_ID
} from "../env";

const BASE_URL = "https://online-gateway.ghn.vn/shiip/public-api";

// Function to get wards
const getWards = async (rawData) => {
    try {
        const response = await axios.get(`${BASE_URL}/master-data/ward`, {
            params: { district_id: rawData.district_id },
            headers: {
                "Content-Type": "application/json",
                Token: REACT_APP_GHN_TOKEN,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching ward:", error);
        throw error;
    }
};

// Function to get districts
const getDistricts = async (rawData) => {
    try {
        const response = await axios.get(`${BASE_URL}/master-data/district`, {
            params: { province_id: rawData.province_id },
            headers: {
                "Content-Type": "application/json",
                Token: REACT_APP_GHN_TOKEN,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching districts:", error);
        throw error;
    }
};

// Function to get provinces
const getProvinces = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/master-data/province`, {
            headers: {
                "Content-Type": "application/json",
                Token: REACT_APP_GHN_TOKEN,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching provinces:", error);
        throw error;
    }
};

const calculateFee = async (rawData) => {
    try {
        const response = await axios.get(`${BASE_URL}/v2/shipping-order/fee`, {
            params: {
                from_district_id: rawData.from_district_id,
                from_ward_code: rawData.from_ward_code,
                service_id: rawData.service_id,
                service_type_id: rawData.service_type_id,
                to_district_id: rawData.to_district_id,
                to_ward_code: rawData.to_ward_code,
                height: rawData.height,
                length: rawData.length,
                weight: rawData.weight,
                width: rawData.width,
                insurance_value: rawData.insurance_value,
                cod_failed_amount: rawData.cod_failed_amount,
                coupon: rawData.coupon,
            },
            headers: {
                'Content-Type': 'application/json',
                'Token': REACT_APP_GHN_TOKEN,
                'ShopId': REACT_APP_GHN_SHOP_ID,
            }
        });
        const totalFee = response.data.data.total;
        console.log("Tổng phí ship: ", totalFee);
        return totalFee;
    } catch (error) {
        console.log('Error caculatefee:', error);
        throw error;
    }
};

export { getDistricts, getProvinces, getWards, calculateFee };
