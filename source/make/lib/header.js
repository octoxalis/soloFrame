const fs  = require('fs-extra')

const WRITE_TIMEOUT_n = 1000



HEAD_o =
{
  directive_a: new Set(),
  path_s: '../site/_headers',
  
  
  
  till__s
  (
    days_n=60
  )
  {
    const till_s = new Date()
    till_s.setDate( till_s.getDate() + days_n )
    return till_s
  }
,
  
  
  
  write__v
  (
    header_s
  )
  {
    fs.appendFile(
      HEAD_o.path_s,
      header_s,
      'utf8',
      out_o => console.log( `-- Writing ${HEAD_o.path_s}: ${out_o}` ) )
  }
,
  
}



module.exports =
{
  add__v
  (
    data_o
  )
  {
    const expires_n = data_o.expires_n  //: only when expires_n is defined in front matter
    expires_n && HEAD_o.directive_a.add( { permalink_s:data_o.permalink, expires_n:expires_n } )
  }
,



  directive__s
  ()
  {
    let directive_s = ''
    for ( directive_o of HEAD_o.directive_a )
    {
      directive_s += `\n/${directive_o.permalink_s}\nExpires: ${HEAD_o.till__s( directive_o.expires_n )}`
    }
    return directive_s
  }
,
  

  
  write__v
  (
  header_s
  )
  { setTimeout( () => HEAD_o.write__v( header_s ), WRITE_TIMEOUT_n ) }
,



}