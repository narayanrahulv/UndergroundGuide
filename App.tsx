/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainScreen from './screens/mainScreen';
import LineStatusScreen from './screens/lineStatusScreen';
import LineStopsScreen from './screens/lineStopsScreen';

import {QueryClientProvider, QueryClient} from 'react-query';

const Stack = createNativeStackNavigator();

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="LineStatus" component={LineStatusScreen} />
          <Stack.Screen name="LineStops" component={LineStopsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
