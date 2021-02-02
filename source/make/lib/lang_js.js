const I_o = require('./ilite.js')


const JS_o =
  new Object( null )



//=== OPERATOR ===//
JS_o
  .operator_a =
    [
      '\\+{1,2}',
      '\\-{1,2}',
      '\\*={0,1}',
      '\\/={0,1}',
      '<={0,1}',
      '>={0,1}',
      '&{1,2}',
      '\\|{1,2}',
      //-- '\\^',
      '={1,3}',
      '!={0,2}',
      '~={0,1}',
      '%={0,1}',
      '=>',
    
      '\\[',      //: GROUP
      '\\]',
      '\\{',
      '\\}',
    
      ';',        //: PUNCTUATION
      ',',
      '\\.\{3\}',
      '\\?{1,2}',
      ':',
    
    ]




//=== RESERVED ===//
JS_o
  .reserved_a =
    [
      //--'abstract',
      //--'arguments',
      //--'debugger',
      //--'delete',
      //--'eval',
      'export',
      //--'extends',
      //--'final',
      'function',
      //--'implements',
      'import',
      //--'interface',
      'new',
      //--'package',
      //--'private',
      //--'protected',
      //--'public',
      //--'super',
      //--'synchronized',
      'this',
      //--'throw',
      //--'throws',
      //--'transient',
      'void',
      //--'volatile',
    ]



//=== LOOP ===//
JS_o
  .loop_a =
    [
      'continue',
      'do',
      'for',
      'forEach',
      'in',
      'of',
      'while',
    ]



//=== CONTROL ===//
JS_o
  .control_a =
    [
      'async',
      'await',
      'break',
      'case',
      'catch',
      'default',
      'else',
      //--'finally',
      //--'goto',
      'if',
      'return',
      'switch',
      'try',
      'with',
      'yield'
    ]



//=== TYPE ===//
JS_o
  .type_a =
    [
      //'byte',
      'char',
      'class',
      'double',
      'enum',
      'false',
      'float',
      'instanceof',
      'int',
      'long',
      //--'native',
      'null',
      //'short',
      'static',
      'true',
      'typeof',
    
      "Array",
      "Boolean",
      "Date",
      "Infinity",
      "NaN",
      "Number",
      "Object",
      "String",
      "undefined",
    ]



//=== DECLARATION ===//
JS_o
  .declare_a =
    [
      'const',
      'let',
      'var',
    ]



//=== PROPERTY ===//
JS_o
  .property_a =
    [
      //--"hasOwnProperty",
      //--"isFinite",
      //--"isNaN",
      //--"isPrototypeOf",
      "length",
      "Math",
      //--"name",
      //--"prototype",
      //--"toString",
      //--"valueOf"
    ]



JS_o
  .lang_o =    //: language API
  {
    regex_o:
      {
        //=== aside ===
        line_re:  /((?:^|\s)\/\/(.+?)$)/gms,   //: //Comment
        block_re: /(\/\*.*?\*\/)/gms,          //: /*Comment*/
        reg_re:   /\b(\/.+\/[gimsu]+)\b/g,     //: RegExp
        lit_re:   /(`[^\u0060]*`)/gms,         //: `template String`
        apos_re:  /('[^\u0027]*')/g,           //: 'String'
        quot_re:  /("[^\u0022]*")/g,           //: "String"
        //=== ante ===
        op_a:    JS_o.operator_a,
        res_a:   JS_o.reserved_a,
        loop_a:  JS_o.loop_a,
        cont_a:  JS_o.control_a,
        type_a:  JS_o.type_a,
        dec_a:   JS_o.declare_a,
        prop_a:  JS_o.property_a,
        punct_a: JS_o.punctuation_a,
        log_re:  /(console\s*\.[^(]+)/gms,             //: console
        num_re:  /\b([-+]?[0-9]*\.?[0-9]+)\b/g,        //: Number
        //=== post ===
        uv_re:   /\b(\w+_{1,2}[abcefnorsUvY]e?)\b/g,   //: user variable (e.g. 'name_s')
      }
    ,


    aside_a:    //!!! KEEP ORDER
      [
        'line',
        'block',
        'reg',
        'lit',    //--> callback
        'apos',
        'quot',
      ]
    ,


    ante_a:    //!!! KEEP ORDER
      [
        'op',
        'res_b',    //: see I_o.BOUND_s
        'loop_b',
        'cont_b',
        'type_b',
        'dec_b',
        'prop_b',
        'log',
        'num',
      ]
      ,
      
      
      
      post_a:    //!!! KEEP ORDER
      [
        'uv',
      ]
    ,


    hiline_a:
      []                //: 1-indexed (line index)
    ,



    // === CALLBACK ===
    lit__s:
    (
      code_s,
      aside_s
    ) =>
    {
      let lit_s = ''
      const split_a =
      code_s
        .split
        (
          /(\$\{[^\{\}]+?\})/gms
        )
      if ( split_a.length < 2 )
      {
        return code_s
      }

      split_a
        .forEach
        (
          temp_s =>
          {
            lit_s +=
              temp_s
                .charAt( 0 ) === '$'
                  ?
                    JS_o
                      .lang_o
                      .temp__s
                      (
                        temp_s,
                        aside_s
                      )
                  :
                    temp_s
          }
        )
        return lit_s
    }
    ,



    temp__s:    //: from lit callback
    (
      temp_s, 
      aside_s
    ) =>
    {
      const regex_re =
        I_o
          .mark__re( 'uv' )
      temp_s =
        temp_s
          .replaceAll
          (
            regex_re,
            `<${I_o.TAG_s} class="i_uv">${aside_s}</${I_o.TAG_s}>`
          )
      return `<${I_o.TAG_s} class="i_temp">${temp_s}</${I_o.TAG_s}>`
    }
    ,
  }


module.exports = JS_o
