import React from "react";
import { Pressable, Text, StyleSheet, View } from "react-native";

export const CustomButton = (props) => {
  return (
    <>
      <Pressable
        onPress={props.onPressFunction}
        android_ripple={{ color: "#fff" }}
        hitSlop={{ top: 10, bottom: 10, right: 10, left: 10 }}
        style={({ pressed }) => [
          { backgroundColor: pressed ? "#dddddd" : "#0080ff" },
          styles.button,
        ]}
      >
        <Text style={{ margin: 5, fontSize: 15, color: "#fff", fontWeight: "bold" }}>
          {props.title}
        </Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 120,
    height: 33,
    alignItems: "center",
    textAlign: "center",
    borderRadius: 20,
    borderWidth: 0,
    borderColor: "rgba(0,0,0,1.2)",
    marginTop: 20,
  },
});
