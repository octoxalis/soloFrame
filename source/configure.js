/*
 * Site globals for installation
 */


module.exports =
{
  //=== SERVICE WORKER ===
  SERVICE_b: true,      //: enable Service Worker (false to disable)

  //=== CSS constants to avoid calc(): can be changed! ===  
  HUE_P_n:        228,  //: theme PRIMARY color in range [0...359]
  LUM_MODE_n:     -1,   //: luminosity mode: 1 (light) || -1 (dark)
  LUM_BASE_n:     50,
  LUM_CONTRAST_n: 49,   //: luminosity contrast in range [30...49]
                        //: (30 is less contrast than 49)
                        //: see https://www.w3.org/TR/WCAG20/ §1.4.1 compliance
  LUM_FRONT_s: '72%',   //: fixed front color luminosity (code)
  LUM_BACK_s:  '17%',   //: fixed back color luminosity (code)
}
