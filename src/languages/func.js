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
let NUMBER;

try {
  NUMBER = new RegExp("(-?(?!_)([\\d_]+|0x[\\d_a-fA-F]+)|0b[1_0]+)(?<!_)(?=[\\s\\)\\],;])");
} catch(e) {
  // some browsers don't support lookbehind
  NUMBER = /\d/; // TODO
}

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
        'const', 'global',
      ],
      'literal': ['true', 'false'],
      'type': ['var', 'int', 'slice', 'tuple', 'cell', 'builder', 'cont', '_'],
      'built_in': [],
    },

    'contains': [
      // Comments
      { 'scope': 'comment', 'begin': ';;', 'end': /(?=\n)/ },
      {
        'scope': 'comment',
        'begin': '{-',
        'end': '-}',
        'contains': ['self'],
      },

      // Directives
      {
        'scope': 'meta',
        'begin': /#pragma/,
        'end': /;/,
        'contains': [
          { 'scope': 'keyword', 'match': /version|not-version/ },
          {
            'scope': 'operator',
            'match': hljs.regex.either(/>=/, /<=/, /=/, />/, /</, /\^/),
          },
          {
            'scope': 'number',
            'match': /([0-9]+)(.[0-9]+)?(.[0-9]+)?/
          },
        ],
      },
      {
        'scope': 'keyword',
        'begin': /#include/,
        'end': /;/,
        'contains': [
          { 'scope': 'string', 'match': STRING },
        ],
      },

      // Primitives
      { 'scope': 'number', 'match': NUMBER },
      { 'scope': 'string', 'match': STRING },

      // Constans / Variables / Functions
      {
        'match': [
          /\b(const|global)\b/,
          /\s+/,
          /\w+/,  // in real world this is just a type, but we allow any text
          /\s+/,
          IDENTIFIER,
        ],
        'scope': {
          1: 'keyword',
          5: 'variable.constant',
        },
      },
      { 'scope': 'function', 'match': new RegExp(IDENTIFIER + '(?=[\(])') },

      // Punctuation
      {
        'scope': 'operator',
        'match': hljs.regex.either(
          /<=>/, />=/, /<=/, /!=/, /==/, /\^>>/, /~>>/,
          />>/, /<</, /\/%/, /\^%/, /~%/, /\^\//, /~\//, /\+=/,
          /-=/, /\*=/, /\/=/, /~\/=/, /\^\/=/, /%=/, /\^%=/, /<<=/,
          />>=/, /~>>=/, /\^>>=/, /&=/, /\^=/, /\|=/,
          /\^/, /=/, /~/, /\//, /%/, /-/, /\*/, /\+/,/>/,
          /</, /&/, /\|/, /:/, /\?/,
        ),
      },
      { 'scope': 'punctuation', 'match': /[\.;\(\),\[\]~\{\}]/ },
    ],
  }
}
