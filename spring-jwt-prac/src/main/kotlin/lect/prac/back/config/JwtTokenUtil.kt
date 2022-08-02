package lect.prac.back.config

import io.jsonwebtoken.Claims
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import java.util.*
import javax.annotation.PostConstruct


@Component
class JwtTokenUtil {

    companion object {
        const val validityMs: Long = 1000 * 60 // 1m
        // 1000 * 60 * 60 * 3 // 3h
    }

    @Value("\${jwt.secret}")
    private var secret: String? = null

    @PostConstruct
    fun init() {
        secret = Base64.getEncoder().encodeToString(secret?.toByteArray())
    }

    fun createClaims(subject: String): Claims {
        return Jwts.claims().setSubject(subject)
    }

    fun create(payload: Claims): String {
        val expiraton = Date()
        expiraton.time += validityMs

        return Jwts
            .builder()
            .setClaims(payload)
            .setExpiration(expiraton)
            .signWith(SignatureAlgorithm.HS256, secret)
            .compact()
    }

    fun validate(token: String): Boolean {
        try {
            Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
            return true
        } catch (e: Exception) {
            throw e
        }
    }
}