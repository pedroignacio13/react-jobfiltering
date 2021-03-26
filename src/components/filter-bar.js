import '../styles/filter-bar.css'

function FilterBar({ clearFilter, filterbarRef }){

  return (
    <div className="filter-bar">

      <div className="filters" ref={filterbarRef}></div>

      <button className="clear" onClick={() => clearFilter()}>Clear</button>

    </div>
  )
}

export default FilterBar