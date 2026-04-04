# --- STAGE 1: Build the React Frontend ---
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# --- STAGE 2: Build the Spring Boot Backend ---
FROM maven:3.9.6-eclipse-temurin-17 AS backend-build
WORKDIR /app
COPY pom.xml .
COPY src ./src
# ADDED: Copy the frontend folder so the Maven plugin can find it
COPY frontend ./frontend

# Copy the static build from Stage 1 into the resources folder
COPY --from=frontend-build /app/src/main/resources/static ./src/main/resources/static

RUN mvn clean package -DskipTests

# --- STAGE 3: Final Runtime ---
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=backend-build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Xmx512m", "-jar", "app.jar"]