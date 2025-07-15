import React from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { DeviceInfo } from "../components/SettingsScreen/DeviceInfo";

export function SettingsScreen({ navigation }) {
    return (
        <LinearGradient
            colors={['#e0ecff', '#f7faff', '#fff']}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={ styles.container }>
                <View style={ styles.bottomBlocks }>
                    <View style={ styles.webViewBlock }>
                        <Text style={ styles.webViewText }>
                            Detailed code of this project
                        </Text>
                        <TouchableOpacity
                            style={ styles.webViewButton }
                            onPress={() => navigation.navigate('ProjectWebView')}
                        >
                            <Text style={ styles.webViewButtonText }>View on GitHub</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.deviceInfoBlock }>
                        <DeviceInfo />
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    bottomBlocks: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    deviceInfoBlock: {
        width: '94%',
        borderRadius: 14,
        padding: 20,
        borderWidth: 1.5,
        borderColor: '#232A3D',
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignSelf: 'center',
        shadowColor: "#6E9DF7",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 3,
    },
    webViewBlock: {
        width: '94%',
        alignItems: 'center',
        padding: 20,
        borderRadius: 14,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderWidth: 1.5,
        borderColor: '#232A3D',
        marginBottom: 16,
        shadowColor: "#6E9DF7",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.10,
        shadowRadius: 8,
        elevation: 3,
    },
    webViewText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#222',
        textAlign: 'center',
        marginBottom: 16,
        fontFamily: 'Montserrat-SemiBold',
    },
    webViewButton: {
        backgroundColor: '#4F8EF7',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 32,
        marginBottom: 4,
    },
    webViewButtonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-SemiBold',
        letterSpacing: 0.3,
    },
});
