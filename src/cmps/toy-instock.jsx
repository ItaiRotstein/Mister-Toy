import Select from 'react-select'

export function ToyInStock({ onInStock }) {

    const options = [
        { value: 'all', label: 'All' },
        { value: true, label: 'In Stock' },
        { value: false, label: 'Out Of Stock' }
    ]

    return (
        <div style={{ width: '150px' }}>
            <Select options={options} onChange={onInStock} placeholder="Stock" />
        </div>
    )
}