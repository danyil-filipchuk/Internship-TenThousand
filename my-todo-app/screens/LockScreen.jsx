import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

// const [isAuthenticated, setIsAuthenticated] = useState(false);
//
// if(!isAuthenticated) {
//     return <LockScreen onUnlock={() => setIsAuthenticated(true)}/>
// }

export function LockScreen({ onUnlock }) {
    const [error, setError] = useState(null);

    const handleUnlock = async () => {
        setError(null);

        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const supported = await LocalAuthentication.isEnrolledAsync();

        if(!hasHardware || !supported) {
            setError('FaceID/TouchID are not available on this device');
            return;
        }

        const result = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Log in with FaceID / TouchID',
        });

        if (result.success) {
            onUnlock();
        } else {
            setError('Failed to log in');
        }
    }

    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>The app is protected</Text>
            <Button title='Unlock' onPress={handleUnlock} />
            {error && <Text style={ styles.error }>{error}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
    },
    title: {
        fontSize: 26,
        marginBottom: 16,
        fontWeight: 'bold'
    },
    error: {
        color: 'red',
        marginTop: 12
    }
});

