/*
 * Authentication
 * Kind of proxy for configure constants
 */
require('dotenv').config({ path: '../env/soloFrame' })

module.exports =
{
  AUTHOR_s:     process.env.AUTHOR_s,
  EMAIL_s:      process.env.EMAIL_s,
  ID_s:         process.env.ID_s,
  NAME_s:       process.env.NAME_s,
  LANGUAGE_s:   process.env.LANGUAGE_s,
  
  DESCRIPT_s:   process.env.DESCRIPT_s,
  GLOBAL_s:     process.env.GLOBAL_s,
}
