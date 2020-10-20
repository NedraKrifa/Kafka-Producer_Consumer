const {Kafka} = require("kafkajs")
const config = require("./config")

createTopic();
async function createTopic(){
    try
    {
         const kafka = new Kafka({
              "clientId": config.client_id,
              "brokers" : config.brokers
         })

        const admin = kafka.admin();
        console.log("Connecting.....")
        await admin.connect()
        console.log("Connected!")
        await admin.createTopics({
            "topics": [{
                "topic" : config.kafka_topic,
                "numPartitions": 1,
                "replicationFactor" : 3
            }]
        })
        console.log("Created Successfully!")
        await admin.disconnect();
    }
    catch(ex)
    {
        console.error(`Something bad happened ${ex}`)
    }
    finally{
        process.exit(0);
    }


}