import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { showMessage } from "react-native-flash-message";
import * as Clipboard from 'expo-clipboard';
import IconDone from "../assets/images/IconDone.svg";
import IconDelete from "../assets/images/IconDelete.svg";
import IconCopy from "../assets/images/IconCopy.svg";

export function TaskList({tasks, completeTask, removeTask}) {
    return (
        <FlatList
            data={tasks}
            keyExtractor={( item, index ) => index.toString()}
            renderItem={({ item, index }) =>
                <Animated.View
                    style={styles.card}
                    entering={FadeInDown.duration(600)}
                    exiting={FadeOutUp.duration(600)}
                >
                    <View style={ styles.indexWithText }>
                        <Text style={ styles.index }>{index+1}.</Text>
                        <Text style={ item.completed ? styles.completeText : styles.text }>
                            {item.text}
                        </Text>
                        <TouchableOpacity onPress={() => Clipboard.setStringAsync(item.text)}>
                            <IconCopy/>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => completeTask(item.id)}>
                        <IconDone width={30} height={30} style={{ marginLeft:5 }}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => removeTask(item.id)}>
                        <IconDelete width={30} height={30} style={{ marginLeft:5 }}/>
                    </TouchableOpacity>
                </Animated.View>
            }
            ListEmptyComponent={
                <Text style={ styles.emptyList }>
                    no tasks yet
                </Text>}
            contentContainerStyle={{ flexGrow: 1, padding: 10, paddingBottom: 70 }}
        />
        )
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
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 2,
        elevation: 2,
    },
    index: {
        fontSize: 20,
        color: '#4F8EF7',
        marginRight: 12,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 20,
        color: "#222",
        flexShrink: 1,
        fontFamily: 'Montserrat-SemiBold'
    },
    completeText: {
        fontSize: 20,
        color: "#222",
        flexShrink: 1,
        fontFamily: 'Montserrat-MediumItalic',
        opacity: 0.5,
        textDecorationLine: 'line-through',

    },
    indexWithText: {
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