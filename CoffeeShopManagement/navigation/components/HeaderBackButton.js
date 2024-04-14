import { Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome6";

export default HeaderBackButton = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <Pressable
      style={{
        marginLeft: "2%",
      }}
      hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
      onPress={handleGoBack}
    >
      <Icon name="chevron-left" size={16} />
    </Pressable>
  );
};
