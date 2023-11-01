# https://learn.microsoft.com/en-us/dotnet/core/docker/build-container?tabs=windows&pivots=dotnet-7-0
# Run below with Dockerfile path:
# BUILD
# docker build -t grocer-api-dev-image ~/dev/repos/tressero/grocer-api/angular-dotnet/  # Sets to develop, could (1) pass prod
                # 1 - https://docs.docker.com/engine/reference/commandline/build/ --build-arg			Set build-time variables
                # docker build -t grocer-api-dev-image ~/dev/repos/tressero/grocer-api/angular-dotnet/ --build-arg ASPNETCORE_ENVIRONMENT=Production
                # docker build --progress=plain -t grocer-api-prod-image ~/dev/repos/tressero/grocer-api/angular-dotnet/ --build-arg="ASPNETCORE_ENVIRONMENT=Production"
# RUN - DEV
                # docker stop grocer-api-dev && docker rm grocer-api-dev 
                # docker run -e "ASPNETCORE_ENVIRONMENT=Development" --name grocer-api-dev -d -p 5001:80 grocer-api-dev-image:latest
# RUN - PROD
                # docker stop grocer-api-prod && docker rm grocer-api-prod 
                # docker run -e "ASPNETCORE_ENVIRONMENT=Production" --name grocer-api-prod -d -p 5001:80 grocer-api-prod-image:latest

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
ARG ASPNETCORE_ENVIRONMENT='Development'
WORKDIR /angular-dotnet

RUN echo "#1 - printing build WORKDIR"
RUN dir -s 
RUN echo "$ASPNETCORE_ENVIRONMENT"
RUN echo "#2 - Copy everything"
COPY . ./       
RUN dir -s 
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out
RUN dir -s out/
RUN dir -s
RUN ls -ltra out/
EXPOSE 5000

# Copy + Run built libs
# bin/RELEASE/net6.0/angular-dotnet.dll 
#https://stackoverflow.com/questions/63264649/contentrootpath-of-hosting-environment-in-docker
# https://stackoverflow.com/questions/42552034/bind-container-port-to-host-inside-dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:6.0
ARG ASPNETCORE_ENVIRONMENT
RUN echo "$ASPNETCORE_ENVIRONMENT (though this doesn't get used for anything and isn't respected - BUGGY. Use -e on run instead)"
WORKDIR /app              
RUN echo "#3 - printing runtime WORKDIR"
RUN dir -s 

COPY --from=build-env /angular-dotnet/out .
#COPY --from=build-env /angular-dotnet/appsettings* .
RUN echo "#4 - printing runtime/out WORKDIR [pre-run]"
RUN dir -s 
#RUN export ASPNETCORE_ENVIRONMENT="$ASPNETCORE_ENVIRONMENT"
ENTRYPOINT ["dotnet", "angular-dotnet.dll"]
EXPOSE 5000
