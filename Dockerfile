# Определите базовый образ
FROM node:20-alpine

# Создайте директорию для приложения
WORKDIR /usr/src/app

# Копируйте файлы `package.json` и `yarn.lock`
COPY package.json yarn.lock ./

# Установите зависимости с помощью yarn
RUN yarn install --frozen-lockfile

# Скопируйте исходный код приложения
COPY . .

# Соберите приложение (если требуется)
RUN yarn build

# Определите порт, который будет прослушивать приложение
EXPOSE 8089

# Определите команду для запуска приложения
CMD ["yarn", "start:prod"]