import { StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AllSarcasms from '../components/all-comments/all-sarcasms';
import { Colors } from '@/constants/Colors';

export default function Sarcasms() {
    const colorScheme = useColorScheme();

    const containerStyle = [
        styles.container,
        colorScheme === 'dark' ? styles.containerDark : styles.containerLight,
    ];

    return (
        <SafeAreaView style={containerStyle}>
            <AllSarcasms />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        height: '100%',
        paddingLeft: 10,
        paddingRight: 10,
    },
    containerDark: {
        backgroundColor: Colors.dark.background,
    },
    containerLight: {
        backgroundColor: Colors.light.background,
    },
});