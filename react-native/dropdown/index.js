import DropdownLojas from '../Dropdown';

const [selectedItem, setSelectedItem] = useState({ id: codloja, value: nomeloja })

const onSelect = (item) => {
    setSelectedItem(item)
}

export default (props) => { 
  return (
    <Dropdown label="Escolha a loja de preferencia" value={selectedItem} data={lojas} onSelect={onSelect} />
  )
}
