# Chatrooms Project

## Description
This project is a chatroom system developed with .NET, SignalR, React with Vite, and RabbitMQ. It includes a decoupled bot that fetches stock quotes and communicates with RabbitMQ to send and receive messages from chatrooms. Users can send commands like this `/stock=aapl.us` where `aapl.us` is a stock symbol, and the bot responds with the relevant information.

## Table of Contents

1. [Installation and Local Setup](#installation-and-local-setup)
2. [System Scheme](#system-scheme)
3. [Screenshots](#screenshots)
4. [Project Structure](#project-structure)
5. [Jobsity Requirements](#jobsity-requirements)

---

## Installation and Local Setup

### Prerequisites
- Docker and docker-compose
- .NET Core SDK (if you want to run everything locally)
- Node.js 20 (if you want to run everything locally)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/luga97/jobsity-challenge-chatroom.git
    cd jobsity-challenge-chatroom
    ```

2. Run the Docker container:

    ```sh
    docker-compose up -d # use --build if you need to rebuild the images
    ```

3. Open the browser on [http://localhost:3000](http://localhost:3000)
4. (Optional) just for development, run the script through a bash shell:

    ```sh
    ./runAllLocal.sh
    ```

## System Scheme

![System Diagram](https://github.com/luga97/jobsity-challenge-chatroom/assets/32438765/544a99d9-ae5b-4ddd-af16-510d0e67b8fb)

### Components Description

#### Frontend
- **React + Vite**: Used as the framework and build tool for the frontend, providing a fast and modern development experience.
- **React Router**: Implemented for handling navigation and routing within the frontend application, allowing for a single-page application experience with multiple routes for login, registration, chatrooms, and other pages.
- **React Icons**: Utilized for incorporating icons into the user interface.
- **SignalR Client**: Connects to the SignalR hub on the backend for real-time communication.
- **Tailwind CSS**: Applied for styling, allowing for a utility-first CSS framework to quickly style the application.
- **React Context API**: Used for global state management to share data across different components efficiently.

#### Backend
- **ASP.NET Core with SignalR**: SignalR is used to create a real-time communication hub, managing connections and message distribution between clients.
- **Entity Framework Core**: Employed for data access and management, with an in-memory database configured for demonstration purposes.
- **RabbitMQ Client**: Integrated to send and receive messages between the backend and the bot, facilitating command processing and responses.

#### StockBot
- **CSV Processing Library**: Utilized to parse and process CSV files containing stock data.
- **RabbitMQ Client**: Used to receive messages from the SignalR hub and send corresponding responses back, ensuring seamless communication between the bot and the chatrooms.

#### RabbitMQ
- **Message Broker**: RabbitMQ is used to manage the commands sent to the bot. It acts as an intermediary for message queuing, ensuring that messages are reliably sent and received between the backend and the bot. This setup decouples the bot's processing logic from the chatroom's real-time operations, enhancing scalability and reliability.

## Screenshots

1. **Web Flow**
    - Login Screen

      ![Login Screen](https://github.com/luga97/jobsity-challenge-chatroom/assets/32438765/1fb2fcac-2253-4efb-9742-356bf315dede)

    - User Registration
    
      ![User Registration](https://github.com/luga97/jobsity-challenge-chatroom/assets/32438765/ce3d323f-1d33-4ba3-a8b4-a56658bfb233)  

    - Room Creation

      ![image](https://github.com/luga97/jobsity-challenge-chatroom/assets/32438765/31c925eb-8abf-4afd-ae4d-a84c534e8b84)
      
    - Multiple rooms access

      ![image](https://github.com/luga97/jobsity-challenge-chatroom/assets/32438765/53d6974b-2e2a-4629-80fc-a336f2714d55)


    - Messages in Rooms

      ![Messages in Rooms](https://github.com/luga97/jobsity-challenge-chatroom/assets/32438765/2053dd80-6781-4929-ac41-5a0443428000)


1. **Bot Commands and Responses**
    - Sending `/stock=` commands
      
      ![bot example](https://github.com/luga97/jobsity-challenge-chatroom/assets/32438765/307bf505-8e0a-4a10-9e19-d2b343395af7)

    - Bot responding about wrong stock quotes

      ![image](https://github.com/luga97/jobsity-challenge-chatroom/assets/32438765/115676da-9a39-4290-abf7-6bfd94cb147f)

2. **RabbitMQ**
    - Captures of messages arriving at RabbitMQ

      ![RabbitMQ example 2](https://github.com/luga97/jobsity-challenge-chatroom/assets/32438765/baefcb3e-41a4-47c4-97fb-3d16b401c738)

      ![RabbitMQ example 2](https://github.com/luga97/jobsity-challenge-chatroom/assets/32438765/4f5a94d9-0f52-4daa-90fb-531a92af7e26)
      
3. **Code Examples**
  - Test stock quote getter in StockBot

    ![image](https://github.com/luga97/jobsity-challenge-chatroom/assets/32438765/6b4fb6c0-ccd6-4614-842f-990630121af0)

## Project Structure

```
/jobsity-challenge-chatroom
|-- /ChatRoom.API
|   |-- /Controllers (controllers for HTTP requests)
|   |-- /Data (entity framework config)
|   |-- /DTOs (data transfer objects to communicate between frontend and backend)
|   |-- /Entities (database models used by entity framework)
|   |-- /Hubs (SignalR hubs for WebSocket connection)
|   |-- /Services (business logic)
|   |-- ...
|-- /ChatRoom.StockBot
|   `-- Program.cs (all bot logic is here)
|   `-- ...
|-- /frontend
|   |-- /src
|   |   |-- /components 
|   |   |-- /context (logic and data required across the entire frontend)
|   |   |-- /hooks
|   |   |-- /layouts
|   |   |-- /pages
|   |   `-- main.jsx
|   `-- vite.config.js
|-- runAllLocal.sh (run all the modules in dev mode locally, includes RabbitMQ container)
|-- docker-compose.yml (Docker containers config)
|-- ...
```
# Jobsity Requirements

## Mandatory Features
All the market options are demostrated on [Screenshots section](#screenshots) 
- [x] Allow registered users to log in and talk with other users in a chatroom.
- [x] Allow users to post messages as commands into the chatroom with the following format `/stock=stock_code`.
- [x] Create a decoupled bot that will call an API using the stock_code as a parameter.
- [x] The bot should parse the received CSV file and then it should send a message back into the chatroom using a message broker like RabbitMQ. The message will be a stock quote using the following format: “APPL.US quote is $93.42 per share”. The post owner will be the bot.
- [x] Have the chat messages ordered by their timestamps and show only the last 50 messages.
- [x] Unit test the functionality you prefer. *(You can mark this as completed once you have completed it)*

## Bonus (Optional)

- [x] Have more than one chatroom.
- [ ] Use .NET identity for users authentication.

  * Obs = I know how to use identity, but I wanted to keep the project "simple" 

- [x] Handle messages that are not understood or any exceptions raised within the bot.
- [x] Build an installer.
