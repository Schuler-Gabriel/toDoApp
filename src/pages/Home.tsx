import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { TasksList } from "../components/TasksList";
import { Task } from "../components/TaskItem";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find((item) => item.title === newTaskTitle)) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    } else {
      const task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };
      setTasks((oldValue) => [...oldValue, task]);
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((item) => {
      if (item.id === id) {
        if (item.done === true) {
          return {
            id: id,
            title: item.title,
            done: false,
          };
        } else {
          return {
            id: id,
            title: item.title,
            done: true,
          };
        }
      } else {
        return item;
      }
    });
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () =>
            setTasks((oldValue) => oldValue.filter((item) => item.id != id)),
        },
      ]
    );
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map((item) => {
      if (item.id === taskId) {
        return {
          id: taskId,
          title: taskNewTitle,
          done: item.done,
        };
      } else {
        return item;
      }
    });
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
