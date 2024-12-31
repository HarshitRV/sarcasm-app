import { Alert } from "react-native";

export default async function errorAlert(
    error: unknown,
) {
    if (error instanceof Response) {
        const { message } = await error.json();
        Alert.alert(message);
    } else if (error instanceof Error) {
        Alert.alert(error.message);
    }

    Alert.alert('Something went wrong!');
};