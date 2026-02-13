import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import HeaderWithClose from "./components/header";
import { ExercisesType } from "./database/db";
import { getExercises } from "./database/exerciseService";

export default function ManageExerciseScreen() {
  const [allExercises, setAllExercises] = useState<ExercisesType[]>([]);
  useEffect(() => {
    const fetchExos = async () => {
      const data = await getExercises();
      setAllExercises(data);
    };
    fetchExos();
  }, []);
  return (
    <ScrollView>
      <HeaderWithClose title="Exercices"></HeaderWithClose>
      {allExercises.map((item) => (
        <View key={item.id}>
          <Text>{item.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
