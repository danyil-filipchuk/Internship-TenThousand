import {useState} from "react";
import {View, Text, Button, TextInput} from "react-native";

export function AddTaskScreen({navigation, addTask}) {
    const [text, setText] = useState('');

    const handleSave = () => {
        if (text.trim()) {
            addTask(text.trim());
            navigation.goBack();
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
            <Button title="save task" onPress={handleSave}/>
        </View>
    );
}
