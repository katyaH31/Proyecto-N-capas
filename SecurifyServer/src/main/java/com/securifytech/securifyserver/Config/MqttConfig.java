package com.securifytech.securifyserver.Config;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MqttConfig {

    @Value("${mqtt.url}")
    private String BROKER_URL;

    @Value("${mqtt.clientId}")
    private String CLIENT_ID;

    @Bean
    public MqttClient mqttClient() throws Exception{
        MqttClient mqttClient = new MqttClient(BROKER_URL , CLIENT_ID, new MemoryPersistence());
        MqttConnectOptions connectOptions = new MqttConnectOptions();
        connectOptions.setCleanSession(true);
        mqttClient.connect(connectOptions);
        return mqttClient;
    }
}
