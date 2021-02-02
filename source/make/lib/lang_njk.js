const NJK_o = new Object( null )




//=== RESERVED ===//
NJK_o
  .reserved_a =
    [
      'include',
      '(?:end)?if',
      'else',
      '(?:end)?set',
      'macro',
      'raw',
      'extends',
    ]



//=== LOOP ===//
NJK_o
  .loop_a =
    [
      'for',
      'in',
    ]


//=== PROPERTY ===//
NJK_o
  .property_a =
    [
      'safe'
    ]


//=== CONTROL ===//
NJK_o
  .control_a =
    [
      '=',
      '\\{{2}',
      '\\}{2}',
      //??? '%',
      '\\{%',
      '%\\}',
      '\\-',
      '\\|',
      'and',
      'or',
      'not',
    ]




NJK_o
  .lang_o =    //: language API
{
  regex_o:
    {
      //=== aside ===
      block_re: /(\{#[^#]*#\})|(<!--.*?-->)|(<!--[\w\W\n\s]+?-->)/gms,          //: {# Comment #} <!-- HTML comment -->
      lit_re:   /(`[^\u0060]*`)/gms,         //: `template String`
      apos_re:  /('[^\u0027]*')/g,           //: 'String'
      quot_re:  /("[^\u0022]*")/g,           //: "String"
      html_re:  /(<[^>]+?>)/g,              //: HTML tag properties included
      //=== step ===
      res_a:   NJK_o.reserved_a,    //:
      prop_a:  NJK_o.property_a,    //:
      cont_a:  NJK_o.control_a,     //:
      loop_a:  NJK_o.loop_a,        //:
      
      num_re: /\b([-+]?[0-9]*\.?[0-9]+)\b/g,    //: Number
      //: user defined
      uv_re:  /\b(\w+_{1,2}[abcefnorsUvY]e?)\b/g,   //: user variable (e.g. 'name_s')
      //=== post ===
    }
  ,



  aside_a:
    [
      'block',
      'html',
      'lit',
      'apos',
      'quot',
    ]
  ,



  ante_a:
    [
      'cont',
      'res_b',
      'loop_b',
      'uv',
      'prop_b',
      'num',
    ]
  ,



  post_a:
    []
  ,



  hiline_a:
    []                //: 1-indexed (line index)
  ,



  // === CALLBACK ===


}



module.exports = NJK_o