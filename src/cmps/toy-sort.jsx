import Select from 'react-select'

export function ToySort({ onSort }) {

    const options = [
        { value: 'name', label: 'Name' },
        { value: 'price', label: 'Price' },
        { value: 'createdAt', label: 'Created' }
    ]

    return (
        <div className='toy-sort' style={{ width: '200px' }}>
            <Select options={options} onChange={onSort} placeholder="Sort By" />
        </div>
    )
}