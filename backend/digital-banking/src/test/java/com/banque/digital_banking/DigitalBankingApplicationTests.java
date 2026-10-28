package com.banque.digital_banking;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Test de fumée — vérifie que le contexte Spring démarre sans erreur
 * (base H2 en mémoire, voir src/test/resources/application.properties).
 */
@SpringBootTest
class DigitalBankingApplicationTests {

    @Test
    void contextLoads() {
        // Si le contexte démarre sans exception, le test réussit.
    }
}
