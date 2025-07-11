import { View, SafeAreaView, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ButtonOnHomeScreen } from "../components/ButtonOnHomeScreen";

export default function HomeScreen({ navigation, tasks, removeTask, completeTask }) {

    return (
        <SafeAreaView style={{flex: 1}}>
            <FlatList
                data={tasks}
                keyExtractor={( item, index ) => index.toString()}
                renderItem={({ item, index }) =>
                    <View style={ styles.card }>
                        <View style={ styles.cardLeftContent }>
                            <Text style={ styles.cardIndex }>{index+1}.</Text>
                            <Text style={ item.completed ? styles.completeCardText : styles.cardText }>
                                {item.text}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => completeTask(item.id)}>
                            <Text style={{ fontSize: 20 }}>✅</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => removeTask(item.id)}>
                            <Text style={{ fontSize: 20 }}>🗑</Text>
                        </TouchableOpacity>
                    </View>
                }
                ListEmptyComponent={
                    <Text style={ styles.emptyList }>
                        no tasks yet
                    </Text>}
                    contentContainerStyle={{ flexGrow: 1, padding: 10, paddingBottom: 70 }}
            />
            <View>
                <ButtonOnHomeScreen onPress={() => navigation.navigate('AddTask')}/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        padding: 12,
        marginBottom: 10,
        // тінь для iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 2,
        // тінь для Android
        elevation: 2,
    },
    cardIndex: {
        fontSize: 20,
        color: '#4F8EF7',
        marginRight: 12,
        fontWeight: 'bold'
    },
    cardText: {
        fontSize: 20,
        color: "#222",
        flexShrink: 1
    },
    completeCardText: {
        fontSize: 20,
        color: "#222",
        flexShrink: 1,
        textDecorationLine: 'line-through',
        opacity: 0.5
    },
    cardLeftContent: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    emptyList: {
        color:'#bbb',
        fontSize:35,
        textAlign:'center'
    }
});