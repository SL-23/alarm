import {Button, StyleSheet, Text, View} from 'react-native';

interface SheetHeaderProps {
  onClose: () => void;
  onSave: () => void;
  heading?: string;
}

const SheetHeader = ({onClose, onSave, heading}: SheetHeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <Button color="orange" title="Cancel" onPress={onClose} />
      {heading && (
        <Text style={{color: 'white', fontWeight: '600'}}>{heading}</Text>
      )}
      <Button color="orange" title="Save" onPress={onSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default SheetHeader;
