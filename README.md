# webpack-BEM-Vue

> webpack 3 boilerplate для верстки небольших проектов

## Установка и запуск

``` bash
# установка модулей
npm install

# веб сервер с автоперезагрузкой по адресу localhost:8080
npm run dev

# веб сервер с hot replacement по адресу localhost:8080
npm run dev-hot

# сборка проекта в директорию public
npm run build

# сборка проекта на продакшн с минификацией в директорию public
npm run production
```

Для добавления новой html страницы, например `new-page.html` в `webpack.config.js` нужно добавить в `plugins` новый инстанс `HtmlWebpackPlugin`:

``` js

new HtmlWebpackPlugin({
      template: 'src/new-page.html',
      filename: 'new-page.html',
    }),
```

После этого файл `src/new-page.html` будет прогонятся через `webpack` c извлечением всех ресурсов, добавлением в html `common.css`, `common.js`.

В сборщик подключен Postcss с плагинами [autoprifixer](https://github.com/postcss/autoprefixer) и [postcss-inline-svg](https://github.com/TrySound/postcss-inline-svg)
