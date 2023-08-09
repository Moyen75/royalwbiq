FROM node:18

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app

RUN yarn install --production

COPY . /app

ENV CLOUD_ENV=production \
    MONGO_DB=talkEmma \
    ALLOWED_ORIGINS=http://localhost:3000,*,undefined,https://talkemma.com,http://127.0.0.1:5173,https://staging.talk-emma-frontend.pages.dev,http://localhost:5173 \
    AZURE_REGION=eastus \
    BASE_URL=https://talk-emma-backend-staging-fcjuh3h5uq-uc.a.run.app/api/v1 \
    REDIRECT_URL=https://talk-emma-backend-staging-fcjuh3h5uq-uc.a.run.app/api/v1/oauth2callback \
    BASE_URL=https://talk-emma-backend-staging-fcjuh3h5uq-uc.a.run.app/api/v1

CMD [ "yarn", "start" ]
