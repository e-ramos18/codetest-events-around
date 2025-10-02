import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Event } from "../services/apiService";

type Props = {
  event: Event;
  onPress: () => void;
};

const EventCard = ({ event, onPress }: Props) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
  >
    {event.image && (
      <Image
        source={{ uri: event.image }}
        className="w-full h-48"
        resizeMode="cover"
      />
    )}
    <View className="p-4">
      <Text className="text-lg font-bold mb-1">{event.title}</Text>
      <Text className="text-gray-500">{event.city}, {event.country}</Text>
      <Text className="text-gray-400">{event.category}</Text>
      <Text className="text-gray-400">{event.price}</Text>
    </View>
  </TouchableOpacity>
);

export default EventCard;