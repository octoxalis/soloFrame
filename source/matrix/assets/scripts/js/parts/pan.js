// === PAN_o: pan.js ===

var PAN_o =
{
  gapX_n:      0,
  gapY_n:      0,
  offsetX_n:   0,
  offsetY_n:   0,
  x_n:         0,
  y_n:         0,
  move_b:      false,

  scale_n:     1.0,
  ratio_n:     -.01,
  minScale_n:  .1,
  maxScale_n:  10,
  panMove_n:   10,
  zoomScale_n: 10,



  init__v
  (
    target_s,
    dimension_a,
    options_o={}    //: { zoom_b: false ||true, pan_b: false ||true }
  )
  {
    PAN_o.target_e  = document.querySelector( target_s )
    PAN_o.target__v( dimension_a )
    if ( options_o.zoom_b ) PAN_o.listenZoom__v()
    if ( options_o.pan_b ) PAN_o.listenPan__v()
  }
,



  target__v    //: Set geometry constants
  (
    dimension_a  //: if only 2 dimensions, viewport = viewbox
  )
  {
    PAN_o.target_e.width  = PAN_o.width_n  = dimension_a[0]
    PAN_o.target_e.height = PAN_o.height_n = dimension_a[1]
    PAN_o.minX_n = dimension_a[2] || dimension_a[0]
    PAN_o.minY_n = dimension_a[3] || dimension_a[1]
    PAN_o.viewbox__v( 0, 0, PAN_o.width_n, PAN_o.height_n )
  }
,



  viewbox__v    //: Set SVG viewbox dimensions
  (
    minX_n,
    minY_n,
    width_n,
    height_n
  )
  { PAN_o.target_e.setAttribute( 'viewBox', `${minX_n} ${minY_n} ${width_n} ${height_n}` ) }
,



  viewbox__a      //: Get SVG viewbox dimensions
  ()
  { return PAN_o.target_e.getAttribute( 'viewBox' ).split( ' ' ) }
,



  listenZoom__v      //: Set zoom event listeniers
  ()
  { [ 'wheel', 'touchstart', 'keydown' ].forEach( type_s => PAN_o.listen__v( type_s, 'Zoom' ) ) }
,



  wheelZoom__v
  (
    event_o
  )
  { PAN_o.viewbox__v( ...PAN_o.scale__a( event_o.deltaY < 0 ? PAN_o.zoomScale_n : -PAN_o.zoomScale_n ) ) }
,



  touchstartZoom__v
  (
    event_o
  )
  {
    if ( event_o.touches.length < 2 ) return void PAN_o.touchstartStart__v( event_o )
    //>
    PAN_o.viewbox__v( ...PAN_o.scale__a( event_o.touches.length > 2 ? PAN_o.zoomScale_n : -PAN_o.zoomScale_n ) )
  }
,



  keydownZoom__v:
  (
    event_o
  ) =>
  {
    const code_n = event_o.keyCode
    if ( code_n === 107  || code_n === 109 )    //: NumPadPlus || NumPadMinus
      PAN_o.viewbox__v( ...PAN_o.scale__a( code_n === 109 ? -PAN_o.zoomScale_n : code_n === 107 ? PAN_o.zoomScale_n : 0 ) )  //: no zoom if 0
  }
,



  listenPan__v      //: Set pan event listeniers
  ()
  { [ 'mousedown', 'keydown' ].forEach( type_s => PAN_o.listen__v( type_s, 'Start' ) ) }    //: no touchstart (handled in touchstartZoom__v )
    
,



  mousedownStart__v
  (
    event_o
  )
  { return PAN_o.panStart__v( ...PAN_o.client__a( event_o ), ...PAN_o.handle__a( event_o ) ) }
,



  touchstartStart__v    //: event handle from touchstartZoom__v
  (
    event_o
  )
  { if ( event_o.touches.length < 2 ) PAN_o.panStart__v( ...PAN_o.client__a( event_o ), ...PAN_o.handle__a( event_o ) ) }
,



  keydownStart__v
  (
    event_o
  )
  {
    const code_n = event_o.keyCode
    if ( PAN_o.move_b && code_n >= 37 && code_n <= 40 ) return void PAN_o.panMove__v( event_o )    //: Arrows
    if ( code_n === 32 ) return void PAN_o.panStart__v( ...PAN_o.client__a( event_o ), ...PAN_o.handle__a( event_o ) )    //: Spacebar
    if ( code_n === 13 ) return void PAN_o.panStop__v( event_o )    //: Enter
  }
,



  panStart__v
  (
    atX_n,
    atY_n,
    move_s,
    stop_s
  )
  {
    PAN_o.move_b = true
    const [ minX_s, minY_s ] = PAN_o.viewbox__a()
    PAN_o.gapX_n = atX_n - PAN_o.offsetX_n
    PAN_o.gapY_n = atY_n - PAN_o.offsetY_n
    PAN_o.gapX_n = atX_n - -minX_s
    PAN_o.gapY_n = atY_n - -minY_s
    PAN_o.target_e.addEventListener( move_s, PAN_o.panMove__v, false)
    PAN_o.target_e.addEventListener( stop_s, PAN_o.panStop__v, false)
  }
,




  panMove__v
  (
    event_o
  )
  {
    if ( PAN_o.move_b )
    {
      const [ clientX_n, clientY_n ] = PAN_o.client__a( event_o )
      PAN_o.x_n = clientX_n - PAN_o.gapX_n
      PAN_o.y_n = clientY_n - PAN_o.gapY_n
      PAN_o.offsetX_n = PAN_o.x_n
      PAN_o.offsetY_n = PAN_o.y_n
      const [ minX_s, minY_s, width_s, height_s ] = PAN_o.viewbox__a()
      PAN_o.viewbox__v( ''+-PAN_o.x_n, ''+-PAN_o.y_n, width_s, height_s )
    }
  }
,




  panStop__v
  (
    event_o
  )
  {
    PAN_o.move_b = false
    const [ move_s, stop_s ] = PAN_o.handle__a( event_o )
    PAN_o.target_e.removeEventListener( move_s, PAN_o.panMove__v, false)
    PAN_o.target_e.removeEventListener( stop_s, PAN_o.panStop__v, false)
  }
,



  scale__a        //: Get [String] for SVG viewBox geometry
  (
    scale_n
  )
  {
    PAN_o.scale_n =    //: update scale_n
      Math.min(Math.max( PAN_o.minScale_n, PAN_o.scale_n + ( scale_n * PAN_o.ratio_n ) ), PAN_o.maxScale_n )
    const width_n = Math.round(PAN_o.scale_n * PAN_o.width_n )
    const height_n = Math.round(PAN_o.scale_n * PAN_o.height_n )
    const [ minX_s, minY_s ] = PAN_o.viewbox__a()
    return [ minX_s, minY_s, ''+width_n, ''+height_n ]
  }
,



  client__a
  (
    event_o
  )
  {
    if ( event_o.clientX !== undefined ) return [ event_o.clientX, event_o.clientY ]    //: mouse event
    if ( event_o.changedTouches !== undefined ) return [ event_o.changedTouches[0].clientX, event_o.changedTouches[0].clientY ]    //: touch event
    if ( event_o.keyCode )    //: keyboard event
    {
      const code_n = event_o.keyCode
      const gapX_n = code_n === 37 ? -PAN_o.panMove_n : code_n === 39 ? PAN_o.panMove_n : 0
      const gapY_n = code_n === 38 ? -PAN_o.panMove_n : event_o.keyCode === 40 ? PAN_o.panMove_n : 0
      return [ gapX_n + PAN_o.x_n, gapY_n + PAN_o.y_n ]
    }
    return [0, 0] //: no move if undefined event
  }
,



  listen__v
  (
    type_s,
    method_s
  )
  {
    const target_e = type_s === 'keydown' ? document : PAN_o.target_e    //: SVG element is not an input element: use document element
    target_e.addEventListener
      (
        type_s,
        event_o =>
        {
          event_o.preventDefault()
          PAN_o[`${type_s}${method_s}__v`]( event_o )
        }
      )
  }
,



  handle__a
  (
    event_o
  )
  {
    if ( event_o.clientX !== undefined ) return [ 'mousemove', 'mouseup' ]    //: mouse event
    if ( event_o.changedTouches !== undefined ) return [ 'touchmove', 'touchend' ]    //: touch event
    return [ 'keydown', 'keydown' ]    //: keyboard event
  }
,


}


