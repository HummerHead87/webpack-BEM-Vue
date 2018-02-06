# Vendor

В index.js подключаются вендорные бибилиотеки.
Пример использования:
1. Устанавливаем нужный модуль: `npm install --save slick-carousel`
2. Подключаем css файлы в `vendor/index.js`:
``` javascript
  require("slick-carousel/slick/slick.css");
  require("slick-carousel/slick/slick-theme.css");
```
3. Js-файл импортируем в коде:
``` javascript
import 'slick-carousel';
```
или
``` javascript
import slick from 'slick-carousel';
```
в зависимости от модуля.   
Старые js-модули подключаем в `vendor/index.js`
``` javascript
require("expose-loader?slick!slick-carousel");
```
