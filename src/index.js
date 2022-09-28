import hljsDefineFunc from './languages/func.js'
import hljsDefineFift from './languages/fift.js'

export default function (hljs) {
  hljs.registerLanguage('fift', hljsDefineFift)
  hljs.registerLanguage('func', hljsDefineFunc)
}
