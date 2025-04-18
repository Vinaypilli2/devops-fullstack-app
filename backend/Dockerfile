# Use official Golang image as the base image
FROM golang:1.19-alpine

# Set environment variables
ENV GO111MODULE=on \
    CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64

# Create working directory
WORKDIR /app

# Install necessary packages (like git for go modules)
RUN apk update && apk add --no-cache git

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the entire project
COPY . .

# Build the Go app
RUN go build -o main .

# Expose the port your app listens on
EXPOSE 3000

# Command to run the executable
CMD ["./main"]