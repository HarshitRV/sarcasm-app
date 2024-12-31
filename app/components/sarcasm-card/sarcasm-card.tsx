import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGetRandomSarcasmQuery } from '@/app/services/sarcasm/sarcasm.service';

import styles from './styles';

export default function SarcasmCard() {
	const { data, isFetching, refetch, error } = useGetRandomSarcasmQuery();

	const getSarcasmText = () => {
		if (isFetching) {
			return 'Loading...';
		}
		if (error) {
			return 'Failed to fetch sarcasm';
		}
		return data?.sarcasm;
	};

	return (
		<View style={styles.card}>
			<View style={styles.cardHeaderContainer}>
				<Text style={styles.cardHeaderText}>
					Chandler Bing's sarcastic comments
				</Text>
			</View>
			<View style={styles.cardContentContainer}>
				<View style={styles.cardContent}>
					<Text style={styles.sarcasmText}>{getSarcasmText()}</Text>
				</View>
				<View style={styles.refreshContainer}>
					<TouchableOpacity
						onPress={refetch}
						activeOpacity={0.7}>
						<Ionicons
							name="refresh"
							size={24}
							color="pink"
						/>
					</TouchableOpacity>
					<TouchableOpacity>
						<Ionicons
							name="copy"
							size={24}
							color="green"
						/>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}
