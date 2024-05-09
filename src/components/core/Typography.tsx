import {PropsWithChildren} from 'react';
import {Text, TextStyle} from 'react-native';
import {colorHelper} from './theme';

type TextVariant = 'large' | 'h1' | 'subtitle' | 'body' | 'caption';

const fontSizes: {[key in TextVariant]: number} = {
  large: 64,
  h1: 36,
  subtitle: 24,
  body: 16,
  caption: 14,
};

const fontWeights: {[key in TextVariant]: number} = {
  large: 600,
  h1: 600,
  subtitle: 600,
  body: 400,
  caption: 400,
};

interface InlineProps extends PropsWithChildren {
  style?: TextStyle;
  variant: TextVariant;
  color: string;
}
const Typography = ({children, style, variant, color}: InlineProps) => (
  <Text
    style={
      {
        fontSize: fontSizes[variant],
        fontWeight: fontWeights[variant],
        color: colorHelper(color),
        ...style,
      } as TextStyle
    }>
    {children}
  </Text>
);

export default Typography;
