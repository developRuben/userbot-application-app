# Dockerfile per il backend

# Usa un'immagine base di Node.js
FROM node:18

# Crea e setta la directory di lavoro
WORKDIR /userbot-application

# Copia i file package.json e package-lock.json (o yarn.lock)
COPY userbot-application/package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice sorgente
COPY userbot-application/ .

# Espone la porta su cui il backend sarà in ascolto
EXPOSE 8080

# Comando per avviare l'applicazione
CMD ["npm", "run", "dev"]

# Dockerfile per il frontend

# Usa un'immagine base di Node.js
FROM node:18

# Crea e setta la directory di lavoro
WORKDIR /userbot-application-ui

# Copia i file package.json e package-lock.json (o yarn.lock)
COPY userbot-application-ui/package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice sorgente
COPY userbot-application-ui/ .

# Costruisci il progetto React
RUN npm run build

# Espone la porta su cui il frontend sarà in ascolto
EXPOSE 3000

# Comando per avviare il server di sviluppo
CMD ["npm", "start"]
