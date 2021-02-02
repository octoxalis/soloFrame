;console.log( `Init 11ty in current dir: ${__dirname}` )



const C_o = require( './make/data/C_o.js' )



const MAKE_o =
{
  markdownTemplateEngine: 'njk',
  htmlTemplateEngine:     'njk',
  dataTemplateEngine:     'njk',
  templateFormats:        [ 'njk', 'md' ],
  passthroughFileCopy:    true,
  pathPrefix:             '/',
  dir:
    {
      input:    '.',              //: build from source dir
      output:   '../site',
      data:     'make/data',
      includes: 'matrix',
    },

  tag_a:    //: to create collections
    [
      {
        sort_f: 'sortByDoc__a'
      },
    ],
  static_o:
    {
      "matrix/assets/static": "assets"    //: static files
    },
  dirs_o:
    {
      makeDir_s:  'make/11ty/',
      contentPartsDir_s: './matter/content/parts',
    }
}



module.exports =
(
  make_o
) =>
{
  make_o.tag_a =
    MAKE_o
      .tag_a

  make_o.matrixDir_s =
    MAKE_o
      .dir
      .includes

  make_o.dirs_o =
    MAKE_o
      .dirs_o
      
  make_o
    .addPassthroughCopy( MAKE_o.static_o )

; [
    'libraries',
    'shortcodes',
    'filters',
    'collections'
  ]
    .forEach
    (
      make_s =>
        require
        (
          `./${MAKE_o.dirs_o.makeDir_s}${make_s}.js`
        )( make_o )
    )
  return MAKE_o    // : return the configuration object for further customization
}
