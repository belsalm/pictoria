import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import routes from '../config/routes';
import { Colors, Typography } from '../styles';
import AuthContext from '../context/AuthContext';

// Import Screens
import Home from '../screens/home';
import Splash from '../screens/splash';
import GetStarted from '../screens/auth';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

// Bottom Tab Bar Navigator

function MyTabs({ navigation, route }) {

  const { t, i18n } = route.params;

  return (
    <Tab.Navigator
      initialRouteName={routes.Home}
      activeColor={Colors.WHITE}
      inactiveColor={Colors.GRAY_DARK}
      barStyle={[Typography.BODY, { backgroundColor: Colors.LIGHT_BLACK, borderTopWidth: 0.3, borderColor: Colors.DARK_BLACK }]}>
      <Tab.Screen
        name={routes.Home}
        component={Home}
        initialParams={{ t: t, i18n: i18n }} 
        options={{
          tabBarLabel: <Text style={[Typography.TAGLINE, { color: Colors.WHITE }]}>{t(routes.Home)}</Text>,
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={23} />
          ),
        }} />
    </Tab.Navigator>
  );
}

const RootNavigator = (props) => {
  const { state } = React.useContext(AuthContext);

  const { t, i18n } = props;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!state || state.isLoading ?
          <Stack.Screen name={routes.Splash} component={Splash} />
          : state.user == null ?
            <>
              <Stack.Screen name={routes.GetStarted} component={GetStarted} initialParams={{ t: t, i18n: i18n }} />
              <Stack.Screen name={routes.Home} component={Home} initialParams={{ t: t, i18n: i18n }} />
            </>
            :
            <>
              <Stack.Screen name='MyTabs' component={MyTabs} initialParams={{ t: t, i18n: i18n }} />
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;