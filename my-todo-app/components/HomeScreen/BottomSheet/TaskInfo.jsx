import TimerIcon from "../../../assets/images/IconTimer.svg";
import { formatDate } from "../../../utils/formatDate";
import MapPinIcon from "../../../assets/images/IconMapPin.svg";
import PhoneIcon from "../../../assets/images/IconPhone.svg";
import PhotoIcon from "../../../assets/images/IconPhoto.svg";
import { Text, View, StyleSheet, Image } from "react-native";
import { useTheme } from "../../../theme/theme-context";

export function TaskInfo({ selectedTask }) {
    const { theme } = useTheme();

    let info = [];

    if (selectedTask) {
        info = [
            {
                icon: <TimerIcon color={theme.IconColor}/>,
                label: 'Deadline',
                value: selectedTask.deadline
                    ? formatDate(selectedTask.deadline)
                    : 'Whenever you want !',
            },
            {
                icon: <MapPinIcon color={theme.IconColor}/>,
                label: 'Location',
                value: selectedTask.location?.address
                    || (selectedTask.location
                        ? `${selectedTask.location.latitude?.toFixed(5)}, ${selectedTask.location.longitude?.toFixed(5)}`
                        : 'Anywhere !'),
            },
            {
                icon: <PhoneIcon color={theme.IconColor}/>,
                label: 'Contact',
                value: selectedTask.contact?.name || 'Just you !',
            },
            {
                icon: <PhotoIcon color={theme.IconColor}/>,
                label: 'Photo',
                value: selectedTask.photo ? (
                    <Image
                        source={{ uri: selectedTask.photo }}
                        style={ styles.photo }
                    />
                ) : 'No photo',
            },
        ];
    }

    return (
        <View>
            {info.map((item, idx) => (
                <View key={idx} style={ styles.row }>
                    {item.icon}
                    <Text style={[styles.label, {color: theme.BottomSheetLabelColor}]}>
                        {item.label}:
                    </Text>
                    <Text style={[styles.value, {color: theme.BottomSheetValueColor}]} numberOfLines={3} ellipsizeMode="tail">
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
        fontSize: 20,
        fontWeight: "600",
        minWidth: 90,
        textAlign: 'left',
        flexShrink: 0,
    },
    value: {
        fontSize: 19,
        flex: 1,
        fontFamily: 'Montserrat-Medium',
        flexWrap: 'wrap',
        lineHeight: 22,
        textAlign: 'left',
    },
    photo: {
        width: 200,
        height: 180,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#C3D1E7",
    },
})