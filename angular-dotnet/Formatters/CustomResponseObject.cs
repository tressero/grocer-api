namespace angular_dotnet.Formatters;

public enum ResponseStatus { Success, Failed }
public enum ResponseWarning { Info, Warning, Error}

public class CustomResponseObject
{
    public ResponseStatus ResponseStatus { get; set; }
    public ResponseWarning ResponseWarning { get; set; }
    public string ResponseMessage { get; set; }
}
