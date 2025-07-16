import { useState } from "react";
import { Switch, Text, View, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from "../../theme/theme-context"

// для камери
// ImagePicker.launchCameraAsync

export function PhotoPicker({ value, onChange }) {
    const [withPhoto, setWithPhoto] = useState(!!value);
    const { theme } = useTheme();

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            setWithPhoto(false);
            onChange(null);
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled && result.assets?.[0]?.uri) {
            onChange(result.assets[0].uri);
        } else {
            setWithPhoto(false);
            onChange(null);
        }
    };

    const handleSwitch = (val) => {
        setWithPhoto(val);
        if (!val) {
            onChange(null);
        } else {
            pickImage().catch(e => console.log(e));
        }
    };

    return (
        <View style={ styles.photoRow }>
            <Text style={[styles.photoLabel, {color: theme.PhotoPickerLabel}]}>add photo</Text>
            <View style={{ transform: [{ scale: 0.8 }] }}>
                <Switch
                    style={ styles.switch }
                    value={withPhoto}
                    onValueChange={handleSwitch}
                    thumbColor={withPhoto ? theme.SwitchThumbOn : theme.SwitchThumbOff}
                    trackColor={{
                        false: theme.SwitchTrackOff,
                        true: theme.SwitchTrackOn,
                    }}
                />
            </View>

            {withPhoto && value && (
                <View style={[styles.chosenBlock, {
                    backgroundColor: theme.PhotoPickerBlockBackgroundColor,
                    shadowColor: theme.PhotoPickerBlockShadowColor,
                }]}>
                    <Text style={[styles.chosenText, {color: theme.PhotoPickerTextColor}]}>
                        photo chosen
                    </Text>
                    <Text style={styles.checkMark}>✅</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    photoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 24,
        width: '100%',
        justifyContent: 'flex-start',
    },
    photoLabel: {
        fontSize: 20,
        fontFamily: 'Montserrat-Regular',
        marginRight: 5,
    },
    switch: {
        marginRight: 5,
    },
    chosenBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 5,
        paddingVertical: 5,
        overflow: "hidden",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    chosenText: {
        fontSize: 19,
        fontWeight: '600',
    },
    checkMark: {
        fontSize: 16,
        marginLeft: 5,
    }
})