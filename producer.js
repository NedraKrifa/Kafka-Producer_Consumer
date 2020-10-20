const {Kafka} = require("kafkajs")
const config = require("./config")
const msg = process.argv.slice(2,process.argv.length).join();
sendMsg();
async function sendMsg(){
    try
    {
         const kafka = new Kafka({
              "clientId": config.client_id,
              "brokers" :config.brokers
         })

        const producer = kafka.producer();
        console.log("Connecting.....")
        await producer.connect()
        console.log("Connected!")
        const result =  await producer.send({
            "topic": config.kafka_topic,
            "messages": [
                {
                    "value": msg,
                }
            ]
        })

        console.log(`Send Successfully! ${JSON.stringify(result)}`)
        await producer.disconnect();
    }
    catch(ex)
    {
        console.error(`Something bad happened ${ex}`)
    }
    finally{
        process.exit(0);
    }


}