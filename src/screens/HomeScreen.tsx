// src/screens/HomeScreen.tsx
import React, { useEffect } from "react";
import { View, Text, SectionList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";

import { RootStackParamList } from "../../App";
import { eventStore } from "../stores/EventStore";
import EventCard from "../components/EventCard";

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

const HomeScreen = observer(() => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    eventStore.fetchEvents();
  }, []);

  const { loading, error, categorizedEvents } = eventStore;

  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );

  if (error)
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500">{error}</Text>
      </View>
    );

  const sections = Object.entries(categorizedEvents).map(([category, events]) => ({
    title: category,
    data: events,
  }));

  if (sections.length === 0)
    return (
      <View className="flex-1 justify-center items-center">
        <Text>No events found</Text>
      </View>
    );

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EventCard
            event={item}
            onPress={() => navigation.navigate("EventDetails", { eventId: item.id })}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-2xl font-extrabold text-gray-700 my-4">{title}</Text>
        )}
        refreshing={loading}
        onRefresh={eventStore.fetchEvents}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});

export default HomeScreen;