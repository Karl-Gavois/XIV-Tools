# FFXIV Tools

Un hub d’outils pratiques pour les joueurs et compagnies libres de **Final Fantasy XIV**.

🎯 **Objectif** : centraliser des outils collaboratifs et en temps réel pour faciliter la vie des joueurs.

## Fonctionnalités prévues

1. **Tableaux de loot – Cartes au trésor (MVP)**  
   - Créez et éditez vos tableaux de loot pour les soirées cartes au trésor.  
   - Partagez-les via un **lien public** pour consultation par tous.  
   - Modification réservée aux utilisateurs connectés.  
   - Stockage en temps réel via **Supabase**.

2. **[Feature à venir]** Suivi d’événements in-game  
3. **[Feature à venir]** Outils pour compagnies libres (gestion interne, rôles…)

## Tech stack

- **Next.js** → interface et logique côté client  
- **Symfony API** → gestion des utilisateurs, connexion, JWT  
- **Supabase** → stockage collaboratif et temps réel des tableaux  

## Flow utilisateur

1. Connexion via l’API Symfony  
2. Création ou édition d’un tableau de loot  
3. Génération d’un **lien partageable**  
4. Consultation publique du tableau  

💡 Ce projet est pensé pour être **modulaire**, **extensible** et **facile à maintenir**, afin d’ajouter de nouveaux outils FFXIV dans le futur.
