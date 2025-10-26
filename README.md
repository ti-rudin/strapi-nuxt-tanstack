# 🚀 Strapi + Nuxt 3 + TanStack Query Template

Полнофункциональный шаблон для создания современных веб-приложений с использованием Strapi 5, Nuxt 3 и TanStack Vue Query.

## ✨ Особенности

- **Strapi 5** - Современная headless CMS с TypeScript
- **Nuxt 3** - Прогрессивный Vue.js framework
- **TanStack Vue Query** - Мощное управление состоянием и кэшированием данных
- **TailwindCSS** - Утилитарный CSS framework
- **TypeScript** - Строгая типизация для надежного кода
- **Аутентификация** - Встроенная система регистрации и входа
- **Type Safety** - Автоматическая синхронизация типов между Strapi и Nuxt
- **PM2** - Готовые конфигурации для продакшн и разработки

## 📦 Что включено

- ✅ Полная настройка Strapi 5 с TypeScript
- ✅ Nuxt 3 с Vue Query и SSR
- ✅ Готовая система аутентификации
- ✅ Пример блога с статьями, авторами и категориями
- ✅ Автоматическая синхронизация TypeScript типов из Strapi
- ✅ PM2 конфигурации для production и development
- ✅ TailwindCSS для стилизации
- ✅ Поддержка SSR и SSG
- ✅ Использование composables для Vue Query

## 🏗️ Структура проекта

```
.
├── nuxt-frontend/      # Nuxt 3 frontend приложение
│   ├── composables/    # Vue composables (useAuth, useArticlesQuery)
│   ├── pages/          # Страницы приложения
│   ├── shared-types/   # Общие TypeScript типы
│   └── scripts/        # Скрипты для синхронизации типов
├── server/             # Strapi backend
│   ├── src/api/        # API endpoints
│   ├── src/components/ # Reusable components
│   └── config/         # Конфигурация Strapi
├── ecosystem.config.js       # PM2 production config
└── ecosystem.dev.config.js   # PM2 development config
```

## 🚀 Быстрый старт

### Требования

- Node.js >= 18.0.0
- npm или yarn

### Установка

1. Клонируйте репозиторий:

```bash
git clone https://github.com/yourusername/strapi-nuxt-tanstack.git
cd strapi-nuxt-tanstack
```

2. Установите зависимости в корне проекта и подпроектах:

```bash
# Установка корневых зависимостей
npm install

# Установка зависимостей для Nuxt
cd nuxt-frontend
npm install

# Установка зависимостей для Strapi
cd ../server
npm install
cd ..
```

3. Настройте переменные окружения:

Создайте файл `.env` в корне проекта:

```env
# Node environment
NODE_ENV=development

# Nuxt Configuration
NUXT_PORT=3000
NUXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Strapi Configuration
STRAPI_PORT=1337

# Database (SQLite для разработки)
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# Security Keys (сгенерируйте свои ключи)
APP_KEYS=your-app-keys-here
API_TOKEN_SALT=your-api-token-salt-here
ADMIN_JWT_SECRET=your-admin-jwt-secret-here
TRANSFER_TOKEN_SALT=your-transfer-token-salt-here
ENCRYPTION_KEY=your-encryption-key-here
JWT_SECRET=your-jwt-secret-here
```

> 💡 **Генерация ключей безопасности:**
> 
> Вы можете сгенерировать случайные ключи с помощью команды:
> ```bash
> node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
> ```

4. Запустите приложение:

```bash
# Режим разработки (с hot reload)
npm run dev

# Production режим
npm run build  # сначала соберите проекты
npm start      # затем запустите с PM2
```

### Разработка

Для разработки используется `ecosystem.dev.config.js` который запускает:
- Nuxt в dev режиме с hot reload на порту 3000
- Strapi в develop режиме на порту 1337

```bash
# Запустить dev режим
npm run dev

# Остановить dev режим
npm run dev:stop

# Удалить dev процессы
npm run dev:delete

# Просмотр логов
npm run logs
```

Откройте [http://localhost:3000](http://localhost:3000) для Nuxt приложения.

### Production

Для production используется `ecosystem.config.js` который запускает:
- Nuxt скомпилированный (build) с 2 инстансами
- Strapi в start режиме

```bash
# Собрать проекты
cd nuxt-frontend && npm run build && cd ..
cd server && npm run build && cd ..

# Запустить production режим
npm start

# Остановить
npm stop

# Перезапустить
npm run restart

# Статус процессов
npm run status
```

## 📚 Документация

### Nuxt Frontend

Основная документация находится в `nuxt-frontend/README.md`

- [Composables и работа с данными](nuxt-frontend/README-VUE-QUERY.md)
- [TypeScript типы](nuxt-frontend/README-TYPES.md)

### Strapi Backend

Документация Strapi в `server/README.md`

## 🔧 Основные команды

### Корневой проект

```bash
npm run dev          # Запуск в режиме разработки
npm run dev:stop     # Остановка dev режима
npm run dev:delete   # Удаление dev процессов из PM2
npm start            # Запуск production режима
npm stop             # Остановка production режима
npm run restart      # Перезапуск production режима
npm run delete       # Удаление production процессов из PM2
npm run logs         # Просмотр логов PM2
npm run status       # Статус процессов PM2
```

### Nuxt Frontend

```bash
cd nuxt-frontend

npm run dev          # Запуск dev сервера
npm run build        # Сборка для production
npm run generate     # Генерация статического сайта
npm run preview      # Предпросмотр production build
npm run synctypes    # Синхронизация типов из Strapi
```

### Strapi Backend

```bash
cd server

npm run develop      # Запуск dev сервера с auto-reload
npm run start        # Запуск production сервера
npm run build        # Сборка admin панели
npm run seed:example # Заполнение данными для примера
```

## 🎯 Использование Composables

### useArticlesQuery

Получение списка статей с автоматическим кэшированием:

```typescript
const { data, isLoading, isError, error } = useArticlesQuery({
  enabled: true,
  staleTime: 1000 * 60 * 5, // 5 минут
  refetchOnWindowFocus: true
});
```

### useAuth

Работа с аутентификацией:

```typescript
const { user, isAuthenticated, login, register, logout } = useAuth();

// Вход
await login('user@example.com', 'password');

// Регистрация
await register('username', 'user@example.com', 'password');

// Выход
logout();
```

## 🛠️ Технологии

- **Strapi 5** - Headless CMS
- **Nuxt 3** - Vue.js framework
- **TanStack Vue Query** - Управление состоянием
- **TailwindCSS 4** - CSS framework
- **TypeScript** - Типизация
- **PM2** - Process manager
- **Vue 3** - JavaScript framework

## 📝 License

MIT

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

## 👤 Автор

Ваше имя

## 📄 Changelog

### v1.0.0
- Начальная версия шаблона
- Интеграция Strapi 5 + Nuxt 3 + TanStack Query
- Система аутентификации
- Пример блога
- Автоматическая синхронизация типов
