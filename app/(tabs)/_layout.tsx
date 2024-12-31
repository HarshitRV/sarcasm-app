import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
	return (
		<Tabs>
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
				name="comments"
				options={{
					title: 'All Comments',
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
		</Tabs>
	);
}
