import React from "react";
import { Text, View, StyleSheet } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

export default (props) => {
  let [fontsLoaded] = useFonts({
    JoseFin: require("../assets/fonts/JosefinSans-Bold.ttf"),
    DancingScript: require("../assets/fonts/DancingScript-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.font}> rtrtregeregegegeg </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  font: {
    fontFamily: "DancingScript",
    fontSize: 40,
  },
});
