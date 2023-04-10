/*
TORNAR A FONTE RESPONSIVE MANUALMENTE CONFORME A ESCOLHA DAS OPÇÕES NATIVAS DO CLIENTE, COMO FONTE E TAMANHO.
DISPLAY SIZE E FONT SIZE NAS OPÇÕES DO ANDROID
*/
{Dimensions, PixelRatio} from 'react-native';
const screenDimensions = Dimensions.get('screen').scale;

export function fontResponsive(fontScale, screen, min, max) {
  // min = fontSize quando a escala da fonte definida menor que 1
  // max = fontSize quando a escala da fonte definida maior que 1
  let size;
  let final;
  if (fontScale > 1){
    console.log('opcao 1')
    size = max
  }else{
    console.log('opcao 2')
    size = min
  }

  if (screen > 3) { 
    console.log('opcao 3')
    final =  size - 6
  } else if (screen >= 1 && screen <= 2) { 
    console.log('opcao 4')
    final =  size - 2
  } else {
    console.log('opcao 5')
    final =  size
  }

  console.log('opcao 6', final)
  return final
}

Uso no css:
fontSize: fontResponsive(PixelRatio.getFontScale(), screenDimensions, 30, 16) 
// exemplo: 30 é o valor maximo que a fonte pode ter conforme o espaço definido, e 16 é o tamanho minimo do espaço.
