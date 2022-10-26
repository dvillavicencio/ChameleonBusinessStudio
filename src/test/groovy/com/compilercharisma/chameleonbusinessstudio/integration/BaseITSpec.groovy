package com.compilercharisma.chameleonbusinessstudio.integration

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.web.reactive.context.ReactiveWebApplicationContext
import org.springframework.cloud.contract.wiremock.AutoConfigureWireMock
import org.springframework.cloud.contract.wiremock.WireMockConfiguration
import org.springframework.context.ApplicationContext
import org.springframework.test.web.reactive.server.WebTestClient
import org.testcontainers.shaded.com.fasterxml.jackson.databind.ObjectMapper
import spock.lang.Shared
import spock.lang.Specification

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT, properties = "spring.main.web-application-type=reactive")
@AutoConfigureWireMock(port = 8081)
abstract class BaseITSpec extends Specification {

    @Autowired
    ReactiveWebApplicationContext context

    @Autowired
    ApplicationContext applicationContext

    @Autowired
    WebTestClient client

    @Shared
    ObjectMapper objectMapper = new ObjectMapper()

    def setup() {
        client = WebTestClient.bindToApplicationContext(context)
                .configureClient()
                .build()
    }

}
