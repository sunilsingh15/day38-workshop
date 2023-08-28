package sg.edu.nus.iss.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import sg.edu.nus.iss.server.service.WeatherService;

@RestController
@RequestMapping("/api")
@CrossOrigin()
public class WeatherController {

    @Autowired
    private WeatherService service;

    // endpoint URL example: http://localhost:8080/api/weather/singapore
    @GetMapping(path = "/weather/{city}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getWeather(@PathVariable String city) {
        return ResponseEntity.ok(service.getWeatherFromAPI(city).toString());
    }

    
}
