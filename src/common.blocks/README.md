# common.blocks

Здесь хранятся файлы БЭМ блоков, в соответствии со структурой:
```
common.blocks
|-some-block
|  |-some-block.less
|  |-some-block.js
|  |-some-block__image.jpg
|-other-block
...
```

Все `less` файлы объединяются и компилируются c автопрефиксами в файл `public/css/common.css`.
`js` файлы - в файл `public/js/common.js` c бабел обработкой (нужно использовать ES6).
.jpg, .png, .svg - после оптимизации копируются в папку public/img
