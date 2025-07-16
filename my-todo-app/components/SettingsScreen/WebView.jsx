import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

export function ProjectWebView() {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView
                source={{ uri: 'https://github.com/danyil-filipchuk/Internship-TenThousand/tree/main/my-todo-app' }}
                style={ styles.webView }
                startInLoadingState={true}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    webView: {
        flex: 1,
        borderRadius: 14,
        margin: 8,
    }
});
