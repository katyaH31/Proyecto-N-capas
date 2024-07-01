#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <Servo.h>

const char* ssid = "Duarte";
const char* password = "03119797";

Servo myServo;  // Crea una instancia del objeto Servo
const int servoPin = 16;  // Pin al que está conectado el servo

void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid, password);

  myServo.attach(servoPin);  // Asigna el pin al servo
  myServo.write(90);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("Connected to WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    WiFiClient client;
    http.begin(client, "http://192.168.0.11:8080/api/qr/servo");  // Asegúrate de poner la IP correcta y el puerto
    int httpCode = http.GET();

    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println("HTTP Status: " + String(httpCode));
      Serial.println("Response: " + payload);

      DynamicJsonDocument doc(1024);
      deserializeJson(doc, payload);
      
      const char* message = doc["message"];  // "OK"
      bool data = doc["data"];               // true or false
      const char* role = doc["role"];        // null (manejado como una cadena vacía en ArduinoJson)

      Serial.print("Message: ");
      Serial.println(message);
      Serial.print("Data: ");
      Serial.println(data ? "true" : "false");
      if (role) {
        Serial.print("Role: ");
        Serial.println(role);
      } else {
        Serial.println("Role is null");
      }

      // Mueve el servo en función del valor de data
      if (data) {
        myServo.write(180);  // Mueve el servo a 180 grados si data es true
      } else {
        myServo.write(0);  // Mueve el servo a 0 grados si data es false
      }
    } else {
      Serial.println("Error on HTTP request");
    }

    http.end();
  }

  delay(10000); 
}
