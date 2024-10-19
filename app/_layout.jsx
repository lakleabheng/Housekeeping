import { View, Text } from 'react-native';
import React from 'react'
import { Tabs } from 'expo-router'
import TabBar from '../components/TabBar'
const _layout = () => {
    return (
        <Tabs
        tabBar={props=> <TabBar {...props} />}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: "Home"
            }}
        />
                <Tabs.Screen
            name="Room"
            options={{
                title: "Room"
            }}
        />
        <Tabs.Screen
            name="Task"
            options={{
                title: "Task"
            }}
        />

        <Tabs.Screen
            name="Report"
            options={{
                title: "Report"
            }}
        />
    </Tabs>
    )
}

export default _layout