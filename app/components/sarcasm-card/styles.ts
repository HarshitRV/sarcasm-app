import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        textAlign: 'center',
    },
    sarcasmText: {
        fontFamily: 'SpaceMono',
        fontSize: 20,
        color: '#fff',
    },
    card: {
        width: '100%',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    cardHeaderContainer: {
        padding: 5,
        borderBottomWidth: 1,
        borderTopColor: 'none',
        borderBottomColor: 'gray',
    },
    cardHeaderText: {
        color: 'yellow',
        fontWeight: 'bold',
    },
    cardContentContainer: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 30,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    refreshContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
        gap: 30,
    },
});

export default styles;
