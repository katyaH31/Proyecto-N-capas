#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Servo.h>

const char *ssid = "Duarte";
const char *passwd = "03119797";

char *server = "24.199.80.14";
int port = 1883;

WiFiClient wlanclient;
PubSubClient mqttClient(wlanclient);
Servo myServo;

const int buttonPin = 4; // Pin del pulsador
unsigned long moveTime = 5000; // Tiempo en milisegundos antes de regresar al origen
unsigned long lastMoveTime = 0;
bool servoMoved = false;

void mqttCallback(char *topic, byte *payload, unsigned int length) {
  Serial.println("Message arrived on Topic:");
  Serial.println(topic);

  char message[5] = {0x00};

  for (int i = 0; i < length; i++)
    message[i] = (char)payload[i];

  message[length] = 0x00;
  Serial.println(message);
  String str_msg = String(message);
  if (str_msg.equals("true")) {
    Serial.println(str_msg);
    myServo.write(130); // Mover el servo a 90 grados (posición central)
    lastMoveTime = millis(); // Registrar el tiempo del movimiento
    servoMoved = true;
  }
}

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, passwd);
  pinMode(buttonPin, INPUT);

  Serial.print("Connecting to AP");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(100);
  }
  Serial.println();
  Serial.println("Connected to WiFi AP, Got an IP address :");
  Serial.println(WiFi.localIP());
  // Set The ESP8266 tries to reconnect automatically when the connection is lost
  WiFi.setAutoReconnect(true);
  WiFi.persistent(true);

  mqttClient.setServer(server, port);
  mqttClient.setCallback(mqttCallback);
  // Realizar conexión al MQTT Broker
  if (mqttClient.connect("ESP-Client", NULL, NULL)) {
    Serial.println("Connected to MQTT Broker");
  } else {
    Serial.println("MQTT Broker connection failed");
    Serial.println(mqttClient.state());
    delay(200);
  }

  // Suscribirse a los temas.
  mqttClient.subscribe("/test/securify");

  myServo.attach(16);
  myServo.write(30);
}

void loop() {
  mqttClient.loop();

  // Verificar si el servo debe regresar al origen
  if (servoMoved && millis() - lastMoveTime >= moveTime) {
    myServo.write(30);
    servoMoved = false;
  }

  // Verificar si el pulsador ha sido presionado
  if (digitalRead(buttonPin) == HIGH) {
    myServo.write(130); // Mover el servo a 90 grados (posición central)
    lastMoveTime = millis(); // Registrar el tiempo del movimiento
    servoMoved = true;
    delay(100); // Pequeño retraso para evitar rebotes del pulsador
  }
}
