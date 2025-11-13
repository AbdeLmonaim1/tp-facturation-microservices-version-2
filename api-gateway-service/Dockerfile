FROM eclipse-temurin:21-jdk-alpine
VOLUME /tmp
COPY target/*.jar app.jar
#when the container starts, run the java commands to start the spring boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
