import { useState } from "react";
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { showMessage } from "react-native-flash-message";
import { ButtonSaveTask } from "../components/AddTaskScreen/ButtonSaveTask";
import { TaskInput } from "../components/AddTaskScreen/TaskInput";
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export function AddTaskScreen({navigation, addTask}) {
    const [text, setText] = useState('');
    const [date, setDate] = useState(new Date());
    const [isPickerVisible, setPickerVisible] = useState(false);

    const handleSave = () => {
        if (text.trim()) {
            addTask({
                text: text.trim(),
                deadline: date
            });
            showMessage({
                message: 'task added',
                type: 'success',
                });
            navigation.goBack();
        }
        else {
            showMessage({
                message: 'please enter a task',
                type: 'warning',
            })
        }
    }

    const confirmDate = (selectedDate) => {
        setPickerVisible(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    return (
        <SafeAreaView style={ styles.container }>
            <View style={ styles.card }>
                <TaskInput
                    value={text}
                    onChangeText={setText}
                    onSubmitEditing={handleSave}
                />
                <TouchableOpacity onPress={() => setPickerVisible(true)}>
                    <Text style={styles.dateText}>
                        Deadline: {date.toLocaleDateString()}
                    </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isPickerVisible}
                    mode="date"
                    date={date}
                    onConfirm={confirmDate}
                    onCancel={() => setPickerVisible(false)}
                    minimumDate={new Date(2000, 0, 1)}
                    maximumDate={new Date(2100, 11, 31)}
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
    },
    dateText: {
        fontSize: 24,
        color: "#4F8EF7",
        fontWeight: 'bold',
        marginVertical: 20,
    },
})