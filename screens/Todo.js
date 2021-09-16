import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  AsyncStorage,
  FlatList,
  Alert,
  CheckBox,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CustomFonts from "../components/CustomFonts";
import { setTasks, setTaskID } from "../redux/actions";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

export default function Todo({ navigation }) {
  const { tasks } = useSelector((state) => state.taskReducer);
  const dispatch = useDispatch();

  let [fontsLoaded] = useFonts({
    JoseFinLight: require("../assets/fonts/JosefinSans-ExtraLight.ttf"),
    JoseFin: require("../assets/fonts/JosefinSans-Bold.ttf"),
    DancingScript: require("../assets/fonts/DancingScript-Regular.ttf"),
  });

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    AsyncStorage.getItem("TASKS")
      .then((tasks) => {
        const parsedTask = JSON.parse(tasks);
        if (parsedTask && typeof parsedTask === "object") {
          dispatch(setTasks(parsedTask));
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteTask = (id) => {
    const filteredTask = tasks.filter((task) => task.ID !== id);
    AsyncStorage.setItem("TASKS", JSON.stringify(filteredTask))
      .then(() => {
        if (filteredTask) {
          dispatch(setTasks(filteredTask));
          // Alert.alert("Success", "Task removed successfully");
        }
      })
      .catch((err) => console.log(err));
  };

  const checkTask = (id, newValue) => {
    const index = tasks.findIndex((task) => task.ID === id);
    let newTask = [];
    if (index > -1) {
      newTask = [...tasks];
      newTask[index].Done = newValue;

      AsyncStorage.setItem("TASKS", JSON.stringify(newTask))
        .then(() => {
          dispatch(setTasks(newTask));
          Alert.alert("Success", "Task state is changed !");
        })
        .catch((error) => console.log(error));
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.body}>
        <FlatList
          data={tasks.filter((task) => task.Done === false)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                dispatch(setTaskID(item.ID));
                navigation.navigate("Task");
              }}
            >
              <View style={styles.item_row}>
                <View
                  style={[
                    {
                      backgroundColor:
                        item.Color === "white"
                          ? "#ddd"
                          : item.Color === "yellow"
                          ? "yellow"
                          : item.Color === "green"
                          ? "green"
                          : "red",
                    },
                    styles.colors,
                  ]}
                />
                <CheckBox
                  value={item.Done}
                  onValueChange={(newValue) => checkTask(item.ID, newValue)}
                />
                <View style={styles.item_body}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontFamily: "JoseFin",
            
                    }}
                  >
                    {item.Title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 22,
                      fontFamily: "DancingScript",
                    }}
                    numberOfLines={3}
                  >
                    {item.Desc}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Delete",
                      "Are you sure to delete this task ?",
                      [
                        {
                          text: "cancel",
                          onPress: () => console.log("Cancel Pressed"),
                          style: "cancel",
                        },
                        {
                          text: "delete",
                          onPress: () => deleteTask(item.ID),
                          style: "destructive",
                        },
                      ]
                    )
                  }
                >
                  <FontAwesome5
                    name={"trash"}
                    size={20}
                    color={"#ff3636"}
                    style={{ paddingHorizontal: 10 }}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            dispatch(setTaskID(tasks.length + 1000));
            navigation.navigate("Task");
          }}
        >
          <FontAwesome5 name={"plus"} size={30} color={"#fff"} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    // alignItems: "center",
    // // backgroundColor: "#0080ff",
    // justifyContent: "center",
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: "#0080ff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 45,
    elevation: 5,
  },
  item: {
    marginHorizontal: 10,
    marginVertical: 10,
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
  },
  item_row: {
    flexDirection: "row",
    alignItems: "center",
  },
  item_body: {
    flex: 1,
  },
  colors: {
    width: 18,
    height: 107,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
