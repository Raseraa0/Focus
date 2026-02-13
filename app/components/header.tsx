import { StyleSheet, Text, View } from "react-native";
import Close from "./close";

type Props = {
  title: string;
};

export function HeaderTitle({ title }: Props) {
  return (
    <View>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

export default function HeaderWithClose({ title }: Props) {
  return (
    <View style={styles.header}>
      <HeaderTitle title={title} />
      <Close />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
