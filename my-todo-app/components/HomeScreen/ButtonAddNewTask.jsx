import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export function ButtonAddNewTask({ onPress }) {
    return (
        <View style={ styles.buttonContainer }>
            <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{width: '100%'}}>
                <LinearGradient
                    colors={['#4F8EF7', '#86B6F6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={ styles.button }
                >
                    <Text style={ styles.buttonText } numberOfLines={1} adjustsFontSizeToFit>
                        add new task
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    button: {
        width: '100%', // <-- Сюди!
        paddingVertical: 10,
        borderRadius: 16,
        alignItems: 'center',
        overflow: 'hidden', // <-- обов'язково!
    },
    buttonText: {
        color: '#fff',
        fontSize: 25,
        letterSpacing: 1,
        fontFamily: 'Montserrat-Regular'
    },
});
