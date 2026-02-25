import { Text, type TextProps, View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type ThemedTextProps = TextProps & ThemeProps & {
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link' | 'header';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'header' ? styles.header : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

export function ThemedView({ style, lightColor, darkColor, ...rest }: ViewProps & ThemeProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...rest} />;
}

const styles = {
  default: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'SpaceMono',
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600' as const,
    fontFamily: 'SpaceMono',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    lineHeight: 32,
    fontFamily: 'SpaceMono',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    fontFamily: 'SpaceMono',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
    fontFamily: 'SpaceMono',
  },
  header: {
    fontSize: 25,
    fontFamily: 'SpaceMono',
  },
};
