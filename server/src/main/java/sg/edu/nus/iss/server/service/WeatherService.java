package sg.edu.nus.iss.server.service;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class WeatherService {

    @Value("${OPENWEATHER_API_URL}")
    private String apiURL;

    @Value("${OPENWEATHER_API_KEY}")
    private String apiKey;

    public JsonObject getWeatherFromAPI(String city) {
        RestTemplate template = new RestTemplate();

        String completeApiUrl = UriComponentsBuilder
                .fromUriString(apiURL)
                .queryParam("q", city)
                .queryParam("appid", apiKey)
                .queryParam("units", "metric")
                .build().toString();

        RequestEntity<Void> request = RequestEntity
                .get(completeApiUrl)
                .accept(MediaType.APPLICATION_JSON)
                .build();

        ResponseEntity<String> response = template.exchange(request, String.class);

        return toJsonObject(response.getBody());
    }

    public JsonObject toJsonObject(String apiResponse) {

        JsonReader reader = Json.createReader(new StringReader(apiResponse));
        JsonObject result = reader.readObject();
        JsonObject main = result.getJsonObject("main");
        JsonObject weather = result.getJsonArray("weather").get(0).asJsonObject();

        JsonObject response = Json.createObjectBuilder()
                .add("city", result.getString("name"))
                .add("current_status", weather.getString("main"))
                .add("description", weather.getString("description"))
                .add("temperature", main.getJsonNumber("temp").doubleValue())
                .add("feels_like", main.getJsonNumber("feels_like").doubleValue())
                .add("min_temp", main.getJsonNumber("temp_min").doubleValue())
                .add("max_temp", main.getJsonNumber("temp_max").doubleValue())
                .add("pressure", main.getJsonNumber("pressure"))
                .add("humidity", main.getJsonNumber("humidity"))
                .build();

        return response;

    }

}
