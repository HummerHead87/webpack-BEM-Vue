# Vendor

В index.js подключаются вендорные бибилиотеки.
Пример использования:
1. Устанавливаем нужный модуль: npm install --save slick-carousel
2. Подключаем необходимые файлы в index.js:
```
  require("slick-carousel/slick/slick.css");
  require("slick-carousel/slick/slick-theme.css");
  require("expose-loader?slick!slick-carousel");
```

Все css и js собираются в файлы public/css/vendor.css, /public/js/vendor.js соответственно и подключаются css - в head, js - вниз body перед common.js
