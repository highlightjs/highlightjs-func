/*
Language: Fift
Author: Nikita Sobolev <mail@sobolevn.me>
Description: Fift is a simple stack-based programming language designed for TON
Website: https://ton.org/fiftbase.pdf
Category: smartcontracts
*/

const IDENTIFIER = /[0-9A-Za-z$_-]+/
const WORD_DEFS = /(::_|::|:_|=:|:)/

export default function(hljs) {
  return {
    'name': 'Fift',
    'aliases': ['fift'],
    'case_insensitive': false,

    'keywords': {
      'keyword': [
        // It is kinda hard to tell what is a keyword and what is an operator
        // in fift. So, we do this instead:
        // - If something contains letters / numbers / `-`,
        //   we treat it as a keywrod
        // - If something contains any other chars like `,`, `-`, `?`, `+`,
        //   then we treat it as an operator
        '-roll', '-rot|10', '-trailing', '-trailing0',

        '2constant|10', '2drop|10', '2dup|10', '2over|10', '2swap|10',
        'abort', 'abs', 'allot', 'and', 'anon', 'atom',

        'bbitrefs', 'bbits', 'bl', 'box', 'brefs', 'brembitrefs', 'brembits',
        'bremrefs', 'bye',

        'cadr', 'caddr', 'car', 'cddr', 'cdr', 'char', 'chr', 'cmp',
        'cond', 'cons', 'constant',
        'count', 'cr', 'create',

        'drop', 'depth',
        'dictmap', 'dictmerge', 'dictnew',
        'does', 'drop', 'dup',

        'ed25519_chksign', 'ed25519_sign', 'ed25519_sign_uint',
        'emit', 'exch', 'exch2|10', 'execute', 'explode',

        'find', 'first', 'fits', 'forget',
        'gasrunvm', 'gasrunvmcode', 'gasrunvmctx', 'gasrunvmdict',
        'halt', 'hash', 'hashB', 'hashu', 'hold', 'hole',
        'if', 'ifnot', 'include',

        'list',
        'minmax', 'max', 'min', 'mod',

        'negate', 'newkeypair', 'nil', 'nip', 'nop', 'not', 'now', 'null',
        'or', 'over',
        'pair', 'pick',
        'quit',

        'remaining', 'reverse', 'roll', 'rot',
        'runvm', 'runvmcode', 'runvmctx', 'runvmdict',

        'sbitrefs', 'sbits', 'second', 'sgn', 'sign', 'shash', 'space', 'swap',
        'single', 'skipspc', 'srefs',

        'ten', 'third', 'times', 'triple', 'tuck', 'tuple', 'type',
        'ufits', 'uncons', 'unpair', 'unsingle', 'until', 'untriple', 'untuple',

        'variable',
        'while',
        'word', 'words',
        'xor',
      ],
      'literal': ['true', 'false'],
      'type': [],
      'built_in': [],
    },

    'contains': [
      // Comments
      {
        'scope': 'comment',
        'variants': [
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.C_LINE_COMMENT_MODE
        ],
        'relevance': 0,
      },

      // Words, variables, and constants
      {
        'match': [
          /\s/,
          /2?constant/,
          /\s+/,
          IDENTIFIER,
        ],
        'scope': {
          2: 'keyword',
          4: 'variable.constant',
        },
      },
      {
        'match': [
          /\s/,
          /variable/,
          /\s+/,
          IDENTIFIER,
        ],
        'scope': {
          2: 'keyword',
          4: 'variable',
        },
      },
      {
        'match': [
          /}/,
          /\s+/,
          WORD_DEFS,
          /\s+/,
          IDENTIFIER,
        ],
        'scope': {
          1: 'punctuation',
          3: 'operator',
          5: 'function',  // this is the closest we have for "word" in fift
        },
      },

      // Operators
      {
        'scope': 'operator',
        'match': hljs.regex.either(
          // Full list can be found in
          // Appendix A. List of Fift words
          // Ordered the same way source code does this.
          // Except: shorter words must follow
          // longer ones with the same base part.
          // Example: `#` comes after `#s`
          /!/,

          /#>/, /#s/, /\$#/, /#/,

          /\$\+/, /\$,/, /\$\d/, /\$=/, /\$(?=\()/,
          /\$>smca/, /\$>s/,
          /\$@\+/, /\$@\?\+/, /\$@\?/, /\$@/,
          /\$cmp/, /\$len/, /\$pos/, /\$reverse/,

          /%1<</,

          /\('\)/, /\(-trailing\)/, /\(\.\)/, /\(atom\)/, /\(b\.\)/,
          /\(compile\)/, /\(create\)/, /\(def\?\)/, /\(dump\)/, /\(execute\)/,
          /\(forget\)/, /\(number\)/, /\(x\.\)/, /\(\{\)/, /\(\}\)/,

          /\*\/cmod/, /\*\/c/, /\*\/mod/, /\*\/rmod/, /\*\/r/, /\*\//,
          /\*>>c/, /\*>>r/, /\*>>/, /\*mod/, /\*/,

          /\+!/, /\+/, /,/, /-!/, /-/,
          /-1<</, /\._/, /\.dump/, /\.l/, /\.sl/, /\.s/, /\.tc/,
          /\//, /\/\*/, /\/cmod/, /\/c/, /\/mod/, /\/rmod/, /\/r/,
          /0!/, /0<=/, /0<>/, /0</, /0=/, /0>=/, /0>/,
          /1\+!/, /1\+/, /1-!/, /1-/, /1<</, /1<<1-/,
          /2\*/, /2\+/, /2-/, /2\//, /2=:/,

          WORD_DEFS,

          /<#/, /<<\/c/, /<<\/r/, /<=/, /<>/, /<b/, /<s/, /<<\//,
          /<</, /</, /=/,

          />=/, />>c/, />>r/, />>/, />/,

          /\?dup/,

          /@'/, /@/,

          /B\+/, /B,/, /B=/, /B>Li@\+/, /B>Li@/, /B>Lu@\+/, /B>Lu@/, /B>boc/,
          /B>file/, /B>i@\+/, /B>i@/, /B>u@\+/, /B>u@/,
          /B@\?\+/, /B@\+/, /B@\?/, /B@/,
          /Bcmp/, /BhashB/, /Bhashu/, /Bhash/, /Blen/, /Bx\./,
          /B\|/, /Li>B/, /Lu>B/,

          /\[\]/, /\[compile\]/, /\[/, /\]/,

          /atom\?/,

          /b\+/, /b\._/, /b\./,
          /b>idict!\+/, /b>idict!/, /b>sdict!\+/, /b>sdict!/,
          /b>udict!\+/, /b>udict!/,
          /b>/, /boc+>B/, /boc>B/,

          /csr\./,
          /def\?/,
          /empty\?/, /eq\?/,
          /file-exists\?/, /file>B/,

          /i,/, /i>B/, /i@\+/, /i@/, /i@\?\+/, /i@\?/,
          /idict!\+/, /idict!/, /idict-/, /idict@-/, /idict@/,

          /null!/, /null\?/,
          /pfxdict!\+/, /pfxdict!/, /pfxdict@/, /priv>pub/,
          /ref@\+/, /ref@/, /ref@\?\+/, /ref@\?/,

          /s,/, /s>c/, /s>/,
          /sdict!\+/, /sdict!/, /sdict-/, /sdict@-/, /sdict@/,
          /smca>\$/, /sr,/,

          /tuple\?/,

          /u,/, /u>B/, /u@\+/, /u@\?\+/, /u@\?/,
          /udict!\+/, /udict!/, /udict-/, /udict@-/, /udict@/,
          /undef\?/,

          /x\._/, /x\./,

          /\|\+/, /\|/, /\|_/,

          // Should be the last:
          /(?<=\s)\.(?=\s)/,
        ),
      },

      // Primitives
      {
        'scope': 'number',
        'match': hljs.regex.either(
          /(0[xX][0-9a-fA-F]+)/,
          /(0[bB][01]+)/,
          /(-?[0-9]+(\/-?[0-9]+)?)/,
        ),
      },
      { 'scope': 'string', 'match': /"([^"\r\n\\]|\\.)*"/ },
      {
        // slice hex literal
        'scope': 'symbol',
        'match': /[xX]\{[0-9a-fA-F_]*}/,
        'relevance': 10,
      },
      {
        // byte hex literal
        'scope': 'symbol',
        'match': /[bB]\{[01]*}/,
        'relevance': 10,
      },
      {
        // atom
        'scope': 'symbol',
        'match': /'[^\s]+/,
      },

      // Punctuation
      { 'scope': 'punctuation', 'match': /[\[\{\}\],]/ },
    ],
  }
}
