---js
{ //: Generate a template, not a site page content
  //: NB: a double build is necessary to update the generated page from that template

  layout:    'home.njk',
  permalink: '../source/matrix/parts/body/home.njk',
  tags:      [ 'notag' ],
  eleventyExcludeFromCollections: false,
}
---
{{A_o.NAME_s}} is a _one page website_.


Its single HTML file provides a fully functionnal standalone website.

However, a collection of those _websites_ can be gathered inside a unique domain.

----
[{{A_o.NAME_s}} websites][0]
----


<footer>

+    [Github {{A_o.NAME_s}} repository][G]
+    {{A_o.NAME_s}} is built with the smart {{U_o.E11TY_s}} static site generator
+    The CSS stylesheets are based on the cute work by [Gregory Cadars][C]
+    Markdown files according to Victor Grishchenko {{U_o.STRICT_s}}

</footer>




[comment]: # (======================== Links ========================)

[0]: index.html#Links

{{U_o.SOLO_GIT_R_s}}
{{U_o.E11TY_R_s}}
{{U_o.STRICT_R_s}}

[C]: https://github.com/cadars/john-doe
