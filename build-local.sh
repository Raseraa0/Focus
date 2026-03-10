#!/bin/bash

# Arrêter le script en cas d'erreur
set -e

echo "🚀 Début du build local Android..."

# 1. Nettoyage (Optionnel mais conseillé pour éviter les caches corrompus)
# rm -rf android

# 2. Installation des dépendances
echo "📦 Vérification des dépendances..."
npm install

# 3. Pré-génération des dossiers natifs
echo "⚙️ Génération du dossier Android natif..."
npx expo prebuild --platform android

# 4. Lancement du build EAS en local
# On utilise le profil 'preview' qui est configuré pour sortir un APK
echo "🏗 Compilation du binaire (APK)..."
eas build --platform android --profile preview --local --output=./builds/app-release-$(date +%Y%m%d).apk

echo "✅ Build terminé ! Ton fichier se trouve dans le dossier ./builds"
