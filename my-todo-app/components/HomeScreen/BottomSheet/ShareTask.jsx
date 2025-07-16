import { Share, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import ShareIcon from "../../../assets/images/IconShare.svg";
import { formatDate } from "../../../utils/formatDate";
import { useTheme } from "../../../theme/theme-context";
import { useTranslation } from 'react-i18next';

export function ShareTask( {selectedTask}) {
    const { theme } = useTheme();
    const { t } = useTranslation();

    return (
        <TouchableOpacity
            onPress={() => {
                if(selectedTask) {
                    Share.share({
                        message:
                            `— Task: ${selectedTask.text}
— Deadline: ${selectedTask.deadline ? formatDate(selectedTask.deadline) : 'Whenever you want !'}
— Location: ${selectedTask.location?.address || 'Anywhere !'}`
                    }).catch(() => {})
                }
            }}
        >
            <View style={ styles.shareRow }>
                <ShareIcon color={ theme.IconColor }/>
                <Text style={[styles.shareText, {color: theme.BottomSheetShareTaskTextColor}]}>
                    {t('ShareTask')}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    shareRow: {
        marginTop: 20,
        marginBottom: 30,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    shareText: {
        marginLeft: 8,
        fontSize: 19,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold',
    },
})