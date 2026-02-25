import { StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontSize: 18,
        fontFamily: 'SpaceMono',
        borderWidth: 1,
        padding: 12,
        width: '100%',
        borderRadius: 12,
        marginBottom: 16,
    },
    button: {
        padding: 14,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: Colors.primary.purple,
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'SpaceMono',
        color: '#fff',
        fontWeight: 'bold',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    }
});
