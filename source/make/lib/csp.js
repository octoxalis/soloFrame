const CRYPTO_o  = require('crypto')
const C_o = require( '../data/C_o.js' )
const U_o = require( '../data/U_o.js' )

const STYLE_OPEN_s = `<style data-id="${C_o.INLINE_s}">`
const STYLE_CLOSE_s = '<\\/style>'




const CSP_o =
{

  style_re: new RegExp( `${STYLE_OPEN_s}([\\s\\S]*?)${STYLE_CLOSE_s}`, 'ig'),
  style_a: new Set(),



  style__a
  (
    input_s
  )
  { return input_s.matchAll( CSP_o.style_re ) }
,
  
  
  
  hash__s
  (
    code_s
  )
  {
    return CRYPTO_o
    .createHash( 'sha256' )
    .update( code_s )
    .digest( 'base64' )
  }
,



}



module.exports =
{
  add__s
  (
    input_s
  )
  { return CSP_o.style_a.add( CSP_o.style__a( input_s ) ) }
,



  directive__s
  ()
  {
    let csp_s = ''
    for ( let [key_s, value_s] of Object.entries( C_o.csp_o.HEAD_o ) )
    {
      csp_s += ` ${key_s.toLowerCase().replace( /_/g, '-' )} ${U_o.url_s} ${value_s};`
    }
    csp_s = csp_s.slice( 0, -1 )  //: trim last ';' (it's not over)
    for ( let style_a of CSP_o.style_a )
    {
      for ( let match_a of style_a ) csp_s += ` 'sha-256-${CSP_o.hash__s( match_a[1] )}'`
    }
    return `Content-Security-Policy:${csp_s};`
  }
,



}
