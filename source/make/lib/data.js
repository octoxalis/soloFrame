//=== Build global data access

const DATA_a =    // default exported data
[
  'layout',
  'permalink',
  //--'tags',
  //--'date',

  'doc_n',
  'title_s',
  'subtitle_s',
  'abstract_s',
  'author_s',

  'sitemap_exclude_b',
  'expires_n',
  'issue_n',
  'A_o',
  'C_o',
]

module.exports =
{
  data__o
  (
    permalink_s,
    collection_a
  )
  {
    let export_o = {}

    collection_a.forEach( collection_o =>
      {
        //;console.log( collection_o.data )
        const data_o = collection_o.data
        if ( data_o.permalink === permalink_s )
        {
          if ( data_o.export_a === null ) export_o = data_o    //: get all data!
          else
          {
            const export_a = data_o.export_a || DATA_a    //: get declared or default data only
            export_a.forEach( prop_s => export_o[prop_s] = data_o[prop_s] )
          }
        }
      } )
      
    return export_o
  }
,



}
