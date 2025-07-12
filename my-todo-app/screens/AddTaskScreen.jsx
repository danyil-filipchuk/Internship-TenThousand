import { useState } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import { ButtonSaveTask } from "../components/ButtonSaveTask";
import {TaskInput} from "../components/TaskInput";

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
        <SafeAreaView style={ styles.container }>
            <View style={ styles.card }>
                <TaskInput
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={handleSave}
                />
                <ButtonSaveTask onPress={handleSave}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafbff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 16,
        width: '90%',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    }
})