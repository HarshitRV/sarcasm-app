import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export const setAuthToken = async (authToken: string) => {
    if (Platform.OS === 'web') {
        localStorage.setItem('authToken', authToken);
        return;
    }

    await SecureStore.setItemAsync('authToken', authToken);
};

export const getAuthToken = async () => {
    if (Platform.OS === 'web') {
        return localStorage.getItem('authToken');
    }

    return await SecureStore.getItemAsync('authToken');
};

export const removeAuthToken = async () => {
    if (Platform.OS === 'web') {
        localStorage.removeItem('authToken');
        return;
    }

    await SecureStore.deleteItemAsync('authToken');
};
