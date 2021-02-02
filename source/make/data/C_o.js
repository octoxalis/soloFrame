/*
 * COMPONENTS constants for templates
 */
const CONF_o = require( '../../configure.js' )

module.exports =
{
  //=== HEAD ===
  INLINE_s: 'inline_style',


  //=== HEADERS ===
  csp_o:
  {
    HEAD_o:  //!!! DON'T change order
    {
      DEFAULT_SRC:     '',
      BASE_URI:        '',
      FONT_SRC:        '',
      CONNECT_SRC:     '',
      PREFETCH_SRC:    '',  //: requires 'enable-experimental-web-platform-features' flag
      IMG_SRC:         '',
      FRAME_SRC:       '',
      FRAME_ANCESTORS: '',
      FORM_ACTION:     '',
      MANIFEST_SRC:    '',
      SCRIPT_SRC_ELEM: '',
      SCRIPT_SRC:      '',
      OBJECT_SRC:      '',
      STYLE_SRC:       `'unsafe-inline'`,  //: for browser not accepting sha-256 (Firefox-78!)
    },
  },


  //=== SERVICE WORKER ===
  SERVICE_b: CONF_o.SERVICE_b,


  //=== DIR ===
  MEDIA_PATH_s:   'assets/media/',
  CONTENT_PATH_s: 'matter/content/',

  KEY_n: 2,            //: service worker key
  
  //=== SECTIONS ===
  SEC_HOME_s: 'HOME',


  //=== CSS ===
  FULL_WIDTH:  '100vw',
  FULL_HEIGHT: '100vh',
  HALF_WIDTH:  '50vw',
  
  FONT_BODY: `'Cantarell Regular', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Helvetica Neue, sans-serif`,
  FONT_MONO: `'JetBrains Mono Light', system-ui, -apple-system, BlinkMacSystemFont, 'Ubuntu Mono', 'Liberation Mono', 'Courier New', Courier, monospace`,


  //=== CSS constants to avoid calc(): can be changed in configure.js ===  
  HUE_P_n:        CONF_o.HUE_P_n,
  LUM_MODE_n:     CONF_o.LUM_MODE_n,
  LUM_BASE_n:     CONF_o.LUM_BASE_n,
  LUM_CONTRAST_n: CONF_o.LUM_CONTRAST_n,
  LUM_FRONT_s:    CONF_o.LUM_FRONT_s,
  LUM_BACK_s:     CONF_o.LUM_BACK_s,


  PAD_1:  .25 * 1 + 'em',
  PAD_2:  .25 * 2 + 'em',
  PAD_4:  .25 * 4 + 'em',
  PAD_6:  .25 * 6 + 'em',
  PAD_8:  .25 * 8 + 'em',
  PAD_12: .25 * 12 + 'em',
  PAD_16: .25 * 16 + 'em',

}
