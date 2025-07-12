# Stage 1: Build
FROM eclipse-temurin:17-jdk as builder

WORKDIR /app

# Copy project into image
COPY email-writer /app/email-writer

# Build using Maven
RUN cd email-writer && mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jdk

WORKDIR /app

# Copy built JAR
COPY --from=builder /app/email-writer/target/*.jar app.jar

# Run the app
ENTRYPOINT ["java","-jar","app.jar"]
