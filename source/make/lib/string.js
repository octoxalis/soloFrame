module.exports =
{
  quoteEsc__s
  (
    string_s
  )
  { return string_s.replace( /(['"])/g, '\$1' ) }

,

  escape__s
  (
    string_s
  )
  { return string_s.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&') }
,



}
