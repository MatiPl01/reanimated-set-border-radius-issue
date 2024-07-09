import {View, TouchableNativeFeedback, StyleSheet} from 'react-native';
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Animated from 'react-native-reanimated';
import {NavigationContainer} from '@react-navigation/native';

type ParamList = {
  Screen1?: object;
  Screen2: {
    title: string;
    sharedTransitionTag: string;
  };
};

const Stack = createNativeStackNavigator<ParamList>();

interface CardProps {
  navigation: NativeStackNavigationProp<ParamList>;
  title: string;
  transitionTag: string;
  isOpen?: boolean;
  nextScreen: keyof ParamList;
}

function Card({
  navigation,
  title,
  transitionTag,
  isOpen = false,
  nextScreen,
}: CardProps) {
  const goNext = (screenName: keyof ParamList) => {
    navigation.navigate(screenName, {
      title,
      sharedTransitionTag: transitionTag,
    });
  };

  const size = isOpen ? 300 : 100;

  return (
    <TouchableNativeFeedback
      onPress={() => {
        goNext(nextScreen);
      }}>
      <Animated.View
        sharedTransitionTag={transitionTag}
        style={[
          styles.fullWidth,
          {
            height: size,
            width: size,
            backgroundColor: 'red',
            // borderRadius: size, // <any number> * size works (2.g. 2 * size, 1.1 * size, etc.)
            borderRadius: 1000,
          },
        ]}
      />
    </TouchableNativeFeedback>
  );
}

function Screen1({navigation}: NativeStackScreenProps<ParamList, 'Screen1'>) {
  return (
    <Animated.ScrollView style={styles.flexOne}>
      <Card
        navigation={navigation}
        title={'Title'}
        transitionTag={'tag'}
        nextScreen="Screen2"
      />
    </Animated.ScrollView>
  );
}

function Screen2({
  route,
  navigation,
}: NativeStackScreenProps<ParamList, 'Screen2'>) {
  const {title, sharedTransitionTag} = route.params;

  return (
    <View style={styles.flexOne}>
      <Card
        navigation={navigation}
        title={title}
        transitionTag={sharedTransitionTag}
        isOpen={true}
        nextScreen="Screen1"
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Screen1" component={Screen1} />
        <Stack.Screen name="Screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  fullWidth: {
    width: '100%',
  },
});
