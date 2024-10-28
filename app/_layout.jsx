import { Stack } from 'expo-router';
import { RecoilRoot } from 'recoil';

export default function RootLayout() {

  const arase = false

  return (
    <RecoilRoot>
      <Stack screenOptions={{
        headerShown: false,
        animation: arase ? 'slide_from_right' : 'slide_from_left', // araseがtrueなら右から左、falseなら左から右
        gestureDirection: 'horizontal',
        animationTypeForReplace: arase ? 'push' : 'pop',
      }}>
        <Stack.Screen name="index" />
      </Stack>
    </RecoilRoot>
  );
}