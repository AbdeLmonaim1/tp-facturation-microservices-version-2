package ma.enset.customerservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "customer.params")
//For injecting custom configuration properties in x and y
public record CustomerConfigParams(String x, String y) {
}
