import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { TaskActionsIcons } from "./TaskActionsIcons";
import { CopyIconButton } from "./CopyIconButton";
import MoreIcon from "../../assets/images/MoreIcon.svg";

export function TaskList({tasks, completeTask, deleteTask, openSheet }) {
    return (
        <FlatList
            data={tasks}
            keyExtractor={( item, index ) => index.toString()}
            renderItem={({ item, index }) =>
                <Animated.View
                    entering={FadeInDown.duration(600)}
                    exiting={FadeOutUp.duration(600)}
                >
                    <View style={ styles.cardRow }>
                        <View style={ styles.card }>
                            <View style={ styles.indexWithText }>
                                <Text style={ styles.index }>{index+1}.</Text>
                                <Text style={ item.completed ? styles.completeText : styles.text }>
                                    {item.text}
                                    <CopyIconButton text={item.text}/>
                                </Text>
                            </View>
                            <TaskActionsIcons
                                onComplete={() => completeTask(item.id)}
                                onDelete={() => deleteTask(item.id)}
                            />
                        </View>
                        <TouchableOpacity onPress={() => openSheet(item)}>
                            <MoreIcon/>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            }
            ListEmptyComponent={
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <Text style={ styles.emptyList }>
                        no tasks yet
                    </Text>
                </View>
            }
            contentContainerStyle={{ flexGrow: 1, padding: 10, paddingBottom: 70 }}
        />
    )
}

const styles = StyleSheet.create({
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    card: {
        flex: 1,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between',
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#C3D1E7',
        padding: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.13,
        shadowRadius: 4,
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
        color: '#7A869A',
        fontSize: 32,
        textAlign: 'center',
        opacity: 0.85,
        textShadowColor: '#E6ECF9',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        fontFamily: 'Montserrat-SemiBold',
    },
});