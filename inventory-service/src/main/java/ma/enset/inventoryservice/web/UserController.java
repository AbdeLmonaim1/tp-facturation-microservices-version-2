package ma.enset.inventoryservice.web;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class UserController {
    @GetMapping("/api/user/info")
    public Map<String, Object> getUserInfo(@AuthenticationPrincipal Jwt jwt, Authentication authentication) {
        Map<String, Object> realmAccess = jwt.getClaim("realm_access");

        return Map.of(
                "username", jwt.getClaimAsString("preferred_username"),
                "email", jwt.getClaimAsString("email"),
                "realmRoles", realmAccess != null ? realmAccess.get("roles") : "No roles",
                "authorities", authentication.getAuthorities(),
                "subject", jwt.getSubject()
        );
    }
}
