package com.securifytech.securifyserver.Utils;

import com.securifytech.securifyserver.Domain.entities.Permission;
import com.securifytech.securifyserver.Domain.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
public class JWTTools {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.qr-secret}")
    private String qrSecret;

    @Value("${jwt.exptime}")
    private Integer exp;

    @Value("${jwt.qr-expVisitortime}")
    private Integer qrVisitorExp;

    @Value("${jwt.qr-exptime}")
    private Integer qrExp;

    public String generateToken(User user){
        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .claims(claims)
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + exp))
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .compact();
    }

    public String generateQrTokenVisitor(User user, Permission permission){
        Map<String, Object> claims = new HashMap<>();
        claims.put("idPermission", permission.getId().toString());

        return Jwts.builder()
                .claims(claims)
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + qrVisitorExp))
                .signWith(Keys.hmacShaKeyFor(qrSecret.getBytes()))
                .compact();

    }

    public String generateQrToken(User user){
        Map<String, Object> claims = new HashMap<>();

        return Jwts.builder()
                .claims(claims)
                .subject(user.getEmail())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + qrExp))
                .signWith(Keys.hmacShaKeyFor(qrSecret.getBytes()))
                .compact();

    }

    public Boolean verifyToken(String token) {
        try {
            JwtParser parser = Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                    .build();

            parser.parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public Boolean verifyQrToken(String token) {
        try {
            JwtParser parser = Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(qrSecret.getBytes()))
                    .build();

            parser.parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    public String getUsernameFrom(String token) {
        try {
            JwtParser parser = Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                    .build();

            return parser.parseSignedClaims(token)
                    .getPayload()
                    .getSubject();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String getUsernameFromQrToken(String token) {
        try {
            JwtParser parser = Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(qrSecret.getBytes()))
                    .build();

            return parser.parseSignedClaims(token)
                    .getPayload()
                    .getSubject();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public UUID getIdPermissionFrom(String token) {
        try {
            JwtParser parser = Jwts.parser()
                    .verifyWith(Keys.hmacShaKeyFor(qrSecret.getBytes()))
                    .build();

            Claims claims = parser.parseSignedClaims(token).getPayload();

            String idStr = claims.get("idPermission", String.class);
            return UUID.fromString(idStr);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public Boolean isTokenExpired(String token) {
        try {
            JwtParser parser = Jwts.parser()
                    .setSigningKey(Keys.hmacShaKeyFor(qrSecret.getBytes()))
                    .build();

            Claims claims = parser.parseClaimsJws(token).getBody();

            Date expirationDate = claims.getExpiration();
            return expirationDate.before(new Date());
        } catch (ExpiredJwtException e) {
            return true;
        } catch (SignatureException | IllegalArgumentException e) {
            e.printStackTrace();
            return false;
        }
    }
}
