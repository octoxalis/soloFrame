const sort_o =
{
//> Sort a tag collection
//> according to doc_n frontmatter property
  sortByDoc__a: ( collection_a, tag_s ) =>
  {
    return collection_a
      .getFilteredByTag( tag_s )
      .sort( ( current_o, other_o ) => current_o.data.doc_n - other_o.data.doc_n )
  }
}

module.exports = make_o =>
{
  make_o.tag_a.forEach( tag_o => make_o.addCollection( tag_o.tag_s,
    collection_a => sort_o[tag_o.sort_f]( collection_a, tag_o.tag_s ) ) )
}
