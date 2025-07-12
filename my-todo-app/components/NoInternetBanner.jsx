import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { Text, View, StyleSheet } from "react-native";

export function NoInternetBanner() {
    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => unsubscribe();
    }, []);

    return (
        !isConnected && (
        <View style={ styles.banner }>
            <Text style={ styles.text }>NO INTERNET CONNECTION</Text>
        </View>
    )
    );
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: "#ff3b30",
        padding: 8,
        alignItems: 'center',
        marginBottom: 8,
        borderRadius: 8,
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 15,
    }
})