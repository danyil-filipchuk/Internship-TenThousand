import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {useTheme} from "../../theme/theme-context";
import { useTranslation } from 'react-i18next';

export function ButtonAddNewTask({ onPress }) {
    const { theme } = useTheme();
    const { t } = useTranslation();

    return (
        <View style={[styles.buttonContainer, {shadowColor: theme.ButtonAddNewTaskShadowColor}]}>
            <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={{width: '100%'}}>
                <LinearGradient
                    colors={theme.ButtonAddNewTaskGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={ styles.button }
                >
                    <Text style={[styles.buttonText, {color: theme.ButtonAddNewTaskTextColor}]} numberOfLines={1} adjustsFontSizeToFit>
                        {t('addNewTask')}
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    button: {
        width: '100%',
        paddingVertical: 10,
        borderRadius: 16,
        alignItems: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 27,
        fontFamily: 'Montserrat-Regular'
    },
});
