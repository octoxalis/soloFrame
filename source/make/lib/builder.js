const HEAD_o = require( './header.js' )
const CSP_o =  require( './csp.js' )
const C_o =    require( '../data/C_o.js' )
const F_o =    require( '../data/F_o.js' )



const BUI_o =
{
  file_a:   null,
  docs_a:   new Map(),
  count_n:   0,
  current_n: 0,
  
  
  
  buildStart__v
  (
    data_o
  )
  {
    console.log( `${BUI_o.count_n} Markdown files to process` )
  }
,

  
  
  buildEnd__v
  (
    end_s,
    data_o
  )
  {
    HEAD_o
      .write__v
      ( `${CSP_o.directive__s()}\n${HEAD_o.directive__s()}\n` )
  }
,

  
  
  templateStart__s
  (
    input_s,
    data_o
  )
  {
    let slash_n = data_o.permalink.lastIndexOf( '/')
    const id_s = data_o.permalink.slice( slash_n + 1, '.html'.length * -1 )
    const path_s = ( slash_n < 0 ) ? '' : data_o.permalink.slice( 0, slash_n )
    BUI_o.docs_a.set( id_s, { path_s: path_s } )
    let start_s = input_s
    //... what else?
    return start_s
  }
,
  
  
  templateEnd__s
  (
    input_s,
    data_o
  )
  {
    HEAD_o
      .add__v( data_o )

    CSP_o
      .add__s( input_s )

    return input_s
  }
,

  
  
  headEnd__s
  (
    input_s,
    data_o
  )
  {
    let end_s = input_s
    //... what else?
    return end_s
  }
,

  
  
  bodyEnd__s
  (
    input_s,
    data_o
  )
  {
    let body_s = input_s
    return body_s
  }
,



}




module.exports =
{
  start__s
  (
    input_s,
    data_o
  )
  {
    if ( BUI_o.current_n === 0 && BUI_o.file_a ) BUI_o.buildStart__v( data_o )
    let start_s = BUI_o.templateStart__s( input_s, data_o )
    return start_s
  }
,



  end__s
  (
    input_s,
    data_o
  )
  {
    ++BUI_o.current_n    //;console.log( `${BUI_o.current_n} / ${BUI_o.count_n}`)
    let end_s = BUI_o.templateEnd__s( input_s, data_o )
    if ( BUI_o.file_a && BUI_o.current_n === BUI_o.count_n - 1 ) BUI_o.buildEnd__v( end_s, data_o )
    return end_s
  }
,



  head__s
  (
    input_s,
    data_o
  )
  { return BUI_o.headEnd__s( input_s, data_o ) }
,



  body__s
  (
    input_s,
    data_o
  )
  { return BUI_o.bodyEnd__s( input_s, data_o ) }
,



}



/**
 * List Markdown files to process
 * Keep 2 levels depth only for content slots
 */
void function ()
{
  const MD_DIR_s = C_o.CONTENT_PATH_s    //: all Mardown files
  const DEPTH_n  = 2

  BUI_o
    .file_a = require( 'klaw-sync' )( MD_DIR_s, { nodir: true, depthLimit: DEPTH_n } )

  if ( BUI_o.file_a )
  {
    BUI_o
      .count_n = BUI_o.file_a.length
  }
} ()
