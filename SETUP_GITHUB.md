# Настройка репозитория на GitHub

## 1. Создание репозитория на GitHub

1. Перейдите на https://github.com/new
2. Название репозитория: `strapi-nuxt-tanstack`
3. Описание: `Full-stack template with Strapi 5, Nuxt 3, and TanStack Vue Query`
4. Выберите Public
5. НЕ инициализируйте с README, .gitignore или license (мы уже добавили их)
6. Нажмите "Create repository"

## 2. Инициализация Git и загрузка кода

Выполните следующие команды:

```bash
cd /home/rudin/s-next2

# Инициализация git (если еще не инициализирован)
git init

# Добавление всех файлов
git add .

# Создание первого коммита
git commit -m "feat: initial commit - Strapi + Nuxt + TanStack Query template"

# Добавление remote репозитория (замените yourusername на ваш GitHub username)
git remote add origin https://github.com/yourusername/strapi-nuxt-tanstack.git

# Переименование основной ветки в main
git branch -M main

# Загрузка на GitHub
git push -u origin main
```

## 3. Обновление информации в файлах

Перед загрузкой обновите следующее:

1. **README.md** - замените `yourusername` на ваш GitHub username
2. **package.json** - обновите URL репозитория в поле `repository.url`
3. **LICENSE** - добавьте ваше имя вместо "Your Name"
4. **package.json** - добавьте ваше имя в поле `author`

## 4. Настройка репозитория на GitHub

После загрузки кода:

1. Перейдите в Settings репозитория
2. Найдите раздел "Features"
3. Включите Issues и Discussions если хотите
4. Добавьте темы (topics): `strapi`, `nuxt`, `vue-query`, `tanstack`, `template`, `typescript`, `tailwindcss`

## 5. Добавление шаблона репозитория

После загрузки кода вы можете сделать репозиторий шаблоном:

1. Перейдите в Settings репозитория
2. Прокрутите вниз до раздела "Template repository"
3. Включите опцию "Template repository"
4. Теперь другие люди смогут использовать "Use this template"

## 6. (Опционально) Добавление Actions для CI/CD

Создайте файл `.github/workflows/ci.yml` для автоматической проверки кода:

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
    
    - name: Install dependencies
      run: |
        npm install
        cd nuxt-frontend && npm install && cd ..
        cd server && npm install && cd ..
    
    - name: Run lint
      run: |
        cd nuxt-frontend && npm run lint || true
```

## Готово!

Теперь ваш репозиторий готов для использования как шаблон! 🎉
