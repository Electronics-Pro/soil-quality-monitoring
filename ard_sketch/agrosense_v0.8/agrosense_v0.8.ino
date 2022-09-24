#include <Wire.h>
#include <BH1750.h>
#include <TinyGPS++.h>
#include <GUVA-S12SD.h>
#include <SoftwareSerial.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

Adafruit_BME280 bme;
BH1750 lightMeter;
GUVAS12SD uv(A0);
TinyGPSPlus gps;
SoftwareSerial ss(14, 12);

char dataStr[100] = "";
char buffer[7];

void setup() {
  Serial.begin(115200);
  ss.begin(9600);
  Wire.begin();
  delay(5000);

  pinMode(D3, INPUT);
  lightMeter.begin();

  bool stat;
  stat = bme.begin(0x76);
}

void loop() {
  dataStr[0] = 0;
  float temp = bme.readTemperature();
  Serial.print(temp);
  Serial.print(",");

  float hum = bme.readHumidity();
  Serial.print(hum);
  Serial.print(",");
  
  float pres = bme.readPressure() / 100.0F;
  Serial.print(pres);
  Serial.print(",");

  float lux = lightMeter.readLightLevel();
  Serial.print(lux);
  Serial.print(",");

  float mV = uv.read();
  int uv_index = int(uv.index(mV));
  Serial.print(uv_index);
  Serial.print(",");

  int prec = !digitalRead(D3);
  Serial.println(prec);
/*
  Serial.print(",");

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
    Serial.print(lati);
    Serial.print(",");
    Serial.println(lon);
  }
  else
    Serial.println(",");
*/
  delay(30000);
}
