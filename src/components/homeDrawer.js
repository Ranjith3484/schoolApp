import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Alert, ScrollView, StatusBar, BackHandler } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import HomeMain from './home/homeMain';
import TestDetail from './home/testDetail';
import ListView from './home/listView';
import CalendarView from './home/calendarView';
import Profile from './account/profile';
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      {/* drawer compoents nedd not be rendered here,so it was commanded */}
      {/* <DrawerItemList {...props} /> */}

      <ScrollView>

        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly',marginBottom: 40, }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: 'white', textAlignVertical: 'center' }}>SCHOOLAPP</Text>
         
          <TouchableOpacity
          onPress={()=>{
            navigation.navigate("MyProfile")
          }}
            style={{ backgroundColor: 'red', borderRadius: 100, height: 30, width: 30, justifyContent: 'center' }}
          >
            <Icon name="user" color='white' size={20} style={{ textAlign: 'center', textAlignVertical: 'center' }} />
          </TouchableOpacity>
        </View>


        <View style={{ flex: 1 }}>

          <DrawerItem label="Home" labelStyle={{ fontSize: 18, color: 'white' }}
            onPress={() => navigation.navigate("Home")} />

          <DrawerItem label="Others1" labelStyle={{ fontSize: 18, color: 'white' }}
            onPress={() => navigation.navigate("TestDetail")} />

          <DrawerItem label="Others2" labelStyle={{ fontSize: 18, color: 'white' }}
            onPress={() =>  navigation.navigate("WeeklySummary")} />
        </View>


        <View style={{ flex: 1 }}>
          <DrawerItem label="SignOut" labelStyle={{ fontSize: 18, color: 'white' }}
            onPress={() =>{
              AsyncStorage.removeItem("email");
              AsyncStorage.removeItem("loggedIn");
              BackHandler.exitApp();
            }} />
        </View>

      </ScrollView>
    </DrawerContentScrollView>
  );
}

export default function HomeDrawer() {
  return (
    // <NavigationContainer>
    <Drawer.Navigator initialRouteName="Home" drawerType='slide'
      drawerStyle={{
        backgroundColor: 'rgba(255,0,0,0.5)',
        width: 280,
      //  marginTop:StatusBar.currentHeight+5,
     //   borderTopRightRadius: 50,
      //  borderBottomRightRadius: 50,
       // marginBottom:StatusBar.currentHeight+5,
        elevation:5
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      
    >
      <Drawer.Screen name="Home" component={HomeMain} />
      <Drawer.Screen name="TestDetail" component={TestDetail} />
      <Drawer.Screen name="ListView" component={ListView} />
      <Drawer.Screen name="CalendarView" component={CalendarView} />
      <Drawer.Screen name="MyProfile" component={Profile} />

    </Drawer.Navigator>
    // </NavigationContainer>
  );
}