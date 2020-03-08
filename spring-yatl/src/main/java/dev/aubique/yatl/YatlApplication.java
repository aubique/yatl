package dev.aubique.yatl;

import org.h2.tools.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.context.annotation.Bean;

import java.sql.SQLException;

@SpringBootApplication(exclude = {JacksonAutoConfiguration.class})
public class YatlApplication {

    public static void main(String[] args) {
        SpringApplication.run(YatlApplication.class, args);
    }

    @Bean(initMethod = "start", destroyMethod = "stop")
    public Server inMemoryH2DatabaseServer() throws SQLException {
        return Server.createTcpServer("-tcp", "-tcpAllowOthers", "-tcpPort", "9092");
    }

}
