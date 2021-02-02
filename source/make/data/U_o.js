// === = U_o.js === //

require('dotenv').config({ path: '../env/soloFrame' })

const A_o = require( './A_o.js' )



const U_o =
{
  //~~dev_b: true,   //: development/production switch
  dev_b: false,  //!!!! REMEMBER TO ADJUST SERVICE_PATH_s & SERVICE_SCOPE_s
  url_s: null,

  PRO_s: process.env.URL_s,
  DEV_s: process.env.LOCAL_s,

  GIT_s: `https://github.com/${A_o.AUTHOR_s}/${A_o.ID_s}/`,
  GIT_SRC_s: `https://github.com/${A_o.AUTHOR_s}/${A_o.ID_s}/blob/master/`,
  SERVICE_PATH_s: 'service_worker.min.js',    //: WITHOUT Service-Worker-Allowed HTTP header 

  //-- SERVICE_PATH_s: 'assets/scripts/js/service_worker.min.js',    //: NEEDS Service-Worker-Allowed HTTP header
  //-- SERVICE_SCOPE_s: '../../../',  //: assets/scripts/js/
  SERVICE_SCOPE_s: '/',                 //: site root

  //=== EXTERNAL LINKS/REFERENCES
  SOLO_GIT_R_s:  `[G]: https://github.com/octoxalis/soloFrame`,
  SOLO_SRC_R_s:  `https://github.com/octoxalis/soloFrame/blob/main/source/`,

  E11TY_s:       `[Eleventy][E]`,
  E11TY_R_s:     `[E]: https://www.11ty.dev/`,
  NETLIFY_s:     `[Netlify][N]`,
  NETLIFY_R_s:   `[N]: https://www.netlify.com`,
  STRICT_s:      `[StrictMarkdown][S]`,
  STRICT_R_s:    `[S]: http://doc.replicated.cc/%5EWiki/strictmark.sm`,
  NODE_s:        `[Node JS][J]`,
  NODE_R_s:      `[J]: https://nodejs.org`,


  setup__v:
  () =>
  {
    U_o.url_s =
      U_o
        [
          U_o.dev_b === true
          ?
            'DEV_s'
          :
            'PRO_s'
        ]
    
    //======================
    console
      .log( `Site URL: ${U_o.url_s}` )
  }

}

U_o
  .setup__v()

module.exports = U_o
