# Usa la imagen base de .NET para construir tu aplicación
FROM  mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copia el archivo csproj y restaura las dependencias
COPY *.csproj .
RUN dotnet restore

# Copia el resto del código y compila la aplicación
COPY . .
RUN dotnet publish -c Release -o out

# Crea la imagen final con el resultado de la compilación
FROM mcr.microsoft.com/dotnet/runtime:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "ChatRoom.StockBot.dll"]
