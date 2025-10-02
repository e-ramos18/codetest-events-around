import React from "react";
import { View, Text, Image, ActivityIndicator, ScrollView, Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";

import { RootStackParamList } from "../../App";
import { eventStore } from "../stores/EventStore";
import { formatEventDate } from "../utils/formatDate";

type Props = NativeStackScreenProps<RootStackParamList, "EventDetails">;

const EventDetailsScreen = observer(({ route }: Props) => {
  const { eventId } = route.params;
  const { events, loading } = eventStore;

  if (loading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );

  const event = events.find((e) => e.id === eventId);

  if (!event)
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-lg">Event not found</Text>
      </View>
    );

  const latitude = (event as any).latitude || -37.8136;
  const longitude = (event as any).longitude || 144.9631;

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {event.image && (
        <Image
          source={{ uri: event.image }}
          className="w-full h-64"
          resizeMode="cover"
        />
      )}

      <View className="p-4">
        <Text className="text-2xl font-bold mb-2">{event.title}</Text>
        <Text className="text-gray-500 mb-1">{event.city}, {event.country}</Text>
        <Text className="text-gray-400 mb-1">{event.category}</Text>
        <Text className="text-gray-400 mb-2">{event.price}</Text>
        <Text className="mb-4">
          {formatEventDate(event.startDate, event.endDate)}
        </Text>

        {event.url && (
          <Text
            className="text-blue-500 font-semibold mb-4"
            onPress={() => Linking.openURL(event.url)}
          >
            View Event Online
          </Text>
        )}

        <Text className="text-lg font-semibold mb-2">Location</Text>
        <View className="overflow-hidden rounded-lg mb-8">
          <MapView
            style={{ width: "100%", height: 300 }}
            initialRegion={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{ latitude: parseFloat(latitude), longitude: parseFloat(longitude) }}
              title={event.title}
            />
          </MapView>
        </View>
      </View>
    </ScrollView>
  );
});

export default EventDetailsScreen;