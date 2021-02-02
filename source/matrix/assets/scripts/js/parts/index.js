// === index.js ===

void function
()
{
  //-- if ( '{{U_o.url_s}}' === '{{U_o.DEV_s}}' ) return  //: skip service worker in dev mode
  //>
  navigator  //--  navigator.serviceWorker.register( url_s } )  //: WITHOUT Service-Worker-Allowed HTTP header 
    .serviceWorker
    .register
      (
        '{{U_o.url_s}}{{U_o.SERVICE_PATH_s}}',
        {
          scope: '{{ U_o.SERVICE_SCOPE_s }}'
        }
      )
    .then
      (
        () => {},   //: resolve
        error_o =>  //: reject
          console
            .log( `ServiceWorker registration failed [error: ${error_o}]` )
      )
    
  ;console.log( 'index.js' )
} ()
