package com.catijr.backend_java.application.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TarefasController {

    @GetMapping("/")
    public String hello() {
        return "Hello World!";
    }
}
