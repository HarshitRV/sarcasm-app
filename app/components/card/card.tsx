import { Colors } from '@/constants/Colors';
import { Text, StyleSheet, useColorScheme } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface CardProps {
    comment: string;
}

export default function Card({ comment }: CardProps) {
    const colorScheme = useColorScheme();

    const textStyles = [
        styles.text,
        colorScheme === 'dark'
            ? { color: Colors.dark.text }
            : { color: Colors.light.text },
    ];

    return (
        <Animatable.View animation={'fadeInDown'} style={styles.container}>
            <Text style={textStyles}>{comment}</Text>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    text: {
        textAlign: 'justify',
        fontFamily: 'SpaceMono',
    },
});
