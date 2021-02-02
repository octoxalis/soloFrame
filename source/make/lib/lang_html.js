const HTML_o =
  new Object( null )


HTML_o
  .lang_o =    //: language API
  {
    regex_o:
    {
      //=== aside ===
      block_re: /(<!--[\w\W\n\s]+?-->)/gms,    //: <!-- HTML comment NOT EMPTY!!!-->
      lit_re:   /(`[^\u0060]*`)/gms,           //: `template String`
      apos_re:  /('[^\u0027]*')/g,             //: 'String'
      quot_re:  /("[^\u0022]*")/g,             //: "String"
      attr_re:  /\b([\w\-]+\s?=)/gms,          //: HTML tag properties
      cont_re:   /(<!?[a-zA-Z0-9]+\s?>?)|(>)|(<\/?[a-zA-Z0-9]+?\s?\/?>)/gms,            //: HTML tag only
      //=== step ===
      num_re: /\b([-+]?[0-9]*\.?[0-9]+)\b/g,    //: Number
      //=== post ===
    }
    ,



    aside_a:    //!!! order matters
      [
        'block',
        'lit',
        'apos',
        'quot',    //--> callback
        'cont',
      ]
    ,



    ante_a:
      [
        'attr',
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
    quot__s:
      (
        code_s
      ) =>
      {
        [ ...code_s.matchAll( /(https?:\/\/[^"]+)/g ) ]
          .forEach
          (
            match_a =>  
            {
              code_s =
                code_s
                  .replace
                  (
                    match_a[0],
                    `<b class="i_href">${match_a[0]}</b>`
                  )
            }
          )
        return code_s
      }
    ,


    }



    
module.exports = HTML_o
