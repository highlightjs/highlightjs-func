# `highlight.js` syntax definition for `FunC` and `Fift`

[![test](https://github.com/highlightjs/highlightjs-func/actions/workflows/test.yml/badge.svg?event=push)](https://github.com/highlightjs/highlightjs-func/actions/workflows/test.yml)

- For more about `FunC`, see https://ton.org/docs
- For more about `Fift`, see https://ton.org/fiftbase.pdf
- For more about `highlight.js`, see https://highlightjs.org/

### Usage

If you're using webpack / rollup / browserify / node:

```bash
npm install highlightjs highlightjs-func
```

```javascript
import hljs from 'highlight.js'
import hljsDefine from 'highlightjs-func'

hljsDefine(hljs)  // Installs all language definitions
// Now, do your thing!
```

If you're not using a build system and just want to embed this in your webpage:

```html
<script type="text/javascript" src="/path/to/highlight.min.js"></script>
<script type="text/javascript" src="/path/to/func.min.js"></script>
<script type="text/javascript">
  hljs.highlightAll();
</script>
```

### Useful links

- https://highlightjs.readthedocs.io/en/latest/language-guide.html
- https://github.com/highlightjs/highlight.js/blob/main/docs/language-contribution.rst
- https://github.com/highlightjs/highlight.js/blob/main/extra/3RD_PARTY_QUICK_START.md
