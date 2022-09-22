# `highlight.js` syntax definition for `FunC`

For more about `Func`, see https://ton.org/docs
For more about `highlight.js`, see https://highlightjs.org/

### Usage

If you're using webpack / rollup / browserify / node:

```bash
npm install highlightjs highlightjs-func
```

```javascript
import hljs from 'highlight.js'
import hljsDefine from 'highlightjs-func'

hljsDefine(hljs)  // Install language definitions
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

- https://github.com/pygments/pygments/commit/fcfcdcd7b3783194d1bb3a868fe989b0c79c1262
- https://github.com/ton-blockchain/intellij-ton/tree/main/src/main/grammars
- https://highlightjs.readthedocs.io/en/latest/language-guide.html
- https://github.com/highlightjs/highlight.js/blob/main/docs/language-contribution.rst

