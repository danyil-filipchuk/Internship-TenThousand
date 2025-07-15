import { useState } from "react";
import { Switch, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { formatDate } from "../../utils/formatDate";

export function DeadlinePicker({ value, onChange }) {

    const [withDeadline, setWithDeadline] = useState(!!value);
    const [date, setDate] = useState(new Date());
    const [pickerVisible, setPickerVisible] = useState(false);

    const confirmDate = (selectedDate) => {
        setPickerVisible(false);
        if (selectedDate) {
            setDate(selectedDate);
            onChange(selectedDate);
        }
    };

    const handleSwitch = (val) => {
        setWithDeadline(val);
        !val ? onChange(null) : onChange(date);
    }

    return (
        <View style={ styles.deadlineRow }>
            <Text style={ styles.deadlineLabel }>add deadline</Text>
            <View style={{ transform: [{ scale: 0.8 }] }}>
                <Switch
                    value={withDeadline}
                    onValueChange={handleSwitch}
                    thumbColor={withDeadline ? "#4F8EF7" : "#fff"}
                    trackColor={{ false: "#ccc", true: "#B3D2FF" }}
                />
            </View>
            {withDeadline && (
                <>
                    <TouchableOpacity onPress={() => setPickerVisible(true)}>
                        <Text style={ styles.dateText }>
                            {formatDate(date)}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={pickerVisible}
                        mode="date"
                        date={date}
                        onConfirm={confirmDate}
                        onCancel={() => setPickerVisible(false)}
                        minimumDate={new Date(2000, 0, 1)}
                        maximumDate={new Date(2100, 11, 31)}
                    />
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    deadlineRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        width: '100%',
        justifyContent: 'flex-start',
    },
    deadlineLabel: {
        fontSize: 20,
        color: "#222",
        fontFamily: 'Montserrat-Regular',
        marginRight: 5,
    },
    dateText: {
        fontSize: 18,
        color: "#4F8EF7",
        fontWeight: '600',
        backgroundColor: "#e7f0ff",
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginLeft: 12,
        overflow: "hidden",
        shadowColor: "#4F8EF7",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    }
})