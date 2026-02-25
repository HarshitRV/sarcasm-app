import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGetRandomSarcasmQuery } from '@/services/sarcasm/sarcasm.service';
import * as Animatable from 'react-native-animatable';
import { REFETCH_INTERVAL } from '@/constants/constants';
import * as Clipboard from 'expo-clipboard';

import styles from './styles';
import { useEffect, useState } from 'react';
import { Colors } from '@/constants/Colors';

export default function SarcasmCard() {
    const { data, isFetching, refetch, error } = useGetRandomSarcasmQuery();
    const [copied, setCopied] = useState(false);

    const getSarcasmText = () => {
        if (error) {
            return 'Failed to fetch sarcastic comment';
        }
        return data?.sarcasm;
    };

    const copyToClipboard = async () => {
        const text = getSarcasmText();

        if (!text) {
            return;
        }

        if (await Clipboard.setStringAsync(text)) {
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
        }, REFETCH_INTERVAL);

        return () => clearInterval(interval);
    }, [refetch]);

    return (
        <View style={styles.card}>
            <View style={styles.cardHeaderContainer}>
                <Text style={styles.cardHeaderText}>
                    {`Chandler Bing's sarcastic comments`}
                </Text>
            </View>
            <View style={styles.cardContentContainer}>
                <View style={styles.cardContent}>
                    <Animatable.Text
                        animation={isFetching ? undefined : 'lightSpeedIn'}
                        style={styles.sarcasmText}
                    >
                        {getSarcasmText()}
                    </Animatable.Text>
                </View>
                <View style={styles.refreshContainer}>
                    <TouchableOpacity onPress={refetch} activeOpacity={0.7}>
                        <Animatable.View
                            animation={isFetching ? 'rotate' : undefined}
                            iterationCount={'infinite'}
                        >
                            <Ionicons
                                name="refresh"
                                size={24}
                                color={Colors.neon.pink}
                            />
                        </Animatable.View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={copyToClipboard}
                        disabled={isFetching}
                    >
                        <Ionicons
                            name={copied ? 'checkmark' : 'copy'}
                            size={24}
                            color={Colors.neon.green}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
