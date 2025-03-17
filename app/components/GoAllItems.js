import { View, StyleSheet, Text } from 'react-native';

function GoalItem(props) {
  return (
    <View style={styles.goalItems}>
      <Text style={styles.goalText}>{props.text}</Text>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItems: {
    margin: 8,
    padding: 8,
    borderRadius: 5,
    backgroundColor: 'yellow',
  },
  goalText: {
    color: 'blue',
  },
});
