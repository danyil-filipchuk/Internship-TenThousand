import { Share, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import ShareIcon from "../../../assets/images/ShareIcon.svg";
import { formatDate } from "../../../utils/formatDate";

export function ShareTask( {selectedTask}) {

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
                <ShareIcon width={22} height={22} style={{ marginRight: 8 }}/>
                <Text style={ styles.shareText }>Share Task</Text>
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
        fontSize: 17,
        color: '#2944cc',
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold',
    },
})