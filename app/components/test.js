import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Animated,
    LayoutAnimation,
    Platform,
    UIManager,
  } from 'react-native';
  import { useState, useEffect, useRef } from 'react';
  
  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  
  export default function TestApp() {
    const [enteredGoal, setEnteredGoal] = useState('');
    const [courseGoals, setCourseGoals] = useState([]);
    const buttonScale = useRef(new Animated.Value(1)).current;
    const inputAnim = useRef(new Animated.Value(0)).current;
    const listAnim = useRef(new Animated.Value(0)).current; // For list container animation
  
    useEffect(() => {
      Animated.spring(inputAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }).start();
  
      // Animate list container after a short delay (optional)
      Animated.spring(listAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
        delay: 150,
      }).start();
    }, []);
  
    const animateButton = (toValue) => {
      Animated.spring(buttonScale, {
        toValue,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };
  
    const addGoalHandler = () => {
      if (enteredGoal.trim().length === 0) return;
  
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCourseGoals((currentGoals) => [
        ...currentGoals,
        {
          text: enteredGoal,
          id: Math.random().toString(),
          isEditing: false, // not in edit mode by default
        },
      ]);
      setEnteredGoal('');
    };
  
    const deleteGoalHandler = (id) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setCourseGoals((currentGoals) =>
        currentGoals.filter((goal) => goal.id !== id)
      );
    };
  
    const startEditGoal = (id) => {
      setCourseGoals((currentGoals) =>
        currentGoals.map((goal) =>
          goal.id === id
            ? { ...goal, isEditing: true, editText: goal.text }
            : goal
        )
      );
    };
  
    const handleEditChange = (id, newText) => {
      setCourseGoals((currentGoals) =>
        currentGoals.map((goal) =>
          goal.id === id ? { ...goal, editText: newText } : goal
        )
      );
    };
  
    const updateGoalHandler = (id) => {
      setCourseGoals((currentGoals) =>
        currentGoals.map((goal) => {
          if (goal.id === id) {
            // Only update if there is non-empty text
            const updatedText =
              goal.editText && goal.editText.trim().length > 0
                ? goal.editText
                : goal.text;
            return { ...goal, text: updatedText, isEditing: false, editText: undefined };
          }
          return goal;
        })
      );
    };
  
    const cancelEditGoal = (id) => {
      setCourseGoals((currentGoals) =>
        currentGoals.map((goal) =>
          goal.id === id ? { ...goal, isEditing: false, editText: undefined } : goal
        )
      );
    };
  
    const renderGoalItem = (itemData) => {
      const { item } = itemData;
      return (
        <Animated.View
          style={[
            styles.goalItem,
            {
              opacity: inputAnim,
              transform: [
                {
                  translateX: inputAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-100, 0],
                  }),
                },
              ],
            },
          ]}
        >
          {item.isEditing ? (
            // Editable view
            <>
              <TextInput
                style={[styles.textInput, { flex: 1, marginRight: 10 }]}
                value={item.editText}
                onChangeText={(newText) => handleEditChange(item.id, newText)}
              />
              <TouchableOpacity
                style={[styles.editButton, { backgroundColor: '#32CD32' }]}
                onPress={() => updateGoalHandler(item.id)}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.editButton, { backgroundColor: '#FF6347' }]}
                onPress={() => cancelEditGoal(item.id)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            // Read-only view
            <>
              <Text style={styles.goalText}>{item.text}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => startEditGoal(item.id)}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteGoalHandler(item.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Animated.View>
      );
    };
  
    return (
      <View style={styles.appContainer}>
        <Animated.View
          style={[
            styles.inputContainer,
            {
              opacity: inputAnim,
              transform: [
                {
                  translateY: inputAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <TextInput
            style={styles.textInput}
            placeholder="Your Course Goal!"
            placeholderTextColor="#999"
            value={enteredGoal}
            onChangeText={setEnteredGoal}
          />
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={addGoalHandler}
              onPressIn={() => animateButton(0.95)}
              onPressOut={() => animateButton(1)}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Add Goal</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
  
        {/* Animated scrollable container for the goals list */}
        <Animated.View
          style={[
            styles.goalsContainer,
            {
              opacity: listAnim,
              transform: [
                {
                  translateY: listAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.sectionTitle}>List of Goals</Text>
          <FlatList
            data={courseGoals}
            renderItem={renderGoalItem}
            keyExtractor={(item) => item.id}
            // FlatList is scrollable by default, but you can adjust the style if needed:
            contentContainerStyle={styles.listContentContainer}
          />
        </Animated.View>
      </View>
      
    );
  }
  
  const styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      paddingTop: 60,
      paddingHorizontal: 20,
      backgroundColor: '#F5F5F5',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 30,
    },
    textInput: {
      flex: 1,
      backgroundColor: '#FFF',
      borderColor: '#FFD700',
      borderWidth: 2,
      borderRadius: 12,
      padding: 16,
      fontSize: 16,
      marginRight: 10,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    addButton: {
      backgroundColor: '#FFD700',
      paddingVertical: 14,
      paddingHorizontal: 24,
      borderRadius: 12,
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    buttonText: {
      color: '#333',
      fontSize: 16,
      fontWeight: '600',
    },
    goalsContainer: {
      flex: 1,
      // Optional: If you want to limit the list height,
      // you could add a maxHeight here, for example:
      // maxHeight: 400,
    },
    listContentContainer: {
      paddingBottom: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
    },
    goalItem: {
      backgroundColor: '#FFF',
      borderRadius: 12,
      padding: 20,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    goalText: {
      fontSize: 16,
      color: '#444',
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    editButton: {
      backgroundColor: '#FFD700',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      marginLeft: 5,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    deleteButton: {
      backgroundColor: '#FF6347',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 8,
      marginLeft: 5,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
  });
  