/*
 * Functions
 * Naming scheme: function__s
 */
const A_o = require( './A_o.js' )
const U_o = require( './U_o.js' )
const C_o = require( './C_o.js' )

const OPEN_s  = '[='   //: substitute__s function delimiter
const CLOSE_s = '=]'   //: idem



module.exports =
{  
  siteUrl__s:
  ( file_s, dir_s=`${C_o.SLOTS_s}/` ) => `[${file_s.replace('_', ' ')}]: ${U_o.url_s}${dir_s}${file_s}.html`,



  codeUrl__s:
  path_s => `<a href="${U_o.GIT_SRC_s}${path_s}" target="_blank">${A_o.ID_s}/${path_s}</a>`,



  mediaUrl__s:
  () => `${U_o.url_s}${C_o.MEDIA_PATH_s}`,



  img1px__s:
  () => `${U_o.url_s}${C_o.MEDIA_PATH_s}1px.png`,
  


  eleventyUrl__s:
  key_s =>
  {
    const path_s = U_o[ `ELEVENTY_${key_s}` ]
    const anchor_n = path_s.indexOf( '#')
    if ( anchor_n === -1 )    //: return a link to 11ty.dev
    {
      console.log( `ALERT! no anchor found in path: ${path_s}` )
      const ref_n = U_o.ELEVENTY_DEV_s.indexOf( ':' )
      return { ref: U_o.ELEVENTY_DEV_s.substring( 0, ref_n ), link: U_o.ELEVENTY_DEV_s }
    }
    const anchor_s = path_s.substring( anchor_n )
    const anchorLink_s = U_o.ELEVENTY_DEV_s.replace( ']', `${anchor_s}]`) + path_s
    return { ref: anchorLink_s.substring( 0, anchorLink_s.indexOf( ':') ), link: anchorLink_s }
  },



  tagEscape__s:
  content_s => content_s.replace( /</g, '&lt;' ).replace( />/g, '&gt;' ),



  substitute__s: ( hay_s, dict_o, open_s=OPEN_s, close_s=CLOSE_s ) =>
  {
    const open_n = open_s.length
    const close_n = close_s.length
    let openAt_n,
        closeAt_n,
        key_s
  
    while ( (openAt_n = hay_s.indexOf( open_s ) ) > -1 )
    {
      closeAt_n = hay_s.indexOf( close_s )
      if ( closeAt_n > -1)
      {
        closeAt_n += close_n
        key_s = hay_s.substring( openAt_n, closeAt_n )
        hay_s = hay_s.replace( key_s, dict_o[key_s.slice( open_n, -close_n )] )
      }
    }
    return hay_s
  },
  


  Boolean__b:
  value_ =>
  {
    if ( typeof value_ === 'boolean' ) return value_
    if (!value_) return false
    const value_s = value_.toString().toLowerCase()
    switch ( true )
    {
      case ( value_s in [ 'true', 'yes', '1' ] ) :
        return true
      case ( value_s in [ 'false', 'no', '0' ] ) :
      case null :
        return false
      default: return Boolean (value_ )
    }
  },


  slotId__s:
  permalink_s =>
  {
    let index_n = permalink_s.lastIndexOf( '/') + 1  //: if ( index_n < 0 ) index_n = 0
    return permalink_s.slice( index_n, permalink_s.indexOf( '.html' ) )  //;console.log( `slot: ${id_s}`)
  },



  till__s:
  ( days_n=0 ) =>
  {
    const till_s = new Date()
    till_s.setDate( till_s.getDate() + days_n )
    return till_s
  },



  writeFile__v:
  (
    output_o
  ) =>
  {
    if ( output_o ) console.log( output_o )    //: null or error message
  }
}
