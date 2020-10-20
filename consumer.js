const {Kafka} = require("kafkajs")
const config = require("./config")

consumeMsg();
async function consumeMsg(){
    try
    {
         const kafka = new Kafka({
              "clientId": config.client_id,
              "brokers" :config.brokers
         })

        const consumer = kafka.consumer({"groupId": "test"})
        console.log("Connecting.....")
        await consumer.connect()
        console.log("Connected!")
        
        await consumer.subscribe({
            "topic": config.kafka_topic,
            "fromBeginning": true
        })
        
        await consumer.run({
            "eachMessage": async result => {
                console.log(`RVD Msg ${result.message.value}`)
            }
        })
 

    }
    catch(ex)
    {
        console.error(`Something bad happened ${ex}`)
    }
    finally{
        
    }


}