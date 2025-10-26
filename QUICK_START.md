# 🚀 Быстрый старт

Этот документ поможет вам быстро запустить проект в режиме разработки.

## Предварительные требования

- Node.js >= 18.0.0
- npm, yarn, pnpm или bun

## Установка

1. **Клонируйте и перейдите в проект:**
```bash
cd /home/rudin/s-next2
```

2. **Установите все зависимости:**
```bash
# Корневые зависимости
npm install

# Зависимости Nuxt
cd nuxt-frontend && npm install && cd ..

# Зависимости Strapi
cd server && npm install && cd ..
```

3. **Настройте переменные окружения:**
```bash
# Скопируйте .env.example в .env
cp .env.example .env

# Откройте .env и настройте при необходимости
nano .env
```

Важно: Для production сгенерируйте свои безопасные ключи:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
Повторите команду 6 раз для всех ключей в .env файле.

## Запуск

### Режим разработки (рекомендуется для начала)

```bash
npm run dev
```

Это запустит:
- ✅ Nuxt на http://localhost:3000 (с hot reload)
- ✅ Strapi на http://localhost:1337

### Остановка

```bash
npm run dev:stop
```

### Production режим

```bash
# 1. Соберите проекты
cd nuxt-frontend && npm run build && cd ..
cd server && npm run build && cd ..

# 2. Запустите с PM2
npm start
```

## Доступ к приложениям

- **Frontend (Nuxt):** http://localhost:3000
- **Backend (Strapi API):** http://localhost:1337
- **Strapi Admin:** http://localhost:1337/admin

## Первые шаги

1. Откройте http://localhost:1337/admin
2. Создайте администратора при первом запуске
3. Откройте http://localhost:3000
4. Зарегистрируйтесь или войдите для доступа к полному функционалу

## Полезные команды

### PM2 команды
```bash
npm run dev        # Запуск dev режима
npm run dev:stop   # Остановка dev режима
npm start          # Запуск production
npm stop           # Остановка production
npm run restart    # Перезапуск
npm run logs       # Просмотр логов
npm run status     # Статус процессов
```

### Nuxt команды (в папке nuxt-frontend)
```bash
npm run dev        # Dev сервер
npm run build      # Сборка
npm run generate   # Статическая генерация
npm run synctypes  # Синхронизация типов из Strapi
```

### Strapi команды (в папке server)
```bash
npm run develop    # Dev сервер
npm run start      # Production сервер
npm run build      # Сборка
npm run seed:example  # Заполнить тестовыми данными
```

## Что дальше?

- 📖 Прочитайте [README.md](README.md) для полной документации
- 🔧 Изучите [SETUP_GITHUB.md](SETUP_GITHUB.md) для загрузки на GitHub
- 📚 Посмотрите примеры в папке `nuxt-frontend/composables/`
- 🎨 Настройте TailwindCSS под себя в `nuxt-frontend/assets/css/main.css`

## Нужна помощь?

Создайте issue на GitHub или посмотрите существующие.

