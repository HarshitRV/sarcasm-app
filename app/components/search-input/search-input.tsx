import { Colors } from '@/constants/Colors';
import { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, useColorScheme } from 'react-native';

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
    const colorScheme = useColorScheme();
    const [borderStyles, setBorderStyles] = useState<{
        color: string;
        width: number;
    }>({
        color:
            colorScheme === 'dark'
                ? Colors.dark.defaultBorderColor
                : Colors.light.defaultBorderColor,
        width: 1,
    });

    const textInputStyles = [
        styles.input,
        { borderColor: borderStyles.color, borderWidth: borderStyles.width },
        colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
    ];

    const getBorderFocusColor = () => {
        return Colors.focus.purple;
    };

    const getBorderColorBlur = () => {
        return colorScheme === 'dark'
            ? Colors.dark.defaultBorderColor
            : Colors.light.defaultBorderColor;
    };

    useEffect(() => {
        setBorderStyles({
            color:
                colorScheme === 'dark'
                    ? Colors.dark.defaultBorderColor
                    : Colors.light.defaultBorderColor,
            width: 1,
        });
    }, [colorScheme]);

    return (
        <View>
            <TextInput
                style={textInputStyles}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={
                    colorScheme === 'dark'
                        ? Colors.dark.placeHolderText
                        : Colors.light.placeHolderText
                }
                onFocus={() =>
                    setBorderStyles({ color: getBorderFocusColor(), width: 3 })
                }
                onBlur={() =>
                    setBorderStyles({ color: getBorderColorBlur(), width: 1 })
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    inputDark: {
        color: Colors.dark.text,
    },
    inputLight: {
        color: Colors.light.text,
    },
});
