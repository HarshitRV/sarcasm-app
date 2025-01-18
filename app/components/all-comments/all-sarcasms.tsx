import { FlatList, RefreshControl, Text, View } from 'react-native';
import Card from '../card/card';
import { useGetAllSarcasmQuery } from '@/services/sarcasm/sarcasm.service';
import errorAlert from '../utils';
import styles from './styles';
import SearchInput from '../search-input/search-input';
import { useState } from 'react';

export default function AllSarcasms() {
	let { data, refetch, isFetching, error } = useGetAllSarcasmQuery();

	const [search, setSearch] = useState('');

	if (data) {
		data = data.filter((comment) =>
			comment.sarcasm.toLowerCase().includes(search.toLowerCase())
		);
	}

	const handleOnChangeText = (text: string) => {
		setSearch(text);
	};

	if (error) {
		errorAlert(error);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.text}>All Sarcastic Comments</Text>
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
				keyExtractor={(comment) => comment._id}
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
