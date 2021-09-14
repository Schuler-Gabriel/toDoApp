import React from "react";
import {
  FlatList,
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatListProps,
} from "react-native";

import { Task, TaskItem } from "../components/TaskItem";

import Icon from "react-native-vector-icons/Feather";

import { ItemWrapper } from "./ItemWrapper";

import trashIcon from "../assets/icons/trash/trash.png";

export interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
}

export function TasksList({
  tasks,
  toggleTaskDone,
  removeTask,
  editTask,
}: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              item={item}
              index={index}
              toggleTaskDone={toggleTaskDone}
              removeTask={removeTask}
              editTask={editTask}
            />
          </ItemWrapper>
        );
      }}
      style={{
        marginTop: 32,
      }}
    />
  );
}

const styles = StyleSheet.create({});
