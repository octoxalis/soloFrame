// === SET_o: sets.js ===
//-> export
var SET_o =
{
  
  
  disjoint__a  //:- create 2 disjoint Integer Sets by comparing 2 Integers Sets
  (
    ref_a,    //:- Set( int )
    comp_a    //:- Set( int )
  )
  {
    const set_a =
      [
        new Set(),
        new Set()
      ]
    ref_a
      .forEach
      ( 
        ref_n =>
        {
          if ( !comp_a.has( ref_n ) )
            set_a[0]
              .add( ref_n )
        }
      )
    comp_a
      .forEach
      ( 
        comp_n =>
        {
          if ( !ref_a.has( comp_n ) )
            set_a[1]
              .add( comp_n )
        }
      )
    //-->
    return set_a
  }
,
}


