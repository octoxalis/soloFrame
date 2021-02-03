---js
{
  layout:    'frame.njk',
  permalink: 'soloframe.html',
  tags:      [ 'notag' ],
  eleventyExcludeFromCollections: false,
  //-- expires_n: 10,

  doc_n:      1,
  title_s:    'Solo',
  subtitle_s: 'One page website',
  abstract_s: 'A fast and maintainable website without framework',

  section_a:
  [
    'Introduction',
    'Description',
    'Installation',
    'Extension',
  ],

  script_a:
  [
  ],
  css_a:
  [
  ],

}
---
[comment]: # (======================== Introduction ========================)
{% section section_a[0] %}

Discover the delights of a featherlight, smokin fast one page website:

+    Easy to maintain: a single Markdown file
     {% _tnote %}Following {{U_o.STRICT_s}} formalisation{% end_tnote %}

+    Pure HTML5 and CSS
     {% _tnote %}Inlined critical CSS and optional stylesheets{% end_tnote %}

+    JavaScriptless by default
     {% _tnote %}But you can easily bring your own food{% end_tnote %}

+    Fully cacheable
     {% _tnote %}With optional Service Worker{% end_tnote %}

+    Seriously secure
     {% _tnote %}CSP and server headers directives are configurable{% end_tnote %}

{% end_section %}




[comment]: # (======================== Description ========================)
{% section section_a[1] %}

The basic principle of {{A_o.NAME_s}} is to use a simple and efficient website boilerplate
to quickly set up a standalone website and deploy it to any CDN
{% _tnote %}
{{A_o.NAME_s}} is deployed on {{U_o.NETLIFY_s}}
{% end_tnote %}.

However, what does _standalone_ mean for a website?

Well, it means that it's a single page
{% _tnote %}
actually a single HTML file, with its associated pair of CSS stylesheet and JavaScript Service Worker
{% end_tnote %}
reproducing the usual appearence of a multi page website, with sections clearly identified,
always keeping the maximum simplicity andd flexibility in mind.


{% anchor "###JavaScriptless, CSS classless" %}


HTML5 and CSS alone are so performant in evergreen browsers that an advised developer can fairly rely on these stars
to deliver a pretty simple but efficient website for an everyday use:
for a blog, a project documentation, a portfolio or an ephemeral event, for instance.

Without JavaScript, no download delay and no debug!
Without CSS classes, no messy cascade to hustle and blow up a quiet design.
Hours spared to write content, that's all.

Nonetheless, if needed, JavaScript scripts or CSS stylesheets can be easily added to {{A_o.NAME_s}} website.


{% anchor "###Sections are all we need" %}

To keep it simple, {{A_o.NAME_s}} content is fragmented in sections listed at the top of the website page as in a usual Menu.
The sections number and names are not fixed, they are declared in the Front matter of the page.

Sometimes, it can be useful to group related website pages under a unique domain. Then, nothing is easier than
grouping their links in a dedicated website page
{% _tnote %}
{{A_o.NAME_s}} uses an `index` website to do that, but any other name is possible
{% end_tnote %}
.


A typical structure of a website page content could be:

+    Introduction
     {% _tnote %}Kind of Abstract of the content{% end_tnote %}

+    Article
     {% _tnote %}Main content of the website page{% end_tnote %}

+    Media
     {% _tnote %}Content illustrations: pictures, video or possibly audio{% end_tnote %}


Could be more, could be less:
everything is driven by an array of names declared in the Front matter of the website page.
Note that there is no obligation to separate images from text.
Lightbox and slideshow components are there too for a presentation of grouped pictures lazily loaded.

{% end_section %}




[comment]: # (======================== Installation ========================)
{% section section_a[2] %}

{{A_o.NAME_s}} source code is available on [Github][G].

Just type in the clone command in a project directory:
````
git clone https://github.com/octoxalis/soloFrame.git
````
then:
````
npm install
````

An environment file is needed to provide specific data. It must have defined the following key/value pairs:

````
AUTHOR_s   = owner_name
EMAIL_s    = owner_email
ID_s       = website_ID           # Github repository name 
NAME_s     = website_name         # name used in website content
                                  # (may be different)
LANGUAGE_s = website_language
URL_s      = website_url
LOCAL_s    = website_local_url    # with the usual port
DESCRIPT_s = a short description for search engines
GLOBAL_s   = a longer description for search engines
````


A [_proto.md][P] Markdown file is to be found in the `source/matter/_prototype/` directory.
Copy that file inside the `source/matter/content/` directory, eventualy renaming it to `index.md`.
From this file, Eleventy SSG will generate the `index.html` file of the website.

Edit this file, begining by its front matter part
{% _tnote %}
Located at the very top of the file, after the `----js {`
{% end_tnote %}
modifying the following JavaScript Object properties:

````
permalink: 'proto.html',  //: name of the new file
doc_n: 1,                 //: unique number
                          //: to sort files in a websites listing
title_s: 'proto',         //: website page title for browsers
section_a:                //: website section names
                          //: for navigation bar and headers
  [
    'Introduction',
    'Article',
    'Pictures',
    'Video'
  ],

````

All other properties are optional and for specific purposes, detailed in the [_extension_ section][1].


{% anchor "###Internal linking" %}

It's always useful to be able to provide links within a website page
{% _tnote %}As at the end of the previous paragraph{% end_tnote %}
.
Following the {{U_o.STRICT_s}} formalisation, only full reference links are used, in the form:

````
[Link name][0]
````
The link label
{% _tnote %}The `[0]` part{% end_tnote %}
have to be exactly one symbol long:

+    internal links, a **number**
     {% _tnote %}in the the range 0-9{% end_tnote %}

+    external links, a **letter**
     {% _tnote %}uppercase or lowercase{% end_tnote %}


As this enumeration is rather short, Unicode symbols may be used.


This is a **recommandation**: using another convention will not break {{A_o.NAME_s}} code.

{% end_section %}




[comment]: # (======================== Extension ========================)
{% section section_a[3] %}

Although offering many features in its default configuration,
{{A_o.NAME_s}} provides a simple and powerful extension mechanism to add either JavaScript scripts or CSS stylesheets to its base code.

JavaScript scripts have to be located in the `matrix/assets/scripts/js/` directory.
To be loaded, the file name have to be declared in the `script_a` Array property of the front matter, for instance:

````
----js
{
  ...
  script_a: ['extend.min.js'],
  ...
}
----
````

The same procedure is to be followed for CSS stylesheets, located in the `matrix/assets/styles/css/` directory:

````
----js
{
  ...
  css_a: ['extend.min.css'],
  ...
}
----
````

{{A_o.NAME_s}} proceeds this way when video, slideshow or lightbox components are needed.
Styles for these components are not loaded by default in the inline `style` tag
{% _tnote %}To avoid blocking resources in the page rendering{% end_tnote %}
and it is **mandatory** to declare the related stylesheets for sections that need them.


{% anchor "###Colorable" %}

{{A_o.NAME_s}} provides a very easy way to modifiy a webside colors, apart of its dual light mode
{% _tnote %}The now usual Light and Dark modes{% end_tnote %}
.
The `source/make/data/C_o.js` file
{% _tnote %}Where some global data for Eleventy SSG are declared{% end_tnote %}
has a CSS constants section with four properties to defined the website base color and luminosity mode:

````
HUE_P_n:        228,  //: theme PRIMARY color in range [0...359]
LUM_MODE_n:     -1,   //: luminosity mode: 1 (light) || -1 (dark)
LUM_BASE_n:     50,
LUM_CONTRAST_n: 49,   //: luminosity contrast in range [30...49]
                      //: (30 is a softer contrast than 49)
                      //: see https://www.w3.org/TR/WCAG20/ §1.4.1
````


Have a look at the [color.css][H] file to understand how this works.

{% end_section %}




[comment]: # (======================== Links ========================)

[1]: #{{section_a[3]}}
[H]: {{U_o.SOLO_SRC_R_s}}matrix/assets/styles/css/parts/color.css
[P]: {{U_o.SOLO_SRC_R_s}}source/matter/_prototype/_proto.md

{{U_o.NETLIFY_R_s}}
{{U_o.STRICT_R_s}}
{{U_o.SOLO_GIT_R_s}}
