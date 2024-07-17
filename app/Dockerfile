# Étape 1 : Construire l'application Angular
FROM node:20.15.0 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json et installer les dépendances
COPY package.json package-lock.json ./

# Augmenter la limite de mémoire de Node.js
ENV NODE_OPTIONS=--max_old_space_size=4096

# Installer les dépendances avec l'option --legacy-peer-deps
RUN npm install --legacy-peer-deps

# Copier tout le reste des fichiers dans le répertoire de travail
COPY . .

# Construire l'application Angular en mode production avec optimisation et hachage de sortie
RUN npm run build --prod --optimization=true --output-hashing=all

# Étape 2 : Servir l'application avec un serveur HTTP
FROM nginx:latest

# Copier les fichiers construits depuis l'étape de build
COPY --from=build /app/dist/app/browser /usr/share/nginx/html
