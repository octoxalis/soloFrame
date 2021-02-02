//=== ilite.js === ilite main module

const I_o =
{
  //~~lang_o,    //: language API


  TAG_s: 'i',    //: `<i class="i_dec">const</i>`
  MARK_s: '₊',     //: index number delimiter
  BOUND_s: '_b',   //: bound regex_s suffix
  UNICODE_o:       //: lookup tables to for subscript Unicode values [0-9] <--> [₀-₉]
  {
    plain_a: [ '\u0030', '\u0031', '\u0032', '\u0033', '\u0034', '\u0035', '\u0036', '\u0037', '\u0038', '\u0039' ],
    sub_a:   [ '\u2080', '\u2081', '\u2082', '\u2083', '\u2084', '\u2085', '\u2086', '\u2087', '\u2088', '\u2089' ]
  },


  
  escape__s:  //: escape ilite tag chars [< = " /]
  (
    code_s
  ) =>
    code_s
      .replaceAll('&', '&amp;')    //!!! order matters
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
  ,



  mark__re:  //: 
  (
    regex_s
  ) =>
  {
    let mark_s =
      `${I_o.MARK_s}${regex_s}${I_o.MARK_s}`
    return (
      new RegExp
      (
        `${mark_s}([₀-₉]+)${mark_s}`,
        'gms'
      )
    )
  }
  ,



  subscript__s:
  (
    code_s,
    subscript_b=true    //: target is subscript [\u0030-\u0039] --> [\u2080-\u2089]
  ) =>
  {
    let from_s =
      'plain_a'
    let to_s =
      'sub_a'
    if ( !subscript_b )
    {
      from_s =
        'sub_a'
      to_s =
        'plain_a'
    }
    const from_a =
      I_o
        .UNICODE_o
          [from_s]
    const to_a =
      I_o
        .UNICODE_o
          [to_s]
    for
    ( 
      let at_n = 0;
      at_n < 10;
      ++at_n
    )
    {
      code_s =
        code_s
          .replaceAll
          (
            from_a[at_n],
            to_a[at_n],
          )
    }
    return code_s
  }
  ,



  exit__a:
  (
    code_s,
    regex_s,
    aside_a,
  ) =>
  {
    let mark_s =
      `${I_o.MARK_s}${regex_s}${I_o.MARK_s}`
    let regex_re =
      I_o.
        lang_o
          .regex_o
          [`${regex_s}_re`]
    let index_n = -1
    ;[ ...code_s.matchAll( regex_re ) ]
      .forEach
      (
        match_a =>
        {
          const exit_s =
            match_a[0]
          const index_s =
            I_o
              .subscript__s( (++index_n).toString() )    //: String cast
          const enter_s =
            `${mark_s}${index_s}${mark_s}`
          code_s =
            code_s
              .replace
              (
                exit_s,
                enter_s
              )
          aside_a
            .push(exit_s)
        }
      )
    return [code_s, aside_a]
  }
  ,



  enter__a:
  (
    code_s,
    regex_s,
    aside_a,
  ) =>
  {
    const regex_re =
      I_o
        .mark__re( regex_s )
    ;[ ...code_s.matchAll( regex_re ) ]
      .forEach
      (
        match_a =>
        {
          const exit_s =
            match_a[0]
          const index_s =
            I_o
              .subscript__s
              (
                match_a[1],
                false
              )
          const escape_s =
            I_o
              .escape__s
              (
                aside_a[ +index_s ]    //: Number cast
              )
          let enter_s =
            `<${I_o.TAG_s} class="i_${regex_s}">${escape_s}</${I_o.TAG_s}>`
          if
          ( 
            I_o
              .lang_o
              [`${regex_s}__s`]
          )
          {
            enter_s =
              I_o
                .lang_o
                [ `${regex_s}__s` ]( enter_s, exit_s )
          }
          code_s =
            code_s
              .replace
              (
                exit_s,
                enter_s
              )
        }
      )
    return [code_s, aside_a]
  }
  ,



  aside__a:  //: (exit|enter) (strings|comments)
  (
    code_s,
    aside_o,   //: empty when 'exit'
    way_s,     //: 'exit' | 'enter'
  ) =>
  {
    I_o
      .lang_o
      .aside_a
        .forEach
        (
          regex_s =>
          {
            if (!aside_o[ regex_s ])
            {
              aside_o[ regex_s ] = []
            }
            let return_a =
              I_o
                [`${way_s}__a`]
                (
                  code_s,
                  regex_s,
                  aside_o[ regex_s ],
                )
            code_s =
              return_a[0]
            aside_o[ regex_s ] =
              return_a[1]
          }
        )
    return [code_s, aside_o]
  }
  ,



  regex__re:
  (
    regex_s,
  ) =>
  {
    const regex_ =
      I_o
        .lang_o
        .regex_o
        [`${regex_s}_a`]
    if
    (
      Array
        .isArray(regex_)
    )
    {
      return (
        new RegExp
        (
          `\\b(${regex_.join('|')})(?!=)\\b`,
          'g'
        )
      )
    }
    //>
    return (
      I_o
        .lang_o
        .regex_o
        [`${regex_s}_re`]
    )
  }
  ,



  step__s:
  (
    code_s,
    order_s,    //: ante || post
  ) =>
  {
    I_o
      .lang_o
      [`${order_s}_a`]
        .forEach
        (
          regex_s =>
          {
            let bound_s = ''
            const at_n =
              regex_s
                .indexOf( I_o.BOUND_s )
            if ( at_n > -1 )
            {
              bound_s =
                '\\b'
              regex_s =
                regex_s
                  .slice
                  (
                    0,
                    -I_o.BOUND_s.length
                  )
            }
            let replace_s = ''
            let regex_a =
              I_o
                .lang_o
                .regex_o
                [ `${regex_s}_a` ]
            const regex_re =
              Array.isArray( regex_a ) ?
                new RegExp
                  (
                    `${bound_s}(${regex_a.join('|')})(?!=)${bound_s}`,
                    'g'
                  )
                :
                I_o
                  .lang_o
                  .regex_o
                  [ `${regex_s}_re` ]  
            code_s
              .split( regex_re )
              .forEach
              (
                split_s =>
                {
                  replace_s +=
                    regex_re
                      .test( split_s ) ?
                        `<${I_o.TAG_s} class="i_${regex_s}">${split_s}</${I_o.TAG_s}>`
                        :
                        split_s
                }
              )
            code_s =
              replace_s
              ||
              code_s
            if
            (
              I_o
                .lang_o
                [ `${regex_s}__s` ]
            )
            {
              code_s =
                I_o
                  .lang_o
                  [`${regex_s}__s`]( code_s )
            }
          }
        )
    return code_s
  }
  ,



  line__s:
  (
    code_s,
  ) =>
  {
    if ( !code_s ) return    //: empty source
    //>    
    let acode_s = ''
    let line_n = 1
    code_s
      .split( '\n' )
      .forEach
      (
        (
          line_s,
          at_n
        ) =>
        {
          const class_s =
            I_o
              .lang_o
              .hiline_a
              .includes( at_n + 1 )   //: 1-indexed
              ?
                ' class="i_hi"'
              :
                ''
          acode_s +=
            `<li data-i=${line_n++}${class_s}>${line_s}`
        }
      )
    return `<ol class="i_code">${acode_s}</ol>`
  }
  ,



  ilite__s:
  (
    code_s,
    lang_o
  ) =>
  {
    console.time( 'ilite' )
    //---------------------
    I_o.lang_o =
      lang_o
    code_s =
      code_s
        .trim()
    const exit_a =
      I_o
        .aside__a
        (
          code_s,
          {},      //: aside_o
          'exit'
        )
    code_s =
      I_o
        .step__s
        (
          exit_a[0],
          'ante'
        )
    const enter_a =
      I_o
        .aside__a
        (
          code_s,
          exit_a[1],
          'enter'
        )
    code_s =
      I_o
        .step__s
        (
          enter_a[0],
          'post'
        )
    //------------------------
    console.timeEnd( 'ilite' )
    return (
      I_o
        .line__s( code_s )
    )
  }
  ,

}



module.exports = I_o
