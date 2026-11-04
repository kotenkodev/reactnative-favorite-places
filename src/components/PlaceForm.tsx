import { useState } from "react";
import { View, Text, ScrollView, TextInput } from "react-native";

const PlaceForm = () => {
  const [title, setTitle] = useState("");

  const changeTitleHandler = (enteredText: string) => {
    setTitle(enteredText);
  };

  return (
    <ScrollView>
      <View>
        <Text>Title</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          placeholder="Enter title"
        />
      </View>
    </ScrollView>
  );
};

export default PlaceForm;
