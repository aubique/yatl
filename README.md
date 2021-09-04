# Yet Another Todo List
Todo List app consisting Angular and Spring Boot.

Check out the [Live Version](https://yatl.herokuapp.com/) hosted on Heroku.

| Todo-list with Drag&Drop items | Dialog to create/edit a Todo |
|---|---|
| ![alt text](.misc/screenshot_1.jpg "Screenshot #1") | ![alt text](.misc/screenshot_2.jpg "Screenshot #2") |

## Built with
### Front-End:
- Angular 9
- Angular Material UI
- Angular Flex-Layout
### Back-End:
- Spring Boot 2.2
- Spring Data JPA
- Maven
- Lombok
- JUnit
- Log4j2
- PostgreSQL

## Deploy

If you'd like to run and test the code on your local machine.
There are some steps required to be done before you deploy it locally.

Maven includes several profiles:
1. *Production* with angular built in `resources/static`
2. *Development* to split up environment between server/client

### Production

Download repository and run default Maven profile:
```bash
git clone https://github.com/aubique/yatl.git
cd yatl
mvn clean spring-boot:run
```

Application is getting deployed in production environment by default.
Maven default profile executes `ng build` Angular sources to `resources/static`.

>Application should be available on `http://localhost:8080`

### Development

You can also run Spring Boot and Angular client code separately with `dev` Maven profile:
```bash
mvn clean package -Pdev
java -jar target/*.jar
npm start --prefix angular/
```
> Avoid using `ng serve` since there is a proxy specified in `proxy.conf`

You can access Angular application on `localhost:4200`.

### Database

Although Postgres dialect is used for queries for demonstration deployment In-Memory H2 DB has been chosen.

To access in-memory database you can start a TCP connection to this URL:
`jdbc:h2:tcp://localhost/mem:yatl`

> How to connect to an Embedded or In-Memory Database
>[you can read more here.](http://www.h2database.com/html/features.html#in_memory_databases)
