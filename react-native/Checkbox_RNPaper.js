// CHECKBOX DINAMICO E MULTIPLO USANDO REACT NATIVE PAPER 
// listagem vem de um banco de dados formato:  {"id": 0, "isChecked": false, "value": "Nome"}

import { Checkbox } from 'react-native-paper';

export default () =>{
const [ listagem, setListagem ]         = useState([]); 

useEffect(() => {

        getlistagem()
        return () => {
            setListagem(null)
        }
	}, []);
const handleChange = (id) => {
        console.log('handleChange 1 ', id)
        let temp = listagem.map((linha) => {
            console.log('handleChange 2 ', linha)
          if (id === linha.id) {
            console.log('handleChange 3 ')
            return { ...linha, isChecked: !linha.isChecked };
          }
          return linha;
        });
        console.log('handleChange 4 ', temp)

        setListagem(temp);
      };


const Conteudo = () => { 
        //console.log('Listagem a:', listagem)
        
        return listagem.map((data) => { 
            console.log('Listagem a:', data)
            return(
                <View style={{ flexDirection: 'row', alignItems: 'center' }} key={data.id}>
                    <Checkbox 
                        key={data.id} 
                        status={data.isChecked ? 'checked' : 'unchecked'}
                        onPress={() => {
                        handleChange(data.id);
                    }}
                   />
                   <Text style={{ fontWeight: 'bold' }}>{data.value}</Text>
                </View>
)

return (
  <Conteudo/>
)

}
