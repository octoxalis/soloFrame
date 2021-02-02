const I_o = require('./ilite.js')


const lang__o =
(
  ext_s
) =>
{
  const map_s =
  {
    ['.css']:  require('./lang_css.js'),
    ['.js']:   require('./lang_js.js'),
    ['.html']: require('./lang_html.js'),
    ['.njk']:  require('./lang_njk.js')
  }
  return map_s[ext_s]
}



module.exports =
{
  ilite__s
  (
    code_s,
    lang_s,
    spot_a=[]
  )
  {
    const lang_o =
      lang__o( `.${lang_s}` )
        .lang_o
    lang_o.hiline_a =
      spot_a
    return (
      I_o
        .ilite__s
        (
          code_s,
          lang_o
        )
    )
  }
,



}
