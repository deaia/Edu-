import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import HomeScreen from './screens/HomeScreen';
import StudentListScreen from './screens/StudentListScreen';
import StudentDetailScreen from './screens/StudentDetailScreen';
import AttendanceScreen from './screens/AttendanceScreen';
import PaymentsScreen from './screens/PaymentsScreen';
import ExamsScreen from './screens/ExamsScreen';
import BehaviorScreen from './screens/BehaviorScreen';
import ReportsScreen from './screens/ReportsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StudentStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="StudentList" component={StudentListScreen} options={{ title: 'الطلاب' }} />
    <Stack.Screen name="StudentDetail" component={StudentDetailScreen} options={{ title: 'تفاصيل الطالب' }} />
  </Stack.Navigator>
);

const AttendanceStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AttendanceList" component={AttendanceScreen} options={{ title: 'الحضور والغياب' }} />
  </Stack.Navigator>
);

const PaymentsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="PaymentsList" component={PaymentsScreen} options={{ title: 'الدفوعات' }} />
  </Stack.Navigator>
);

const ExamsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ExamsList" component={ExamsScreen} options={{ title: 'الامتحانات' }} />
  </Stack.Navigator>
);

const ReportsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ReportsList" component={ReportsScreen} options={{ title: 'التقارير' }} />
  </Stack.Navigator>
);

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Students') {
              iconName = focused ? 'account-multiple' : 'account-multiple-outline';
            } else if (route.name === 'Attendance') {
              iconName = focused ? 'calendar-check' : 'calendar-check-outline';
            } else if (route.name === 'Payments') {
              iconName = focused ? 'credit-card' : 'credit-card-outline';
            } else if (route.name === 'Exams') {
              iconName = focused ? 'pencil' : 'pencil-outline';
            } else if (route.name === 'Reports') {
              iconName = focused ? 'chart-bar' : 'chart-bar-outline';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: '#757575',
          tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'الرئيسية' }} />
        <Tab.Screen name="Students" component={StudentStack} options={{ title: 'الطلاب' }} />
        <Tab.Screen name="Attendance" component={AttendanceStack} options={{ title: '��لحضور' }} />
        <Tab.Screen name="Payments" component={PaymentsStack} options={{ title: 'الدفوعات' }} />
        <Tab.Screen name="Exams" component={ExamsStack} options={{ title: 'الامتحانات' }} />
        <Tab.Screen name="Reports" component={ReportsStack} options={{ title: 'التقارير' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
