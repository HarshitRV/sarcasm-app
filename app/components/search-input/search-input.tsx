import { useState } from 'react';
import { View, TextInput } from 'react-native';
import styles from './styles';

interface SearchInputProps {
	onChangeText: (text: string) => void;
	value: string;
	placeholder?: string;
}
export default function SearchInput({
	onChangeText,
	value,
	placeholder,
}: SearchInputProps) {
	const [borderColor, setBorderColor] = useState('#fff');

	return (
		<View>
			<TextInput
				style={[styles.input, { borderColor }]}
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor="#fff"
				onFocus={() => setBorderColor('#ff0')}
				onBlur={() => setBorderColor('#fff')}
			/>
		</View>
	);
}
