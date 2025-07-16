import { useState } from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { showMessage } from "react-native-flash-message";
import { TaskInput } from "../components/AddTaskScreen/TaskInput";
import { ButtonSaveTask } from "../components/AddTaskScreen/ButtonSaveTask";
import { PhotoPicker } from "../components/AddTaskScreen/PhotoPicker";
import { DeadlinePicker } from "../components/AddTaskScreen/DeadlinePicker";
import { ContactPicker } from "../components/AddTaskScreen/ContactPicker";
import { LocationPicker } from "../components/AddTaskScreen/LocationPicker";
import { LinearGradient } from 'expo-linear-gradient';
import {useTheme} from "../theme/theme-context";

export function AddTaskScreen({navigation, addTask}) {
    const [text, setText] = useState('');

    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const { theme } = useTheme();

    const handleSave = () => {
        if (text.trim()) {
            addTask({
                text: text.trim(),
                deadline: selectedDate,
                contact: selectedContact,
                location: selectedLocation,
                photo: selectedPhoto,
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

    return (
        <LinearGradient
            style={{ flex: 1 }}
            colors={theme.LinearGradientBackgroundColor}
        >
            <SafeAreaView style={ styles.container }>
                <View style={[styles.card, {
                    backgroundColor: theme.AddTaskScreenBackgroundColor,
                    borderColor: theme.AddTaskScreenBorderColor,
                    shadowColor: theme.AddTaskScreenShadowColor,
                }]}>

                    <TaskInput
                        value={text}
                        onChangeText={setText}
                        onSubmitEditing={handleSave}
                    />

                    <ButtonSaveTask onPress={handleSave}/>

                    <View style={{ width:'100%' }}>
                        <Text style={[styles.optionsTittle, {color: theme.AddTaskScreenTitleColor}]}>additional options :</Text>

                        <PhotoPicker
                            value={selectedPhoto}
                            onChange={setSelectedPhoto}
                        />

                        <DeadlinePicker
                            value={selectedDate}
                            onChange={setSelectedDate}
                        />

                        <LocationPicker
                            value={selectedLocation}
                            onChange={setSelectedLocation}
                        />

                        <ContactPicker
                            value={selectedContact}
                            onChange={setSelectedContact}
                        />

                    </View>

                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        padding: 18,
        borderRadius: 12,
        borderWidth: 1.5,
        width: '90%',
        alignItems: 'center',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 3,
    },
    optionsTittle: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '600',
        marginTop: 24,
        fontFamily: 'Montserrat-SemiBold',
    }
})