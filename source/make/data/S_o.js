/*
 * SVG
 * Naming scheme: function__s
 */
const SYMBOLS_o =
{
  icon_load_s: `<svg class="svg_icon"><use href="#icon_load" /></svg>`
}


module.exports =
{
  symbol__s:
  symbol_s => SYMBOLS_o[`${symbol_s}_s`]
  ,

}
