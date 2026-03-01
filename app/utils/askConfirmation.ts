

import { Alert } from 'react-native';

export const askConfirmation = (): Promise<boolean> => {
    return new Promise((resolve) => {
        Alert.alert(
            "Suppression", // Titre
            "Voulez-vous vraiment supprimer cet exercice ?", // Message
            [
                {
                    text: "Annuler",
                    onPress: () => resolve(false),
                },
                {
                    text: "Supprimer",
                    onPress: () => resolve(true),
                },
            ],
            { cancelable: false }
        );
    });
};