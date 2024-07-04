package com.securifytech.securifyserver.Config;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MqttConfig {

    private static final String BROKER_URL = "tcp://24.199.80.14:1883";
    private static final String CLIENT_ID = "spring-boot-client";

    @Bean
    public MqttClient mqttClient() throws Exception{
        MqttClient mqttClient = new MqttClient(BROKER_URL , CLIENT_ID, new MemoryPersistence());
        MqttConnectOptions connectOptions = new MqttConnectOptions();
        connectOptions.setCleanSession(true);
        mqttClient.connect(connectOptions);
        return mqttClient;
    }
}
