import {PropsWithChildren, useRef, useState} from 'react';
import {Animated, Modal, View, ViewStyle} from 'react-native';
import SheetHeader from './SheetHeader';

interface StackProps extends PropsWithChildren {
  style?: ViewStyle;
  open: boolean;
  height: number;
  onClose: () => void;
  onSave: () => void;
  heading?: string;
}
const Sheet = ({
  children,
  style,
  open,
  height,
  onClose,
  onSave,
  heading,
}: StackProps) => {
  const [touchStartPos, setTouchStartPos] = useState(0);
  const [touchMovement, setTouchMovement] = useState(0);
  const [sheetHeight, setSheetHeight] = useState(height);
  const fadeOutAnim = useRef(new Animated.Value(1)).current;

  return (
    <Modal
      transparent={true}
      visible={open}
      style={{
        ...style,
      }}>
      <Animated.View
        onMoveShouldSetResponder={() => true}
        onTouchStart={e => {
          e.stopPropagation();

          setTouchStartPos(e.nativeEvent.pageY);
        }}
        onTouchMove={e => {
          e.stopPropagation();
          const touchEndPos = e.nativeEvent.pageY;
          setTouchMovement(touchEndPos - touchStartPos);
          setSheetHeight(height - touchMovement);
        }}
        onTouchEnd={e => {
          e.stopPropagation();

          if (touchMovement > 30) {
            onClose();
            Animated.timing(fadeOutAnim, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }).start();
          }
          setTimeout(() => {
            setSheetHeight(height);
          }, 100);
        }}
        style={{
          opacity: fadeOutAnim,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: Math.min(height, sheetHeight),
          backgroundColor: '#1f1f1f',
          borderRadius: 16,
          padding: 8,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          ...style,
        }}>
        <View
          style={{
            height: 4,
            width: 40,
            backgroundColor: 'white',
            opacity: 0.5,
            borderRadius: 4,
          }}
        />
        <SheetHeader heading={heading} onClose={onClose} onSave={onSave} />
        {children}
      </Animated.View>
    </Modal>
  );
};

export default Sheet;
