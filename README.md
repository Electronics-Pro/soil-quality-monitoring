# AgroSense


## Flowchart
```mermaid
graph LR
A(Sensors) --> B(ESP8266)
B --MQTT--> C(MQTT Broker)
C --MQTT--> D(Cloud)
D --HTTPS/MQTT--> E(Mobile/PC)
```
