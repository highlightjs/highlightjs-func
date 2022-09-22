/*
Language: FunC
Author: Nikita Sobolev <mail@sobolevn.me>
Description: FunC is a smart-contract programming language that feels like C
Website: https://ton.org/docs
Category: smartcontracts
*/

const IDENTIFIER = '(?!")(`([^`]+)`|' +
  '((?=_)_|' +
  '(?=\\{)\\{|' +
  '(?=\\})\\}|' +
  '(?![_`{}]))([^;,\\[\\]\\(\\)\\s~.]+))'

const STRING = /\"[^\n\"]+\"[Hhcusa]?/
const NUMBER = /(-?(?!_)([\d_]+|0x[\d_a-fA-F]+)|0b[1_0]+)(?<!_)(?=[\s\)\],;])/

export default function(hljs) {
  return {
    'name': 'FunC',
    'aliases': ['func'],
    'case_insensitive': false,

    'keywords': {
      'keyword': [
        'if', 'ifnot', 'else', 'elseif', 'elseifnot|10',
        'while', 'do', 'until', 'repeat',
        'return', 'impure', 'method_id',
        'forall', 'asm', 'inline', 'inline_ref|10',
      ],
      'literal': ['true', 'false'],
      'type': ['var', 'int', 'slice', 'tuple', 'cell', 'builder', 'cont', '_'],
      'built_in': [],
    },

    'contains': [
      // Comments
      { 'className': 'comment', 'begin': ';;', 'end': /(?=\n)/ },
      {
        'className': 'comment',
        'begin': '{-',
        'end': '-}',
        'contains': ['self'],
      },

      // Directives
      {
        'className': 'meta',
        'begin': /#pragma/,
        'end': /;/,
        'contains': [
          { 'className': 'keyword', 'match': /version|not-version/ },
          {
            'className': 'operator',
            'match': hljs.regex.either(/>=/, /<=/, /=/, />/, /</, /\^/),
          },
          {
            'className': 'number',
            'match': /([0-9]+)(.[0-9]+)?(.[0-9]+)?/
          },
        ],
      },
      {
        'className': 'keyword',
        'begin': /#include/,
        'end': /;/,
        'contains': [
          { 'className': 'string', 'match': STRING },
        ],
      },

      // Primitives
      { 'className': 'number', 'match': NUMBER },
      { 'className': 'string', 'match': STRING },

      // Constans / Variables / Functions
      { 'className': 'function', 'match': new RegExp(IDENTIFIER + '(?=[\(])') },
      { 'className': 'variable.constant', 'match': /\b(const|global)\b/ },

      // Punctuation
      {
        'className': 'operator',
        'match': hljs.regex.either(
          /<=>/, />=/, /<=/, /!=/, /==/, /\^>>/, /~>>/,
          />>/, /<</, /\/%/, /\^%/, /~%/, /\^\//, /~\//, /\+=/,
          /-=/, /\*=/, /\/=/, /~\/=/, /\^\/=/, /%=/, /\^%=/, /<<=/,
          />>=/, /~>>=/, /\^>>=/, /&=/, /\^=/, /\|=/,
          /\^/, /=/, /~/, /\//, /%/, /-/, /\*/, /\+/,/>/,
          /</, /&/, /\|/, /:/, /\?/,
        ),
      },
      { 'className': 'puncuation', 'match': /[.;(),\[\]~{}]/ },
    ]
  }
}
