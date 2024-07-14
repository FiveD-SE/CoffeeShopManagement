import { StyleSheet, Text, Pressable } from "react-native";
import React from "react";

const BrownTextButton = ({ text, onPress }) => {
    return (
        <Pressable onPress={onPress} testID="brownTextButton">
            <Text style={styles.textButton} testID="buttonText">
                {text}
            </Text>
        </Pressable>
    );
};

export default BrownTextButton;

const styles = StyleSheet.create({
    textButton: {
        fontSize: 16,
        fontWeight: "600",
    },
});
