import { Text } from 'react-native';
import styles from './styles';
import * as Animatable from 'react-native-animatable';

interface CardProps {
	comment: string;
}

export default function Card({ comment }: CardProps) {
	return (
		<Animatable.View
			animation={'fadeInDown'}
			style={styles.container}>
			<Text style={styles.text}>{comment}</Text>
		</Animatable.View>
	);
}
