---js
{
  layout:    'frame.njk',
  permalink: 'proto.html',
  tags:      [ 'notag' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      1,
  title_s:    'proto',
  subtitle_s: 'One page website',
  abstract_s: 'Build a fast website without framework',

  section_a:
  [
    'Introduction',
    'Article',
    'Pictures',
    //...
  ],

  script_a:
  [
    //-'code.min.js',  //: uncomment to use ilite interactively
  ],
  css_a:
  [
    //-'code.min.css',       //: uncomment to use ilite interactively
    //-'slideshow.min.css',  //: uncomment to use slideshow
    //-'lightbox.min.css',   //: uncomment to use lightbox
    //-'video.min.css',      //: uncomment to use video
    //-'print.min.css',      //: uncomment to use print
  ],
}
---

[comment]: # (======================== Introduction ========================)
{% section section_a[0] %}

{% end_section %}




[comment]: # (======================== Article ========================)

{% section section_a[1] %}

{% end_section %}




[comment]: # (======================== Pictures ========================)

{% section section_a[2] %}

{% end_section %}




[comment]: # (======================== Video ========================)

{% section section_a[3] %}

{% end_section %}




[comment]: # (======================== Links ========================)

[Go to][1]
[1]: #{{section_a[1]}}
