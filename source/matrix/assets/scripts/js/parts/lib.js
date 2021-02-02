// === LIB_o: lib.js ===

var LIB_o =
{
  // === CSS ===
  rootVar__s:
  (
    var_s
  ) => window.getComputedStyle( document.documentElement ).getPropertyValue( var_s ) || ''
,



  rootVar__v:
  (
    var_s,
    val_s
  ) => document.documentElement.style.setProperty( var_s, val_s )
,



  // === ELEMENT ===
  nodeId__o:
  (
    id_s,
    node_e=document
  ) => node_e.querySelector( `#${id_s}` )
,



  id__o:
  (
    id_s,
    node_e=document
  ) => node_e.querySelector( `[data-id="${id_s}"]` )
,


  data__o:
  (
    data_s,
    node_e=document
  ) => node_e.querySelector( `[data-${data_s}]` )
,



  hyphen__o:
  (
    data_s,
    node_e=document
  ) => node_e.querySelector( `[data--=${data_s}]` )
,



  docN__o:
  (
    doc_s,
    element_s='sections'
  ) =>
    LIB_o
      .nodeId__o( element_s )
      .querySelector( `[data-doc_s="${doc_s}"]` )
      .dataset
      .doc_n
,



  docS__o:
  (
    doc_n,
    element_s='sections'
  ) =>
    LIB_o
      .nodeId__o( element_s )
      .querySelector( `[data-doc_n="${doc_n}"]` )
      .dataset
      .doc_s
,



  resetNode__o:
  (
    id_s
  ) =>
  {
    const node_e =
      LIB_o
        .nodeId__o( id_s )
    while ( node_e.firstChild ) node_e.removeChild( node_e.firstChild )
    return node_e
  }
,



  /*
  * @param {*} tag_e : node element
  * @param {*} attrib_a : [ [ 'attribute_s', 'value_' ], ]
  */
  attribute__v:
  (
    tag_e, 
    attrib_a
  ) =>
  {
    for ( at_a of attrib_a ) tag_e.setAttribute( at_a[0], at_a[1] )
  }
,



  toggle__v:
  (
    data_s,
    class_s,
    node_e=document
  ) => LIB_o.hyphen__o( data_s, node_e ).classList.toggle( class_s )
,



toggleId__v:
(
  id_s,
  class_s
) =>
{
  const id_e = 
    LIB_o
      .nodeId__o( id_s )
  id_e
  &&
  id_e.classList.toggle( class_s )
}
,



  // === EVENTS ===
  keyClick__v:
  (
    tag_e
  ) =>
  {
    tag_e.addEventListener( 'keyup',
    key_e =>
    {
      if ( key_e.keyCode === 13 )
      {
        key_e.preventDefault()
        tag_e.click()
      }
    } )
  }
,

  //-------------------------------
  /* //XXXXXXXXXXXXXXXXXXXXXXXXXXX
  keyOver__v:
  tag_e =>
  {
    tag_e.addEventListener( 'keyup',
    key_e =>
    {
      if ( key_e.keyCode === 13 )
      {
        key_e.preventDefault()
        const event_e = new MouseEvent( 'mouseover',
        {
          'view': window,
          'bubbles': true,
          'cancelable': true
         } )
        tag_e.dispatchEvent( event_e )
      }
    } )
  }
,
  */


  invisible__v:
  (
    node_e,
    method_s='remove'
  ) =>
  {
    node_e
      .classList
      [`${method_s}`]( 'invisible' )
  }
,




  // === FRAME ===
/**
   * 
   * @param {*} tag_s 
   * @param {*} block_s : 'head' || 'body'
   * @param {*} attrib_a : [ [ 'attribute_s', 'value_' ], ]
   */
  append__v:
  (
    tag_s,
    block_s,
    attrib_a
  ) =>
  {
    const tag_e = document.createElement( tag_s )
    document[`${block_s}`].appendChild( tag_e )
    LIB_o
      .attribute__v( tag_e, attrib_a )
  }
,

  adopt__v:
  (
    adopter_e,
    adopted_e,
    callback_f
  ) =>
  {
    const scriptify__v =
    root_e =>
    {
      for
        (
          const script_e
          of
          root_e
            .querySelectorAll( 'script[data-node]' )
        )
        LIB_o
          [`slot${script_e.dataset.node}__v`]
          (
            script_e
              .dataset
              .list
              .split( ' ' )
          )
    }

    LIB_o
      .invisible__v
      (
        adopted_e,
        'add'
      )
    adopted_e
      .addEventListener
      (
        'load',
        () =>
        {
          const content_e =
            adopted_e.contentDocument.body
            ||
            adopted_e.contentDocument

          const root_e =
            content_e
              .children[0]

          adopter_e
            .appendChild( root_e )

          scriptify__v( root_e )

          callback_f
          &&
          callback_f( adopter_e, root_e )

          LIB_o
            .invisible__v( adopted_e )

          adopted_e
            .remove()
          
          LIB_o
            .slotInit__v( root_e )
        }
      )
  }
,



  /**
   * 
   * @param [String]: links id
   * NB: link ID suffix: '_css'
   */
  link__v:
  (
    id_s
  ) =>
  {
    LIB_o.append__v( 'link', 'head',
      [
        ['id', `${id_s}_css`],
        ['rel', 'stylesheet'],
        ['href', `{{U_o.url_s}}assets/styles/css/${id_s}.min.css`]
      ] )
  }
,


  /**
   * 
   * @param [String]: links id
   * NB: link ID suffix: '_css'
   */
  slotLink__v:
  (
    id_a
  ) =>
  {
    for ( let id_s of id_a )
    {
      ! document.querySelector( `link#${id_s}_css` )
      &&
      LIB_o.link__v( id_s )
    }
  }
,


  /**
   * 
   * @param [String]: scripts id
   * NB: script ID suffix: '_js'
   */
  script__v:
  (
    id_s
  ) =>
  {
    LIB_o.append__v( 'script', 'body',
      [
        ['id', `${id_s}_js`],
        ['src', `{{U_o.url_s}}assets/scripts/js/${id_s}.min.js`]
      ] )
  }
,


  /**
   * 
   * @param [String]: scripts id
   * NB: script ID suffix: '_js'
   */
  slotScript__v:
  (
    id_a
  ) =>
  {
    for ( let id_s of id_a )
    {
      ! document.querySelector( `script#${id_s}_js` )
      &&
      LIB_o.script__v( id_s )
    }
  }
,



  // === SLOT ===
  slot__v:
  (
    path_s,
    doc_s,
    step_n,
    callback_f
  ) =>
  {
    const adopter_e =
      LIB_o
        .nodeId__o( 'sections' )

    const iframe_e =
      document
        .createElement( 'iframe' )

    iframe_e.src =
      `/${path_s}/${doc_s}.html`

    iframe_e.dataset.doc_n =
      ''+step_n

    adopter_e
      .appendChild( iframe_e )

    LIB_o
      .adopt__v
      (
        adopter_e,
        iframe_e,
        callback_f
      )
  }
,



  slotInit__v:
  (
    section_e
  ) =>
  {
    setTimeout    //--> TODO: find a Promise way
    (
      () =>
      {
        const close_e =    //:-- slot remove button
          section_e
           .querySelector( '{{ C_o.CLOSE_ICON_TAG_s }}[data-doc_s]' )
           
        if ( close_e )
        {
          close_e
            .addEventListener
            (
              'click',
              () => 
                SLOT_o
                  .remove__v( section_e )
            )
        }
        
        const scriptList_e =
          section_e
            .querySelector( 'script[data-node="Script"]' )
        
        if ( scriptList_e )
        {
          const list_a =
            scriptList_e
              .dataset
              .list
              .split( ' ' )    //: space separator
          
          const doc_n =
            section_e
              .dataset
              .doc_n
        
          for
          (
            let script_s
            of
            list_a
          )
          {
            const renew_f =
              new Function
              (
                'doc_n',
                `${script_s.toUpperCase()}_o?.renew__v( doc_n )`
              )

            renew_f( doc_n )
          }
        }
      },
      {{C_o.SLOT_DELAY_n}}
    )
  }
,



// === UI ===
 scroll__v:    //:- scroll to top/bottom
  (
    bottom_b=false
  ) =>
  {
    const options_o =
    {
      top: bottom_b ?
        document.documentElement.clientHeight
        :
        0,
      left: 0,
      behavior: 'smooth'
    }
    window
      .scroll( options_o )
  }
,
}


