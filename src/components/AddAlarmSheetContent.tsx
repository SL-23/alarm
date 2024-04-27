import {Button, StyleSheet, Text, View} from 'react-native';

interface AddAlarmSheetProps {
  timeZone: string;
  onSave?: () => void;
  onClose?: () => void;
}

const AddAlarmSheetContent = ({
  timeZone,
  onClose,
  onSave,
}: AddAlarmSheetProps) => {
  return (
    <View style={styles.headerContainer}>
      <Button color="orange" title="Cancel" onPress={onClose} />
      <Text style={{color: 'white', fontWeight: '600'}}>
        Add alarm at {timeZone}
      </Text>
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
  },
});
export default AddAlarmSheetContent;
