const FS_o = require('fs-extra')
const CRYPTO_o  = require('crypto')

const SPLIT__a   = require( '../lib/block_split.js' )
const CODE_o     = require( '../lib/code.js' )
const REX_o      = require( '../lib/regex.js' )
const F_o        = require( '../data/F_o.js' )



const CODES_o =
{
  section__s:    //: render only the open section tag
  (
    section_s
  ) =>
  {
    const sectionSlug_s =
      F_o
        .slug__s( section_s )

    return (
      //--HTML
      `<section id="${section_s}"><h2>${section_s}<a name="${sectionSlug_s}"></a></h2>\n`  //: \n is mandatory
    )
  }
  ,



  end_section__s:    //: render only the close section tag
  () =>
  {
    return (
      //--HTML
      `</section>\n`  //: \n is mandatory
    )
  }
  ,


  anchor__s:    //: create an anchor header
  (
    anchor_s
  ) =>
  {
    let at_n = 0

    while
    (
      at_n < anchor_s.length
      &&
      anchor_s.charAt( at_n ) === '#'
    )
    {
      ++at_n
    }

    const name_s =
      anchor_s
        .slice( at_n )

    const nameSlug_s =
      F_o
        .slug__s( name_s )    //;console.log( name_s )

    return (
      //--HTML
      `<h${at_n}>${name_s}<a name="${nameSlug_s}"></a></h${at_n}>\n`  //: \n is mandatory
    )
  }
  ,


  tnote__s:
  (
    content_s
  ) =>
  {
    const sha_s =
     CRYPTO_o
      .createHash( 'sha256' )
      .update( content_s )
      .digest( 'hex' )
      .slice( 0, 16)        //;console.log( sha_s )

    return (
      //--HTML
      `<label for="${sha_s}">\u25FF</label><input type="checkbox" id="${sha_s}"><small>${content_s}</small>`
    )
  }
  ,


  code__s:
  (
    path_s    //: 'path/to/file.ext#index_s', index_s empty for full file
  ) =>
  {
    const [ file_s, index_s ] =
      path_s
        .split( '#' )

    const source_s =
    FS_o
      .readFileSync
      (
        file_s,
        'utf8',
        'r'
      )

    if ( index_s === '' )    //: keep full file
    {
      return source_s
    }
    //>
    const CODE_TAG_s =
      `
      @code     //: code tag
      =         //: code ID delimiter
      `

    const smRE_o =
      REX_o
        .new__re( 'sm' )    //: non-global regex

    const code_re =
      smRE_o
      `
      ${CODE_TAG_s}${index_s}
      (       //: open capture group
      [       //: open char range
      \s\S    //: anything
      ]       //: close char range
      *?      //: non-greedy...
      )       //: close capture group
      ${CODE_TAG_s}${index_s}
      `

    const code_a =
      source_s
        .match( code_re )

    return (
      code_a
      ?
        code_a[1]
      :
        ''
      )
  }
,



  code_block__s:
  content_s =>
    {
      let [ content_a, content_o ] =
      SPLIT__a
        (
          content_s,
          '_code_block'
        )
  
      let safe_s =
        content_a[1]
          .trim()
  
      const title_s =
        content_o
          .title_s
          .charAt(0) === '#'  //: # for nonlink title
          ?
            content_o
              .title_s
              .slice(1)    //: strip starting '#' char
          :
            F_o
              .codeUrl__s( content_o.title_s )
  
      const code_s =
        CODE_o
          .ilite__s
          (
            safe_s,
            content_o
              .lang_s,
            content_o
              .spot_a,
          )
  
      return (
        //--HTML
        `<div data-id="code_ref">
        <dl data-id="code_ref">
        <dt>Source: ${title_s}</dt>
        <dd>
        <a href="https://ilite.netlify.app" target="_blank" title="Interactively highlighted by ilite.js">ilite</a>
        </dd></dl></div>
        <pre data-id="code">
        <code data-id="code" data-lang="${content_o.lang_s}">${code_s}</code>
        </pre>`    //: <pre> and <div> as wrappers for full width <code> and <dl>
      )
    }
  ,
  }




module.exports = make_o =>
{
  [
    'section',
    'end_section',
    'anchor',
    'code',
  ]
    .forEach
    (
      code_s =>
        make_o
          .addNunjucksShortcode
          (
            `${code_s}`,        //: simple shortcodes have no leading underscore
            (
              arg_
            ) =>
              CODES_o
              [ `${code_s}__s` ]
              (
                arg_
              )
      )
    )
  ,



  [ 
    'tnote',
    'code_block',
  ]
    .forEach
    (
      code_s =>
        make_o
          .addPairedShortcode
          (
            `_${code_s}`,        //: paired shortcodes have a leading underscore
            (
              content_s,
              arg_
            ) =>
              CODES_o
                [ `${code_s}__s` ]
                (
                  content_s,
                  arg_
                )
          )
      )
}
