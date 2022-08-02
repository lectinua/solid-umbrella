package lect.prac.back.controller

import lect.prac.back.config.JwtTokenUtil
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@CrossOrigin
class JwtController {

    private val util: JwtTokenUtil

    @Autowired
    constructor(jwtTokenUtil: JwtTokenUtil) {
        this.util = jwtTokenUtil
    }

    @PostMapping("/sign")
    fun sign(@RequestParam userId: String): String {
        val payload = util.createClaims(userId)
        payload["userId"] = userId
        return util.create(payload)
    }

    @GetMapping("/valid")
    fun valid(@RequestParam token: String): Boolean {
        return util.validate(token)
    }
}