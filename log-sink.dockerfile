# # Build Stage 1
# # This build created a staging docker image
# #
# FROM node:18.12 AS appbuild
# WORKDIR /app

# COPY package.json ./
# COPY nx.json ./
# COPY project.json ./

# RUN npm install

# COPY ./src ./src
# COPY ./lib ./lib
# COPY ./tsconfig.* ./

# RUN npm run build

# Build Stage 2
# This build takes the production build from staging build
FROM node:18.12-alpine as servePrepare
WORKDIR /app
COPY ./dist ./
RUN npm install --production
EXPOSE 3000
CMD ["node","main.cjs"]