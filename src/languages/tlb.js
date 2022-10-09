/*
Language: TL-B
Author: Nikita Sobolev <mail@sobolevn.me>
Description: TL-B serves to describe the type system, constructors,
             and existing functions.
Website: https://ton.org/docs/#/overviews/TL-B
Category: smartcontracts
*/

const IDENTIFIER = /[a-zA-Z_][0-9a-zA-Z_]*/

export default function(hljs) {
  return {
    'name': 'TL-B',
    'aliases': ['Tlb', 'tlb', 'TLB', 'tl-b', 'TL-b', 'Tl-B', 'Tl-b'],
    'case_insensitive': false,

    'keywords': {
      'keyword': [],
      'literal': ['True', 'BoolTrue', 'False', 'BoolFalse', 'Null'],
      'type': [
        // These are special cased, because they are used way too often:
        'Type', 'Bool', 'Unit', 'Maybe', 'Either', 'Both', 'Cell',
        // Not mentioned, but also widely used:
        'int8', 'int16', 'int32', 'int64',
        'uint8', 'uint15', 'uint16', 'uint32', 'uint63', 'uint64',
        'bits256', 'bits512',
      ],
      'built_in': [],
    },

    'contains': [
      // Comments
      {
        'scope': 'comment',
        'variants': [
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.C_LINE_COMMENT_MODE,
        ],
      },

      // Type definitions and tags
      {
        'scope': 'symbol',
        'match': hljs.regex.either(
          /#0x[0-9a-f]*_?/,
          /#[0-9a-f]*_?/,
          /\$[01]*_?/,
          /##/,
          /#<=/,
          /#</,
        ),
      },
      {
        'match': [
          /=/,
          /\s+/,
          IDENTIFIER,
          /[\s;]/,
        ],
        'scope': {
          1: 'operator',
          3: 'type',
        },
      },

      // Variables
      { 'scope': 'variable', 'match': IDENTIFIER },

      // Operators
      {
        'scope': 'operator',
        'match': hljs.regex.either(
          /\+/, /-/, /\*/, /\//,
          /!=/, /==/, /=/,
          /\?/, /~/, /\./, /\^/,
          /<=/, />=/, /</, />/,
        ),
      },

      // Primitives
      { 'scope': 'number', 'match': /[0-9]+/ },

      // Punctuation
      { 'scope': 'punctuation', 'match': /[;\(\):\[\]\{\}]/ },
    ],
  }
}
