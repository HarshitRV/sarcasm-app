import * as SecureStore from 'expo-secure-store';

export const setAuthToken = async (authToken: string) => {
    await SecureStore.setItemAsync('authToken', authToken);
};

export const getAuthToken = async () => {
    return await SecureStore.getItemAsync('authToken');
};

export const removeAuthToken = async () => {
    await SecureStore.deleteItemAsync('authToken');
};
