package ma.enset.apigatewayservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.ReactiveDiscoveryClient;
import org.springframework.cloud.gateway.discovery.DiscoveryClientRouteDefinitionLocator;
import org.springframework.cloud.gateway.discovery.DiscoveryLocatorProperties;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ApiGatewayServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayServiceApplication.class, args);
    }
    //For configurate gateway dynamically we will use this bean
    @Bean
    DiscoveryClientRouteDefinitionLocator locator(
            ReactiveDiscoveryClient rdc,
            DiscoveryLocatorProperties dlp
    ){
        return new DiscoveryClientRouteDefinitionLocator(rdc, dlp);
    }
}
