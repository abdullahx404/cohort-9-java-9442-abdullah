package com.example.demo.service;

import org.springframework.stereotype.Service;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenService {

    private final ConcurrentHashMap<String, String> tokenMap = new ConcurrentHashMap<>();

    public void createToken(String token, String username) {
        tokenMap.put(token, username);
    }

    public String getUsernameByToken(String token) {
        return tokenMap.get(token);
    }

    public void removeToken(String token) {
        tokenMap.remove(token);
    }
}
