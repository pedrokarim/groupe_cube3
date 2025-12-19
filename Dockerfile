# ============================================================
# 🐳 Dockerfile simple pour Node.js
# ============================================================

FROM node:20-alpine

WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm ci --only=production

# Copie le code source
COPY . .

# Commande par défaut
CMD ["node", "src/math.js"]

