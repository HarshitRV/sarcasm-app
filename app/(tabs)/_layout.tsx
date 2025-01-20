import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: Colors.focus.purple }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'home-sharp' : 'home-outline'}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="sarcasms"
                options={{
                    title: 'All Sarcasms',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => {
                        if (focused) {
                            return (
                                <AntDesign
                                    name="aliwangwang"
                                    size={24}
                                    color={color}
                                />
                            );
                        }
                        return (
                            <AntDesign
                                name="aliwangwang-o1"
                                size={24}
                                color={color}
                            />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="add-sarcasm"
                options={{
                    title: 'Add Sarcasm',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'add-circle' : 'add-circle-outline'}
                            color={color}
                            size={24}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
