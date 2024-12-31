import { View, Text } from 'react-native';
import styles from './styles';

interface CardProps {
	comment: string;
}

export default function Card({ comment }: CardProps) {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{comment}</Text>
		</View>
	);
}
