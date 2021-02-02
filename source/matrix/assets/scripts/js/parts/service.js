// === SER_o: service.js ===

var SER_o =
{
  types_a:
    [
      //-- '{{C_o.msg_o.ROUTE_s}}',  //: not used
      '{{C_o.msg_o.REGISTER_s}}',
      '{{C_o.msg_o.LOAD_s}}',
      '{{C_o.msg_o.RESTORE_s}}',
      '{{C_o.msg_o.REMOVE_s}}',
      '{{C_o.msg_o.CACHE_s}}',
      '{{C_o.msg_o.REQ_IMG}}',
    ]
,

  sender_o: null    //: for callback
,



  init__v    //:--Service worker registration
  (
    url_s
  )
  {
    //!!! comment out the following line if HTTP dev server supports headers
    //..... if ( '{{U_o.url_s}}' === '{{U_o.DEV_s}}' ) return  //: skip service worker in dev mode
    //>
    navigator  //--  navigator.serviceWorker.register( url_s } )  //: WITHOUT Service-Worker-Allowed HTTP header 
      .serviceWorker
      .register
        (
          url_s,
          {
            scope: '{{ U_o.SERVICE_SCOPE_s }}'
          }
        )
      .then
        (
          () =>    //: resolve //!!! parameter not used
          {
            const search_s =
              window
                .location
                .search
            if ( search_s )
            {
              SER_o
                .send__v
                (
                  '{{C_o.msg_o.LOAD_s}}',
                  search_s
                )
            }
          },
          error_o =>
            console.log( `ServiceWorker registration failed [error: ${error_o}]` )    //: reject
        )
    navigator
      .serviceWorker
      .onmessage =
      msg_o =>
        SER_o
          .receive__v( msg_o )
  }
,
  
  
  send__v    //:-- Post message
  (
    type_s,
    payload_o=null
  )
  {
    navigator
      ?.serviceWorker
      ?.controller
      ?.postMessage
      (
        {
          type_s: type_s,
          payload_o: payload_o
        }
      )
  }
,




receive__v    //:-- Listen to messages
(
  msg_o
)
{
  if ( !msg_o.data ) return //: error
  //>
  const type_s =
    msg_o.data.type_s
  if ( !SER_o.types_a.includes( type_s ) ) return  //: error
  //>
  SER_o
    [`${type_s}__v`]
    (
      msg_o.data.payload_o
    )
  }
,



  {{C_o.msg_o.REGISTER_s}}__v   //: from worker
  ()
  {
    window
      .localStorage
      .setItem
        ( 'worker_b', true )  //: Service Worker is active now
  }
,



  {{C_o.msg_o.RESTORE_s}}__v   //: from worker
  (
    restore_a    //:-- SWO_o.restore_a []
  )
  {
    console.time( '{{C_o.msg_o.RESTORE_s}}__v' )
    
    if ( !PREF_o.restore_b ) return
    //>
    for ( let path_a of restore_a )
    {
      const [ path_s, doc_s ] = path_a
      const doc_n =
        LIB_o
          .nodeId__o( 'docs_topics' )
          .querySelector( `li[data-doc_s="${doc_s}"]` )
          .dataset.doc_n
        IND_o
        .load__v
          (
            path_s,
            doc_s,
            doc_n,
            (
              section_e,
              doc_n
             ) =>    //: callback_f
            {
              SLI_o
                .slider_c
                .add__v
                (
                  section_e,
                  doc_n,
                  [
                    `data-doc_s=${section_e.dataset.doc_s}`
                  ],
                )
            },
          )
    }
    
    console.timeEnd( '{{C_o.msg_o.RESTORE_s}}__v' )
  }
,



  {{C_o.msg_o.REMOVE_s}}__v    //: to worker
  (
    doc_s
  )
  {
    const doc_n =
      LIB_o
        .docN__o( doc_s )

    if ( doc_n >= {{C_o.SLOT_n}} )    //: only for content slots
    {
      GRA_o
        .svg_e
        .querySelector( `#node_${doc_n}` )
        ?.classList
        ?.remove( 'node_focus' )
    }

    SER_o
      .send__v
      (
        '{{C_o.msg_o.REMOVE_s}}',
        doc_s
      )

  }
,


  {{C_o.msg_o.CACHE_s}}__v    //: from/to worker
  (
    payload_o,    //: { cache_a, sender_o, recipient_s }
  )
  {
    const { cache_a, sender_o, recipient_s } = payload_o
    if ( recipient_s === 'SWO_o' )    //: send to worker
    {
      SER_o
        .send__v
        (
          '{{C_o.msg_o.CACHE_s}}',
          {
            cache_a: cache_a
          }
        )
      SER_o.sender_o = sender_o
      return
      //>
    }
    //: receive from worker
    if ( !SER_o.sender_o ) return void console.log( 'Service Worker cache not delivered!' )
    SER_o
      .sender_o
      ['{{C_o.msg_o.CACHE_s}}__v']( cache_a )    //: consume cache_a
    SER_o.sender_o = null    //: ...then reset
  }
,


  {{C_o.msg_o.REQ_IMG_s}}__v   //: to worker
  (
    json_s
  )
  {
    SER_o
      .send__v
      (
        '{{C_o.msg_o.REQ_IMG_s}}',
        json_s      //: as payload
      )
}
,



}


