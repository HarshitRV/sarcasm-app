import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import Card from '../card/card';
import { useGetAllSarcasmQuery } from '@/services/sarcasm/sarcasm.service';
import SearchInput from '../search-input/search-input';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { handleApiError } from '@/common/handle-api-error';

export default function AllSarcasms() {
    const colorScheme = useColorScheme();

	const textStyles = [
		styles.text,
		colorScheme === 'dark' ? styles.textDark : styles.textLight,
	];

	// const headerStyles = [
	// 	styles.header,
	// 	colorScheme === 'dark' ? styles.containerDark : styles.containerLight,
	// ]

    let { data, refetch, isFetching, error } = useGetAllSarcasmQuery();

    const [search, setSearch] = useState('');

    if (data) {
        data = data.filter(comment =>
            comment.sarcasm.toLowerCase().includes(search.toLowerCase()),
        );
    }

    const handleOnChangeText = (text: string) => {
        setSearch(text);
    };

    if (error) {
        handleApiError(error);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={textStyles}>All Sarcastic Comments</Text>
                <SearchInput
                    onChangeText={handleOnChangeText}
                    value={search}
                    placeholder="Search for a comment"
                />
            </View>
            <FlatList
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="none"
                data={data ? data.reverse() : []}
                keyExtractor={comment => comment._id}
                renderItem={({ item }) => <Card comment={item.sarcasm} />}
                refreshControl={
                    <RefreshControl
                        refreshing={isFetching}
                        onRefresh={refetch}
                    />
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 100,
    },
    text: { fontSize: 25, fontFamily: 'SpaceMono' },
    textLight: {
        color: Colors.light.text,
    },
    textDark: {
        color: Colors.dark.text,
    },
    header: {
        marginBottom: 10,
    },
});
