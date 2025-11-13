FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install @supabase/supabase-js && npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev"]
