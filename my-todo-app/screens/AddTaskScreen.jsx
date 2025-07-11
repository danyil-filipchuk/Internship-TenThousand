import { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";

export function AddTaskScreen({navigation, addTask}) {
    const [text, setText] = useState('');

    const handleSave = () => {
        if (text.trim()) {
            addTask(text.trim());
            showMessage({
                message: 'task added',
                type: 'success',
                }
            )
            navigation.goBack();
        }
        else {
            showMessage({
                message: 'please enter a task',
                type: 'warning',
            })
        }
    }

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput
                placeholder='enter task...'
                value={text}
                onChangeText={setText}
                style={{
                    fontSize: 20,
                    borderWidth: 1,
                    borderColor: "#bbb",
                    borderRadius: 8,
                    padding: 10,
                    width: 350,
                }}
            />

            <TouchableOpacity onPress={handleSave}>
                <Text>Save task</Text>
            </TouchableOpacity>

        </View>
    );
}