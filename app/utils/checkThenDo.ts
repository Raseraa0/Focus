import { Alert } from "react-native";


export const checkThenDo = (fieldCheck: string[], execute: () => void) => {

    const found = fieldCheck.some((item) => item && item.length > 0);

    if (!found) {
        execute();
    }
    else {

        Alert.alert(
            "Attention",
            "Les données non sauvegardé seront perdu voulez vous quitter ?",
            [
                { text: "Oui", onPress: execute },
                {
                    text: "Non",
                },
            ]
        );
    }

}