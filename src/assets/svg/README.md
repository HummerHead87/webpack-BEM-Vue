# svg

> Директория для инлайновых svg спрайтов. Подключаются скриптом в начале body.
> Директория monocolor - для монохромных картинок (очищает fill и style аттрибуты, а также id). multicolor - оставляет все как есть.
> Svg файлы проходят обработку [svgo](https://github.com/svg/svgo) плагином

Использование:
1. Поместить файл `some-svg.svg` в директорию `monocolor` или `multicolor` (см. выше в чем отличие);
2. Подключить в `html` через `use/xlink`:
``` html
<svg class="some-svg-class">
  <use xlink:href="#some-svg"></use>
</svg>
```
