// App.js

import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, CheckBox, TouchableOpacity } from 
'react-native';

export default function App() {

  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([
    { id: '1', value: 'Finish all assignments by Friday', completed: false },
    { id: '2', value: 'Clean room by Sunday', completed: false },
  ]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([
        ...tasks,
        { id: Math.random().toString(), value: task, completed: false },
      ]);
      setTask('');
    }
  };


  const deleteTask = (taskId) => {
    setTasks(tasks.filter(item => item.id !== taskId));
  };


  const toggleComplete = (taskId) => {
    setTasks(tasks.map(item => 
      item.id === taskId ? { ...item, completed: !item.completed } : item
    ));
  };


  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <CheckBox 
        value={item.completed} 
        onValueChange={() => toggleComplete(item.id)} 
      />
      <Text style={[styles.taskText, item.completed && styles.completedText]}>
        {item.value}
      </Text>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Customized TODO App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your desired task!"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add your desired task!" onPress={addTask} />
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  taskText: {
    flex: 1,
    fontSize: 18,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

