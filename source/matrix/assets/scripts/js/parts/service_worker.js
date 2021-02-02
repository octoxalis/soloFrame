// === SWO_o: service_worker.js ===

var SWO_o =
{
  cache_s: '{{A_o.ID_s}}_{{C_o.KEY_n}}'            //: name of the current cache
  ,

  url_a:     //: URLs of assets to immediately cache
    [
      '{{U_o.url_s}}index.html',
      '{{U_o.url_s}}/assets/scripts/js/index.min.js',
    ]
  ,
  

  
  install__v    //:- Iterate thru url_a and put each entry in cache
  (
    install_o
  )
  {
    SWO_o.cache_a =
      new Set
      (
        SWO_o.slots_a
      )
    install_o
      .waitUntil
      (
        void async function ()
        {
          const cache_o =
            await
            caches
              .open( SWO_o.cache_s )

          await
          cache_o
            .addAll( SWO_o.url_a  )

          self
            .skipWaiting()
        } ()
      )
  }
,


  
  activate__v    //:- Remove inapplicable caches entries
  (
    activate_o
  )
  {
    activate_o.waitUntil(
      void async function ()
      {
        const entry_a =
          await
          caches
            .keys()

        const remove_a =
          await
          entry_a
            .filter
            (
              entry_s => entry_s !== SWO_o.cache_s
            )

        await
        Promise
          .all
          (
            remove_a
              .map
              (
                remove_s => caches.delete( remove_s )
              )
          )

        self
          .clients
          .claim()
      } ()
    )
  }
,
  

  //:- https://developers.google.com/web/fundamentals/primers/service-workers/high-performance-loading
  
  fetch__v    //:- Fetch offline-1st
  (
    fetch_o
  )
  {
    const mode_s =
      fetch_o
        ?.request
        ?.mode

    if (mode_s  === 'navigate' )
    {
      try
      {
        fetch_o
          .respondWith
          (
            async function()
            {
              const url_o =
              new URL( fetch_o.request.url )

              const response_o =
                fetch( url_o )

              const clone_o =
                response_o
                  .then
                  (
                    resp_o =>
                    resp_o
                      .clone()
                  )

              fetch_o
                .waitUntil
                (
                  async function
                  ()
                  {
                    const cache_o =
                      await
                      caches
                        .open( SWO_o.cache_s )

                    await cache_o
                      .put
                      (
                        url_o,
                        await clone_o
                      )
                  }()    //: IIFE
                )

              return (
                await
                caches
                  .match( url_o )
                )
                ||
                response_o
            } ()
          )
      }
      catch
      (
        error_o
      )
      {
        const cache_o =
          caches
            .open( SWO_o.cache_s )

        return (
          cache_o
          &&
          cache_o
            .match
            (
              new Request( `{{U_o.url_s}}offline.html` )  //: We don't have a cached version, display offline page
            )
          )
      }
    }
  }
,
  


  init__v
  ()
  {
    [ 
      'install',
      'activate',
      'fetch',
    ]
      .forEach
      (
        event_s =>
        self
          .addEventListener
          (
            event_s,
            event_o =>
              SWO_o[`${event_s}__v`]( event_o )
          )
      )
  }
,

}



SWO_o
  .init__v()  // !!! no IIFE
