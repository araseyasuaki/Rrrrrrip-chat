import { Stack } from 'expo-router';
import { RecoilRoot } from 'recoil';

export default function RootLayout() {
  return (
    <RecoilRoot>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="create" />
      </Stack>
    </RecoilRoot>
  );
}