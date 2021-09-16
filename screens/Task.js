import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  AsyncStorage,
  CheckBox,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { CustomButton } from "../components/CustomButton";
import { setTasks, setTaskID } from "../redux/actions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Tooltip } from "react-native-elements";

export default function Task({ navigation }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [done, setDone] = useState(false);
  const [color, setColor] = useState("white");

  const { tasks, taskID } = useSelector((state) => state.taskReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getTask();
  }, []);

  const getTask = () => {
    const Task = tasks.find((task) => task.ID === taskID);
    if (Task) {
      setTitle(Task.Title);
      setDesc(Task.Desc);
      setDone(Task.Done);
      setColor(Task.Color);
    }
  };

  const setTask = () => {
    if (title.length == 0) {
      Alert.alert("Warning", "Please write your task title");
    } else {
      try {
        var Task = {
          ID: taskID,
          Title: title,
          Desc: desc,
          Done: done,
          Color: color,
        };
        const index = tasks.findIndex((task) => task.ID === taskID);
        let newTask = [];
        if (index > -1) {
          newTask = [...tasks];
          newTask[index] = Task;
        } else {
          newTask = [...tasks, Task];
        }
        AsyncStorage.setItem("TASKS", JSON.stringify(newTask))
          .then(() => {
            dispatch(setTasks(newTask));
            Alert.alert("Success", "Task saved successfully");
            navigation.goBack();
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={(value) => setTitle(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        multiline
        value={desc}
        onChangeText={(value) => setDesc(value)}
      />
      <View style={styles.color_bar}>
        <TouchableOpacity
          onPress={() => setColor("white")}
          style={{
            flex: 1,
            backgroundColor: "#ddd",
            justifyContent: "center",
            alignItems: "center",
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15,
          }}
        >
          <Tooltip
            popover={<Text>Pas inportant</Text>}
            backgroundColor="#ddd"
            withOverlay={false}
          >
            {color === "white" && (
              <FontAwesome5 name={"check"} size={25} color={"#555"} />
            )}
          </Tooltip>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setColor("yellow")}
          style={{
            flex: 1,
            backgroundColor: "yellow",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip
            popover={<Text>Moyen</Text>}
            backgroundColor="#ddd"
            withOverlay={false}
          >
            {color === "yellow" && (
              <FontAwesome5 name={"check"} size={25} color={"#555"} />
            )}
          </Tooltip>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setColor("green")}
          style={{
            flex: 1,
            backgroundColor: "green",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip
            popover={<Text>Important</Text>}
            backgroundColor="#ddd"
            withOverlay={false}
          >
            {color === "green" && (
              <FontAwesome5 name={"check"} size={25} color={"#fff"} />
            )}
          </Tooltip>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setColor("red")}
          style={{
            flex: 1,
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          <Tooltip
            popover={<Text>Très important</Text>}
            backgroundColor="#ddd"
            withOverlay={false}
           
          >
            {color === "red" && (
              <FontAwesome5 name={"check"} size={25} color={"#fff"} />
            )}
          </Tooltip>
        </TouchableOpacity>
      </View>
      <View style={styles.Checkbox}>
        <CheckBox
          value={done}
          onValueChange={(newValue) => setDone(newValue)}
        />
        <Text style={{ fontSize: 15, marginTop: 5 }}>Is Done</Text>
      </View>
      <CustomButton title="Save Task" onPressFunction={setTask} />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    // justifyContent: "center",
    // backgroundColor: "#0080ff",
  },

  input: {
    width: "100%",
    // height: 40,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 5,
    backgroundColor: "#fff",
    textAlign: "left",
    fontSize: 16,
    margin: 10,
    paddingHorizontal: 10,
  },
  Checkbox: {
    flexDirection: "row",
    margin: 10,
  },
  color_bar: {
    flexDirection: "row",
    height: 50,
    // borderWidth: 3,
    // borderRadius: 20,
    borderColor: "#555",
    marginVertical: 10,
  },
});
