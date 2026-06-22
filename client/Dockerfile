FROM node:22-bookworm

WORKDIR /app

# Chỉ copy package.json, KHÔNG copy package-lock.json
COPY package.json ./

# Cài deps + fix rollup native binary cho Linux trong 1 layer
RUN npm install --include=dev && \
    npm install --save-optional @rollup/rollup-linux-x64-gnu

COPY . .

RUN chmod -R 755 node_modules

RUN npm run build

RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]