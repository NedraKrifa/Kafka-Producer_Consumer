# Kafka-Producer_Consumer
## Building a Messaging System with Apache Kafka using Nodejs

Let's build a pub/sub program using Kafka and Node.js, Kafka is a enterprise level tool for sending messages across the Microservices.

## Installation
### Get Kafka
[Download](http://kafka.apache.org/downloads)

```bash
$ tar -xzf kafka_2.13-2.6.0.tgz
$ cd kafka_2.13-2.6.0
```

### Start the Kafka environment
NOTE: Your local environment must have Java 8+ installed. 

```bash
# Start the ZooKeeper service
# Note: Soon, ZooKeeper will no longer be required by Apache Kafka.
$ bin/zookeeper-server-start.sh config/zookeeper.properties
```
Open another terminal session and run: 

```bash
$ bin/kafka-server-start.sh config/server.properties
```
!!you may have a problem in starting the kafka broker about the hostname
so you can add hostname to the file /etc/hosts
->127.0.0.1 localhost localhost.localdomain  (to know your hostname run the command hostname)

## Starting a Multi-Broker Cluster

We will set up a cluster consisting of three Kafka brokers. This will allow us to keep the cluster running even if one broker fails.

### In a first step we have to clone the configuration files

```bash
$ cp /config/server.properties /config/server-1.properties
$ cp /config/server.properties /config/server-2.properties
```
Now we have to edit the configuration files to configure some parameters that give a unique identifier to each instance.

### Modify the following parameters in server-1.properties

```bash
broker.id=1
listeners=PLAINTEXT://localhost:9093
log.dir=/tmp/kafka-logs-1
```
### Edit the file server-2.properties as follows

```bash
broker.id=2
listeners=PLAINTEXT://localhost:9094
log.dir=/tmp/kafka-logs-2
```

### Zookeeper and our first node are already started, start the two new nodes:

```bash
$ bin/kafka-server-start.sh config/server-1.properties
$ bin/kafka-server-start.sh config/server-2.properties
```
## Config
in the file config.js, you can change the client_id, kafka_topic and brokers
```bash
{
    client_id: 'myapp',
    kafka_topic: 'Messages',
    brokers: ["localhost:9092","localhost:9093","localhost:9094"]
}
```

## Program Setup
To create a Topic that is replicated on the three brokers run:
```bash
node topic.js
```
To send some test messages run
```bash
node producer.js this is my first message
```
To consume the data run
```bash
node consumer.js
```

## Resources

- [https://kafka.apache.org/quickstart#quickstart_multibroker](https://kafka.apache.org/quickstart#quickstart_multibroker)
- [https://www.scaleway.com/en/docs/configure-apache-kafka/](https://www.scaleway.com/en/docs/configure-apache-kafka/)