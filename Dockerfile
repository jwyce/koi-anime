FROM node:14 as build

WORKDIR /koi

COPY prod-package.json ./package.json
COPY yarn.lock .
COPY packages/controller ./packages/controller
COPY packages/server ./packages/server

RUN yarn install --pure-lockfile 

WORKDIR /koi/packages/controller
RUN yarn build

WORKDIR /koi/packages/server
RUN yarn build

FROM node:14

WORKDIR /koi

COPY prod-package.json ./package.json
COPY yarn.lock .

COPY --from=build /koi/packages/controller/package.json /koi/packages/controller/package.json
COPY --from=build /koi/packages/controller/dist /koi/packages/controller/dist

COPY --from=build /koi/packages/server/package.json /koi/packages/server/package.json
COPY --from=build /koi/packages/server/dist /koi/packages/server/dist

COPY --from=build /koi/packages/server/.env.production /koi/packages/server/.env
COPY --from=build /koi/packages/server/.env.example /koi/packages/server/.env.example

RUN yarn install --pure-lockfile --production

WORKDIR /koi/packages/server

ENV NODE_ENV production
EXPOSE 8080
CMD ["node", "dist/index.js"]
USER node