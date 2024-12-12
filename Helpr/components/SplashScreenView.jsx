import { Image, StyleSheet, View } from "react-native";

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/icon.png')} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: "cover",
    },
});
