import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { TaskActionsIcons } from "./TaskActionsIcons";
import { CopyIconButton } from "./CopyIconButton";
import MoreIcon from "../../../assets/images/IconMore.svg";
import {useTheme} from "../../../theme/theme-context";

export function TaskList({tasks, completeTask, deleteTask, openSheet }) {
    const { theme } = useTheme();

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
                        <View style={[styles.card, {
                            backgroundColor: theme.TaskListCardBackgroundColor,
                            borderColor: theme.TaskListCardBorderColor,
                            shadowColor: theme.TaskListCardShadowColor,
                        }]}>
                            <View style={ styles.indexTextCopy }>
                                <Text style={[styles.index, {color: theme.TaskListIndexColor}]}>
                                    {index+1}.
                                </Text>
                                <Text style={[item.completed ? styles.completeText : styles.text,{
                                    color: item.completed
                                        ? theme.TaskListCompleteTextColor
                                        : theme.TaskListTextColor,
                                }]}>
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
                            <MoreIcon color={ theme.IconColor }/>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            }
            ListEmptyComponent={
                <MaskedView
                    maskElement={
                        <Text style={[styles.emptyList, { color: 'black' }]}>
                            no tasks yet
                        </Text>
                    }
                >
                    <LinearGradient
                        colors={theme.TaskListEmptyComponentGradient}
                        start={{ x: 1, y: 1 }}
                        end={{ x: 0, y: 0 }}
                        style={{ flex: 1 }}
                    >
                        <Text style={[styles.emptyList, { opacity: 0 }]}>
                            no tasks yet
                        </Text>
                    </LinearGradient>
                </MaskedView>
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
        borderRadius: 12,
        borderWidth: 1,
        padding: 12,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.13,
        shadowRadius: 4,
        elevation: 2,
    },
    index: {
        fontSize: 20,
        marginRight: 12,
        fontWeight: 'bold'
    },
    text: {
        fontSize: 20,
        flexShrink: 1,
        fontFamily: 'Montserrat-SemiBold'
    },
    completeText: {
        fontSize: 20,
        flexShrink: 1,
        fontFamily: 'Montserrat-MediumItalic',
        opacity: 0.5,
        textDecorationLine: 'line-through',

    },
    indexTextCopy: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    emptyList: {
        letterSpacing: 1,
        marginTop: 200,
        fontSize: 32,
        textAlign: 'center',
        opacity: 0.85,
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        fontFamily: 'Montserrat-SemiBold',
    },
});