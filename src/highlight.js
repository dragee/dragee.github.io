import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import 'highlight.js/styles/github.css'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)

const highlightCode = (el) => {
  el.querySelectorAll('pre code').forEach((code) => {
    // A re-render can put plain text back into a highlighted block
    delete code.dataset.highlighted
    hljs.highlightElement(code)
  })
}

// v-highlight: highlights the code samples inside the element, again after it re-renders (e.g. on HMR)
export const vHighlight = {
  mounted: highlightCode,
  updated: highlightCode
}
