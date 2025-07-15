import TimerIcon from "../../../assets/images/TimerIcon.svg";
import { formatDate } from "../../../utils/formatDate";
import MapPinIcon from "../../../assets/images/MapPinIcon.svg";
import PhoneIcon from "../../../assets/images/PhoneIcon.svg";
import { Text, View, StyleSheet } from "react-native";

export function TaskInfo({ selectedTask }) {
    console.log(selectedTask);

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
        <View>
            {info.map((item, idx) => (
                <View key={idx} style={ styles.row }>
                    {item.icon}
                    <Text style={ styles.label }>{item.label}:</Text>
                    <Text style={ styles.value } numberOfLines={3} ellipsizeMode="tail">
                        {item.value}
                    </Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
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
        flex: 1,
        fontFamily: 'Montserrat-Medium',
        flexWrap: 'wrap',
        lineHeight: 22,
        textAlign: 'left',
    },
})