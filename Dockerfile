# Stage 1: Builder
FROM eclipse-temurin:17-jdk AS builder

WORKDIR /app

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy source code
COPY email-writer /app/email-writer

# Build
RUN cd email-writer && mvn clean package -DskipTests

# Stage 2: Runtime
FROM eclipse-temurin:17-jdk
WORKDIR /app
COPY --from=builder /app/email-writer/target/email-writer-*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]
