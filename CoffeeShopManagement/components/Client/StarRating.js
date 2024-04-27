import React, { useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StarRating = ({ rating, totalStars = 5, onRate }) => {
	const [selectedStars, setSelectedStars] = useState(rating);

	const handleStarPress = (selected) => {
		setSelectedStars(selected);
		onRate(selected);
	};

	return (
		<View style={{ flexDirection: "row" }}>
			{[...Array(totalStars)].map((_, index) => {
				const iconColor = index < selectedStars ? "#FFBB5C" : "#CBCBD4";
				return (
					<Pressable key={index} onPress={() => handleStarPress(index + 1)}>
						<Ionicons name="star" size={32} color={iconColor} />
					</Pressable>
				);
			})}
		</View>
	);
};

export default StarRating;

const styles = StyleSheet.create({});
