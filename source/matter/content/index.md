---js
{
  layout:    'frame.njk',
  permalink: 'index.html',
  tags:      [ 'notag' ],
  eleventyExcludeFromCollections: false,
  //--expires_n: 10,


  doc_n:      0,
  title_s:    'soloFrame',
  subtitle_s: 'Solo one page website',
  abstract_s: 'Howto build a fast and maintainable website without framework',

  section_a: [ 'Links' ],

  script_a:
  [
    
  ],
  css_a:
  [
  ],

}
---
[comment]: # (======================== Links ========================)

{% section section_a[0] %}

[{{A_o.NAME_s}}][0]

{% end_section %}




[comment]: # (======================== LINKS ========================)

[0]: soloframe.html#Introduction