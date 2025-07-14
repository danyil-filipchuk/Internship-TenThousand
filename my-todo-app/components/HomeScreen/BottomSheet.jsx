import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import { formatDate } from "../../utils/formatDate";
import TimerIcon from "../../assets/images/TimerIcon.svg";
import MapPinIcon from "../../assets/images/MapPinIcon.svg";
import PhoneIcon from "../../assets/images/PhoneIcon.svg";

export function BottomSheet({ modalizeRef, selectedTask, handleCloseSheet, stopModalize }) {

    let info = [];

    if (selectedTask) {
        info = [
            {
                icon: <TimerIcon />,
                label: 'Deadline',
                value: selectedTask.deadline
                    ? formatDate(selectedTask.deadline)
                    : 'Whenever you want !',
            },
            {
                icon: <MapPinIcon />,
                label: 'Location',
                value: selectedTask.location?.address
                    || (selectedTask.location
                        ? `${selectedTask.location.latitude?.toFixed(5)}, ${selectedTask.location.longitude?.toFixed(5)}`
                        : 'Anywhere !'),
            },
            {
                icon: <PhoneIcon />,
                label: 'Contact',
                value: selectedTask.contact?.name || 'Just you !',
            },
        ];
    }

    return (
        <Modalize
            ref={modalizeRef}
            adjustToContentHeight
            onClose={handleCloseSheet}
        >
            <View style={styles.sheet}>
                {info.map((item, idx) => (
                    <View key={idx} style={ styles.row }>
                        {item.icon}
                        <Text style={ styles.label }>{item.label}:</Text>
                        <Text style={ styles.value } numberOfLines={3} ellipsizeMode="tail">
                            {item.value}
                        </Text>
                    </View>
                ))}
                <TouchableOpacity onPress={stopModalize}>
                    <Text style={ styles.close }>Close</Text>
                </TouchableOpacity>
            </View>
        </Modalize>
    );
}

const styles = StyleSheet.create({
    sheet: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderRadius: 22,
        alignItems: "stretch",
        backgroundColor: "#fff",
        borderColor: "#E6ECF9",
        borderWidth: 1.5,
        shadowColor: "#4F8EF7",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 3,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 18,
        gap: 10,
        width: '100%',
    },
    label: {
        fontSize: 18,
        fontWeight: "600",
        color: "#222",
        minWidth: 90,
        textAlign: 'left',
        flexShrink: 0,
    },
    value: {
        fontSize: 17,
        color: "#4F8EF7",
        flex: 1, // важливо для переносу!
        fontFamily: 'Montserrat-Medium',
        flexWrap: 'wrap',
        lineHeight: 22,
        textAlign: 'left',
    },
    close: {
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal: 25,
        backgroundColor: '#e7f0ff',
        borderRadius: 6,
        shadowColor: "#4F8EF7",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 2,
        elevation: 2,
        color: "#2F326B",
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold',
        letterSpacing: 0.5,
        textAlign: 'center'
    },
});

