
export function ToyFilter({ filterBy, onHandleChange }) {

    return (
        <div className='toy-filter flex align-center'>
            <input name="txt" type="search" placeholder="Search..." value={filterBy.txt} onChange={onHandleChange} />
        </div>
    )
}