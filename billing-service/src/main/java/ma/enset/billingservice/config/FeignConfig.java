package ma.enset.billingservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FeignConfig {
    @Bean
    public FeignClientInterceptor requestInterceptor() {
        return new FeignClientInterceptor();
    }
}
