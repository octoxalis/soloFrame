const I_o = require('./ilite.js')



const CSS_o =
  new Object( null )


  
//=== OPERATOR ===//
CSS_o
  .operator_a =
    [
      '=',
    
      '\\{',
      '\\}',
    
      ';',
      ',',
      '\/',
      ':',
    
    ]




//=== RESERVED ===//
CSS_o
  .reserved_a =
    [
      'media',
    ]




//=== DECLARATION ===//
CSS_o
  .declare_a =
    [
      'calc',
      'var',
      'hsla',
      'repeat',
    ]


//=== PROPERTY ===//
CSS_o
  .property_a =
    [
      'display',
      'position',
      'color',
      'background',
      //?? 'border',
      //?? 'font',
      'transform',
      //?? 'filter',
      'animation',
    ]



//=== ELEMENT ===//
CSS_o
  .node_a =
    [
      'body',
      'main',
      'section',
      'article',
      'button',
      'div',
      'code',
    ]



//=== SELECTORS ===//
CSS_o
  .select_a =
    [
      '#',
      '\\.',
      '\\[',
      '\\]',
    ]



//=== UNITS ===//
CSS_o
  .percent_a =
    [
      '%',        //!!!'%' not matched by regex_o.unit_re !!!
    ]



CSS_o
  .lang_o =    //: language API
  {
    regex_o:
      {
        //=== aside ===
        block_re: /(\/\*.*?\*\/)/gms,          //: /*Comment*/
        lit_re:   /(`[^\u0060]*`)/gms,         //: `template String`
        apos_re:  /('[^\u0027]*')/g,           //: 'String'
        quot_re:  /("[^\u0022]*")/g,           //: "String"
        CHILD_re: /(>)/g,                      //!!! upper case to avoid clash with ch unit
        //=== step ===
        res_a:   CSS_o.reserved_a,    //:
        dec_a:   CSS_o.declare_a,     //:
        sel_a:   CSS_o.select_a,      //:
        prop_a:  CSS_o.property_a,    //:
        node_a:  CSS_o.node_a,        //:
        per_a:  CSS_o.percent_a,      //:
        punct_a: CSS_o.punctuation_a, //:
        op_a:    CSS_o.operator_a,    //:
      
        unit_re: /(ch|r?em|px|vh|vw|vmin|vmax|fr)\b/g,
        num_re: /\b([-+]?[0-9]*\.?[0-9]+)\b/g,    //: Number
        var_re: /(--\w+)/gms,   //: custom variable
        //=== post ===
      }
    ,



    aside_a:
      [
        'block',
        'lit',
        'apos',
        'quot',
        'CHILD',
      ]
    ,



    ante_a:
      [
    
        'op',
        'sel',
        
        'prop_b',
        'res_b',    //: see I_o.BOUND_s
        'node_b',
        
        'var',
        'unit',    //: before 'num'
        'per',
        'num',
      ]
    ,



    post_a:
      [
        'dec_b',
      ]
    ,
    


    hiline_a:
      []                //: 1-indexed (line index)
    ,



    // === CALLBACK ===
    //?? lit__s:
    //??   (
    //??     code_s
    //??   ) =>
    //??   {
    //??     let lit_s = ''
    //??     code_s
    //??       .split
    //??       (
    //??         /(\$\{[^\}]+\})/gms
    //??       )
    //??       .forEach
    //??       (
    //??         split_s =>
    //??         {
    //??           lit_s +=
    //??             split_s
    //??               .charAt( 0 ) === '\u0024'
    //??                 ?
    //??                   `<${I_o.TAG_s} class="i_temp">${split_s}</${I_o.TAG_s}>`
    //??                 :
    //??                   split_s
    //??         }
    //??       )
    //??     return lit_s
    //??   }
    //?? ,

  }
  


  module.exports = CSS_o

