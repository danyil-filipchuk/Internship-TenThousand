import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Modalize } from "react-native-modalize";
import { ShareTask } from "./ShareTask";
import {TaskInfo} from "./TaskInfo";
import { useTheme } from "../../../theme/theme-context";
import { useTranslation } from 'react-i18next';

export function BottomSheet({ modalizeRef, selectedTask, handleCloseSheet, stopModalize }) {
    const { theme } = useTheme();
    const { t } = useTranslation();

    return (
        <Modalize
            ref={modalizeRef}
            adjustToContentHeight
            onClose={handleCloseSheet}
        >
            <View style={[styles.sheet, {
                borderColor: theme.BottomSheetBorderColor,
                shadowColor: theme.BottomSheetShadowColor,
                backgroundColor: theme.BottomSheetBackgroundColor,
            }]}>

                <ShareTask selectedTask={selectedTask} />

                <TaskInfo selectedTask={selectedTask} />

                <TouchableOpacity onPress={stopModalize}>
                    <Text style={[styles.close, {
                        color: theme.BottomSheetCloseColor,
                        shadowColor: theme.BottomSheetCloseShadowColor,
                        backgroundColor: theme.BottomSheetCloseBackgroundColor,
                    }]}>
                        {t('Close')}
                    </Text>
                </TouchableOpacity>

            </View>
        </Modalize>
    );
}

const styles = StyleSheet.create({
    sheet: {
        paddingVertical: 20,
        paddingHorizontal: 10,
        alignItems: "stretch",
        borderWidth: 1.5,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 3,
    },
    close: {
        marginTop: 20,
        marginBottom: 20,
        alignSelf: 'center',
        paddingVertical: 8,
        paddingHorizontal: 25,
        borderRadius: 6,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.12,
        shadowRadius: 2,
        elevation: 2,
        fontSize: 20,
        fontWeight: '600',
        fontFamily: 'Montserrat-SemiBold',
        letterSpacing: 0.5,
        textAlign: 'center'
    },
});

