import {View, Text, Button, FlatList} from "react-native";
import {useState, useEffect} from "react";

export default function HomeScreen({ navigation, tasks }) {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                data={tasks}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({ item }) => <Text style={{ fontSize: 24, margin: 4 }}>{item}</Text>}
                ListEmptyComponent={<Text style={{ color:'#bbb' }}>No tasks yet</Text>}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}
            />
            <Button title="add new task" onPress={() => navigation.navigate('AddTask')}/>
        </View>
    );
}