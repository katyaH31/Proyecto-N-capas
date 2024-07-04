package com.securifytech.securifyserver.Services;

public interface MqttService {

    void publishMessage(String topic, String payload) throws Exception;

}
