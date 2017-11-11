# webpack-BEM-Vue

> webpack 3 boilerplate для верстки небольших проектов

## Установка и запуск

``` bash
# установка модулей
npm install

# веб сервер с автоперезагрузкой по адресу localhost:8080
npm run dev

# веб сервер с hot replacement по адресу localhost:8080
npm run hotdev

# сборка проекта в директорию public
npm run build

# сборка проекта на продакшн с минификацией в директорию public
npm run production
```

Для добавления новой html страницы, например new-page.html в webpack нужно добавить в plugins новый инстанс HtmlWebpackPlugin:
```
new HtmlWebpackPlugin({
      template: 'src/new-page.html',
      filename: 'new-page.html',
      chunksSortMode: 'manual',
      chunks: ['vendor', 'common'],
    }),
```
После этого файл src/new-page.html будет прогонятся через webpack c извлечением всех ресурсов, добавлением в нужной последовательности common.css, vendor.css, common.js, vendor.js.
