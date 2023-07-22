namespace angular_dotnet.Settings;

public class RootSettings
{
  public string Version => ThisAssembly.AssemblyInformationalVersion;
  public string VersionSwagger => "v" + string.Join('.', ThisAssembly.AssemblyVersion.Split('.').Take(2));
  public ConnectionStrings ConnectionStrings { get; set; }
}

public class ConnectionStrings
{
  public string Default { get; set; }
  public string Default2 { get; set; }
}