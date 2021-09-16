import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("My Tasks");
    }, 3000);
  }, []);
  return (
    <View style={styles.body}>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmVjFfqmDWNCOydv8uQpdSC-ucWFOAfRecmg&usqp=CAU",
        }}
        style={{
          width: 120,
          height: 120,
          margin: 20,
          borderRadius: 100,
        }}
      />
      <Text style={styles.text}>ToDoList App by Mello </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0080ff",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 100,
  },
});
