# Hosting
Our Linux server uses Tmux to maintain sessions. 

TMUX CHEATSHEET
- c-B + c-D to detach
- c-B " to create a new tab
- `tmux attach` to -reattach

# Configure Hosting Environments
base_path='/var/www/grocer-api/angular-dotnet'
build_config='RELEASE'
dll_path="$base_path/bin/$build_config/net6.0/angular-dotnet.dll"
cd "$base_path" && dotnet build -c $build_config

### NON PROD HOST
export ASPNETCORE_ENVIRONMENT=Development
dotnet $dll_path --urls=http://0.0.0.0:5001 ## --environment Testing

### PROD HOST
export ASPNETCORE_ENVIRONMENT=Production
dotnet $dll_path --urls=http://0.0.0.0:5000 ##--environment Production

## 
