// NO ARQUIVO .ENV DEFINIR UMA CONSTANTE GOOGLE_APPLICATION_CREDENTIALS  = ./credenciais.json
require('dotenv').config();
const { PubSub, Encodings } = require('@google-cloud/pubsub');
const avro = require('avro-js');

// Configurar o nome ou ID do tópico do Google Pub/Sub
const topicNameOrId = process.env.PUBSUB_TOPICO;
const projectId = process.env.GOOGLE_PROJECT_NAME;

// Definir o esquema Avro
const schema = {
  type: 'record',
  name: 'Avro',
  fields: [
    {
      name: 'campo1',
      type: 'string'
    },
    {
      name: 'campo2',
      type: 'string'
    }
  ]
};

const type = avro.parse(schema);

const pubSubClient = new PubSub({ projectId: projectId });


async function enviarMensagem(_ref, _dados) {
    const nomeFuncao = "enviarMensagem"
    console.log(nomeFuncao, '1')
    // fonte: https://cloud.google.com/pubsub/docs/publisher?hl=pt-br#node.js
    try {
        // Obter metadados do tópico para verificar o esquema
        const topic = pubSubClient.topic(topicNameOrId);
        const [topicMetadata] = await topic.getMetadata();
        const topicSchemaMetadata = topicMetadata.schemaSettings;
    
        if (!topicSchemaMetadata) {
            console.log(nomeFuncao, '2')
            console.log(`O tópico ${topicNameOrId} não possui um esquema configurado.`);
            return;
        }
        const schemaEncoding = topicSchemaMetadata.encoding;
    
        // Criar a mensagem Avro
        const message = {
            dados:JSON.stringify( _dados),
            ref: _ref
        };
        
        console.log(nomeFuncao, '3')

        let dataBuffer;
        switch (schemaEncoding) {
        case Encodings.Binary:
            dataBuffer = type.toBuffer(message);
            break;
        case Encodings.Json:
            dataBuffer = Buffer.from(JSON.stringify(message));
            break;
        default:
            console.log(`Codificação de esquema desconhecida: ${schemaEncoding}`);
            return;
        }
        
        console.log(nomeFuncao, '4')

        const messageFinal = {
            data: dataBuffer
        };
        
        const messageId = await topic.publishMessage(messageFinal);
        if (messageId) {
            console.log(nomeFuncao, '5', messageId);
            return true
        }else{
            console.log(nomeFuncao, '6')
            return false
        }
        
    } catch (e) {
        console.log(nomeFuncao, 'ERRO: ', e)
    }
  }



module.exports = {
    enviarMensagem
};
