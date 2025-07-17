import { useState } from "react";
import { View, Text, Switch, TouchableOpacity, Modal, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import { showMessage } from "react-native-flash-message";
import * as Location from 'expo-location';
import {useTheme} from "../../theme/theme-context";
import { useTranslation } from 'react-i18next';

export function LocationPicker({ value, onChange }) {
    const [withLocation, setWithLocation] = useState(!!value);
    const [location, setLocation] = useState(value || null);
    const [address, setAddress] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const { theme } = useTheme();
    const { t } = useTranslation();

    const fetchAddress = async (coords) => {
        setLoading(true);
        let geo = await Location.reverseGeocodeAsync(coords);
        if (geo.length) {
            setAddress(formatAddress(geo[0]));
        } else {
            setAddress(`${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`);
        }
        setLoading(false);
    };

    const handleSwitch = (val) => {
        setWithLocation(val);
        if (!val) {
            setLocation(null);
            setAddress('');
            onChange(null);
        }
    };

    const openMap = async () => {
        setModalVisible(true);
        if (!location) {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                showMessage({
                    message: 'Permission to access location was denied',
                    type: 'danger',
                });
                setModalVisible(false);
                return;
            }
            try {
                let loc = await Location.getCurrentPositionAsync({});
                setLocation(loc.coords);
            } catch (e) {
                showMessage({
                    message: 'Could not get current location',
                    type: 'danger',
                });
                setModalVisible(false);
            }
        }
    };

    const selectOnMap = async (e) => {
        const coords = e.nativeEvent.coordinate;
        setLocation(coords);
        try {
            let geo = await Location.reverseGeocodeAsync(coords);
            let addr = geo.length ? formatAddress(geo[0]) : `${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`;
            setAddress(addr);
            onChange({ ...coords, address: addr });
        } catch (error) {
            showMessage({
                message: 'Could not fetch address',
                type: 'danger',
            });
            onChange(coords);
        }
        setModalVisible(false);
    };

    function formatAddress(geo) {
        if (!geo) return '';

        let parts = [];

        if (geo.street) {
            parts.push(geo.street);
        }

        if (geo.name) {
            let namePart = geo.name;
            if (geo.street && namePart.startsWith(geo.street)) {
                namePart = namePart.replace(geo.street, '').trim();
                if (namePart.startsWith(',')) namePart = namePart.slice(1).trim();
            }
            if (namePart) parts.push(namePart);
        }
        if (geo.city) {
            parts.push(geo.city);
        }
        return parts.join(', ');
    }

    return (
        <>
            <View style={ styles.locationRow }>
                <Text style={[styles.locationLabel, {color: theme.LocationPickerLabel}]}>
                    {t('addLocation')}
                </Text>
                <View style={{ transform: [{ scale: 0.8 }] }}>
                    <Switch
                        value={withLocation}
                        onValueChange={handleSwitch}
                        thumbColor={withLocation ? theme.SwitchThumbOn : theme.SwitchThumbOff}
                        trackColor={{
                            false: theme.SwitchTrackOff,
                            true: theme.SwitchTrackOn,
                        }}
                    />
                </View>
            </View>

            {withLocation && (
                <View style={{ alignItems: 'center', width: '100%' }}>
                    <TouchableOpacity
                        onPress={openMap}
                        disabled={loading}
                    >
                        <Text style={[styles.locationText, {
                            color: theme.LocationPickerTextColor,
                            backgroundColor: theme.LocationPickerBackgroundColor,
                            shadowColor: theme.LocationPickerShadowColor,
                        }]}>
                            {loading
                                ? "Loading..."
                                : address
                                    ? address
                                    : location
                                        ? `${location.latitude.toFixed(5)}, ${location.longitude.toFixed(5)}`
                                        : t('chooseLocation')
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <Modal
                visible={modalVisible}
                transparent animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={ styles.modalOverlay }>
                    <View style={ styles.modalContent }>
                        <Text style={{ fontWeight: 'bold', fontSize: 22, marginBottom: 10 }}>
                            {t('PickLocation')}
                        </Text>
                        <MapView
                            style={{ width: "100%", height: 600, borderRadius: 8 }}
                            initialRegion={{
                                latitude: location?.latitude || 50.4501,
                                longitude: location?.longitude || 30.5234,
                                latitudeDelta: 0.01,
                                longitudeDelta: 0.01,
                            }}
                            onPress={selectOnMap}
                        >
                            {location && (
                                <Marker coordinate={location}/>
                            )}
                        </MapView>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={{ marginTop: 12 }}>
                            <Text style={{ color: '#4F8EF7', fontSize: 22 }}>
                                {t('Cancel')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginBottom: 15,
        width: '100%',
        justifyContent: 'flex-start',
    },
    locationLabel: {
        fontSize: 20,
        marginRight: 5,
        fontFamily: 'Montserrat-Regular',
    },
    locationText: {
        fontSize: 18,
        fontWeight: '600',
        borderRadius: 8,
        marginTop: 0,
        marginBottom: 15,
        paddingHorizontal: 5,
        paddingVertical: 5,
        overflow: "hidden",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        textAlign: "center"
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 10,
        width: '95%',
        maxWidth: 400,
        alignItems: 'center',
    },
});
