import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";

const Section = ({
  title,
  showSubtitle,
  subtitle,
  children,
  onPressSubtitle,
}) => {
  return (
    <View style={styles.sectionContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{title}</Text>
        {showSubtitle && (
          <Pressable style={styles.subtitleContainer} onPress={onPressSubtitle}>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Icon name="chevron-right" color="#00A188" size={12} />
          </Pressable>
        )}
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {},
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#3a3a3a",
    fontSize: 18,
    fontWeight: "600",
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtitle: {
    marginRight: "5%",
    color: "#00A188",
    fontSize: 14,
    fontWeight: "700",
  },
});

export default Section;
