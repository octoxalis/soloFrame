const REX_o =
{
  comment_re: /\s+\/\/.*$/gm,
  space_re:   /^\s+|\s+$/gm,
  line_re:    /[\r\n]/g,



  new__re:
  (
    flag_s
  ) =>
  (    //: anonymous function
    string_s,
    ...value_a
  ) =>
  {
    const pattern__s =    //: local function
    (
      pattern_s,
      raw_s,
      at_n
    ) =>
    {
      let value_ =
        value_a
          [at_n]
      if ( value_ instanceof RegExp )
      {
        value_ =
          value_
            .source
      }
      return `${pattern_s}${raw_s}${value_ ?? ''}`
    }



    let compile_s =
      string_s
        .raw
        .reduce
        (
          pattern__s,
          ''
        )
    ;[
      REX_o.comment_re,
      REX_o.space_re,
      REX_o.line_re
    ]
      .forEach
      (
        regex_re =>
          compile_s =
            compile_s
              .replace
              (
                regex_re,
                ''
              )
      )
    return (
      new RegExp
      (
        compile_s,
        flag_s
      )
    )
  }
}


module.exports = REX_o