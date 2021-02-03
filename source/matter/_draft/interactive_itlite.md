---js
{
  layout:    'frame.njk',
  permalink: 'interactive_ilite.html',
  tags:      [ 'notag' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      2,
  title_s:    'Interactive Ilite',
  subtitle_s: 'Solo code highlighting',
  abstract_s: 'Standalone code highlighting',

  section_a:
  [
    'Introduction',
    'Ilite',
    'Code'
  ],

  script_a:
  [
    'code.min.js',
  ],
  css_a:
  [
    'code.min.css',
  ],
}
---

[comment]: # (======================== Introduction ========================)
{% section section_a[0] %}



{% end_section %}




[comment]: # (======================== Ilite ========================)

{% section section_a[1] %}

{% end_section %}




[comment]: # (======================== Code ========================)

{% section section_a[2] %}

{% end_section %}




[comment]: # (======================== Links ========================)

[1]: #{{section_a[1]}}
