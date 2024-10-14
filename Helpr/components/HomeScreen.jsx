import { Button, Image, StyleSheet, Text, View } from "react-native";
import Profile from '../assets/me.jpg';
import Volunteer from '../assets/volunteer.png'
;

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <View style={styles.profileContainer}>
                    <Image
                        source={Profile}
                        style={styles.profile}
                    />
                    <View>
                        <Text style={styles.name}>Harshini</Text>
                        <Text style={styles.location}>Current Location</Text>
                    </View>
                </View>
                <View style={styles.profileContainer}>
                    <Image
                        source={Volunteer}
                        style={styles.volunteer}
                    />
                </View>
            </View>
            <View style={styles.map}>

            </View>
            <View style={styles.sosMain}>
                <Text style={[styles.sosText, styles.white]}>SOS</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignSelf: 'stretch',
        backgroundColor: '#000',
        padding: 25,
        paddingBottom: 10
    },
    white: {
        color: '#fff',
    },
    nav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    },
    profile: {
        width: 48,
        height:48,
        borderRadius: 50
    },
    name: {
        color: '#fff',
        fontWeight: '500',
        fontSize: 14
    },
    location: {
        color: '#fff',
        opacity: 0.7,
        fontSize: 12
    },
    profileContainer: {
        flexDirection: 'row',
        gap: 15,
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    map: {
        width: '100%',
        height: '75%',
        backgroundColor: '#fff',
        borderRadius: 16
    },
    sosMain: {
        backgroundColor: '#C70039',
        padding: 10,
        borderRadius: 28,
    },
    sosText: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: '500',
        letterSpacing: 2
    },
    volunteer: {
        width:48,
        height:48,
    },
})