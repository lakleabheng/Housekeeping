import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { runOnRuntime } from 'react-native-reanimated';

const TabBar = ({ state, descriptors, navigation }) => {
  const icons = {
    index: (props) => <AntDesign name="home" size={16} color={Colors.text} {...props} />,
    Task: (props) => <AntDesign name="exception1" size={16} color={Colors.text} {...props} />, // Correct the icon name if needed
    Room: (props) => <AntDesign name="staro" size={16} color={Colors.text} {...props} />, // Correct the icon name if needed
    Report: (props) => <AntDesign name="filetext1" size={16} color={Colors.text} {...props} />
};


  return (
    <View style={styles.tabbar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        if (['_sitemap', '+not-found'].includes(route.name)) return null;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        
        return (
          <TouchableOpacity 
          key={route.name}
          style={[
            styles.menulable,
            isFocused ? styles.activeContainer : styles.inactiveContainer // Apply active/inactive styles
          ]}
          accessibilityRole="button"
          accessibilityState={isFocused ? { selected: true } : {}}
          accessibilityLabel={options.tabBarAccessibilityLabel}
          testID={options.tabBarTestID}
          onPress={onPress}
          onLongPress={onLongPress}
        >
          {
            icons[route.name] ? icons[route.name]({
                color: isFocused ? Colors.whiteColor : '#222'
            }) : <AntDesign name="questioncircleo" size={16} color={Colors.text} /> // Fallback icon
          }
          <Text style={{ color: isFocused ? Colors.whiteColor : '#222', fontSize: 11 }}>
            {label}
          </Text>
        </TouchableOpacity>

        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabbar: {
    width: '90%',  
    position: 'absolute',
    bottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 25,
    marginHorizontal: '5%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    shadowOpacity: 0.1,
  },
  menulable:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    paddingVertical: 5
  },
  activeContainer: {
    backgroundColor: Colors.activeBackground,
  },
  inactiveContainer: {
    backgroundColor: 'transparent', 
  },
});

export default TabBar;
