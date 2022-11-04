#include <Wire.h>
#include <BH1750.h>
#include <GUVA-S12SD.h>
#include <ThingSpeak.h>
#include <ESP8266WiFi.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#ifndef STASSID
#define STASSID "3SECS-4G"
#define STAPSK "Sagnika6927%"
#endif

const char* ssid = STASSID;
const char* password = STAPSK;
const char * myWriteAPIKey = "ZVED9H22Z4J5QW4M";
unsigned long myChannelNumber = 1868200;
unsigned long delayTime;

BH1750 lightMeter;
GUVAS12SD uv(A0);
Adafruit_BME280 bme;

WiFiClient client;

void setup() {
  Serial.begin(115200);
  delay(5000);
  Serial.println();
  Serial.println();
  Serial.println();
  Serial.println("EnvironSense");
  
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  
  Serial.print("Loading");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(".");
  Serial.println("Connection Established.");
  
  pinMode(D0,INPUT);
  ThingSpeak.begin(client);
  lightMeter.begin();

  bool stat;

  stat = bme.begin(0x76);  
  if (!stat) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    while (1);
  }

  Serial.println("Setup complete, getting sensor readings and posting...");
  Serial.println("===============================");
  Serial.println();
}

void loop() {
  float temp = bme.readTemperature();
  Serial.print("Temperature: ");
  Serial.print(temp);
  Serial.println(" °C");  
  ThingSpeak.writeField(myChannelNumber, 1, temp, myWriteAPIKey);
  delay(15000);

  float hum = bme.readHumidity();
  Serial.print("Humidity: ");
  Serial.print(hum);
  Serial.println(" %");
  ThingSpeak.writeField(myChannelNumber, 2, hum, myWriteAPIKey);
  delay(15000);

  float pres = bme.readPressure() / 100.0F;
  Serial.print("Pressure: ");
  Serial.print(pres);
  Serial.println(" hPa");
  ThingSpeak.writeField(myChannelNumber, 3, pres, myWriteAPIKey);
  delay(15000);

  float lux = lightMeter.readLightLevel();
  Serial.print("Light Intensity: ");
  Serial.print(lux);
  Serial.println(" lx");
  ThingSpeak.writeField(myChannelNumber, 4, lux, myWriteAPIKey);
  delay(15000);

  float mV = uv.read();
  int uv_index = int(uv.index(mV));
  Serial.print("UV Index: ");
  Serial.println(uv_index);
  ThingSpeak.writeField(myChannelNumber, 5, uv_index, myWriteAPIKey);
  delay(15000);

  int prec = !digitalRead(D0);
  if (prec)
    Serial.println("Precipitation: Yes");
  else
    Serial.println("Precipitation: No");    
  ThingSpeak.writeField(myChannelNumber, 6, prec, myWriteAPIKey);
  delay(15000);

  float lat = 22.2829;
  Serial.print("Latitude: ");
  Serial.print(lat);
  Serial.println("° N");
  ThingSpeak.writeField(myChannelNumber, 7, lat, myWriteAPIKey);
  delay(15000);

  float lon = 73.1572;
  Serial.print("Longitude: ");
  Serial.print(lon);
  Serial.println("° E");
  ThingSpeak.writeField(myChannelNumber, 8, lon, myWriteAPIKey);
  delay(15000);
  Serial.println();
  Serial.println("===============================");
  Serial.println();
}
