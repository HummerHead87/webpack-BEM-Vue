#svg

Директория для инлайновых svg спрайтов. Подключаются скриптом в начале body.
Директория monocolor - для монохромных картинок (очищает fill и style аттрибуты, а также id).
multicolor - не трогает fill и style.

Использование:
1. Поместить файл some-svg.svg в директорию monocolor или multicolor (см. выше в чем отличие);
2. Подключить в html через use/xlink:
```
<svg class="some-svg-class">
  <use xlink:href="#icon-some-svg"></use>
</svg>
```
Обрати внимание: добавляется префикс icon к href
