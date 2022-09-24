#include <Wire.h>
#include <BH1750.h>
#include <TinyGPS++.h>
#include <GUVA-S12SD.h>
#include <ThingSpeak.h>
#include <ESP8266WiFi.h>
#include <SoftwareSerial.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

#ifndef STASSID
#define STASSID "realme C25s"
#define STAPSK "ahz123987$"
#endif

const char* ssid = STASSID;
const char* password = STAPSK;
const char * myWriteAPIKey = "ZVED9H22Z4J5QW4M";
unsigned long myChannelNumber = 1868200;
unsigned long delayTime;

Adafruit_BME280 bme;
BH1750 lightMeter;
GUVAS12SD uv(A0);
TinyGPSPlus gps;
SoftwareSerial ss(14, 12);

WiFiClient client;

void setup() {
  Serial.begin(115200);
  ss.begin(9600);
  Wire.begin();
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

  pinMode(D3, INPUT);
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
  ThingSpeak.setField(1, temp);

  float hum = bme.readHumidity();
  Serial.print("Humidity: ");
  Serial.print(hum);
  Serial.println(" %");
  ThingSpeak.setField(2, hum);

  float pres = bme.readPressure() / 100.0F;
  Serial.print("Pressure: ");
  Serial.print(pres);
  Serial.println(" hPa");
  ThingSpeak.setField(3, pres);

  float lux = lightMeter.readLightLevel();
  Serial.print("Light Intensity: ");
  Serial.print(lux);
  Serial.println(" lx");
  ThingSpeak.setField(4, lux);

  float mV = uv.read();
  int uv_index = int(uv.index(mV));
  Serial.print("UV Index: ");
  Serial.println(uv_index);
  ThingSpeak.setField(5, uv_index);

  int prec = !digitalRead(D3);
  if (prec)
    Serial.println("Precipitation: Yes");
  else
    Serial.println("Precipitation: No");
  ThingSpeak.setField(6, prec);

  
  bool gpsAvail = false;
  for (unsigned long start = millis(); millis() - start < 2000;) {
    while (ss.available() > 0) {
      if (gps.encode(ss.read())) {
        gpsAvail = true;
        break;
      }
    }
  }

  if (gpsAvail && gps.location.isValid()) {
    float lati = gps.location.lat();
    float lon = gps.location.lng();

    Serial.print("Latitude: ");
    Serial.print(lati,6);
    Serial.println("° N");
    ThingSpeak.setField(7, lati);

    Serial.print("Longitude: ");
    Serial.print(lon,6);
    Serial.println("° E");
    ThingSpeak.setField(8, lon);   
  }
  else
    Serial.println("No valid GPS data found.");

  int x = ThingSpeak.writeFields(myChannelNumber, myWriteAPIKey);
  if(x == 200){
      Serial.println("Channel update successful.");
    }
  else{
      Serial.println("Problem updating channel. HTTP error code " + String(x));
  }

  Serial.println();
  Serial.println("===============================");
  Serial.println();
  delay(15000);
}
