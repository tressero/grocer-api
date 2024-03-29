using angular_dotnet.DbContext;
using angular_dotnet.Dto;
using angular_dotnet.Settings;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Serilog;
using Serilog.Events;

Serilog.Debugging.SelfLog.Enable(Console.Error);
Log.Logger = new LoggerConfiguration()
    .WriteTo.Seq(serverUrl:"http://grocer.ochsner.me:5341",
        LogEventLevel.Information,
        batchPostingLimit:1000,
        apiKey:"rOItsfhl4CyiNXZw7FW3")
    // .File(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "log"), rollingInterval: RollingInterval.Day)
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);
builder.Logging.AddSerilog();
string ASPNETCORE_ENVIRONMENT = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

Log.Information("{ASPNETCORE_ENVIRONMENT} {builder.Configuration}");
// Add services to the container.
// builder.Services.AddDbContext<GrocerContext>(); if in file already
builder.Services.Configure<RootSettings>(builder.Configuration);

var  MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var services = builder.Services;
{
    
    var rootSettings = builder.Services.BuildServiceProvider().GetRequiredService<IOptions<RootSettings>>().Value;
    builder.Services.AddDbContext <GrocerContext> (options => 
        options.UseNpgsql(rootSettings.ConnectionStrings.Default)
    );
    builder.Services.AddTransient < IUnitOfWork, UnitOfWork > ();
    builder.Services.AddControllersWithViews();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    builder.Services.AddLogging(x => x.AddConsole());
    #region Automapper config
    var mapperConfig = new MapperConfiguration(mc =>
    {
        mc.AddProfile(new AutoMapperProfile());
    });

    IMapper mapper = mapperConfig.CreateMapper();
    services.AddSingleton(mapper);
    #endregion
    builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: MyAllowSpecificOrigins,
            policy  =>
            {
                // policy.WithOrigins(
                //     "http://localhost:4200",
                //     "https://localhost:44436",
                //     "https://grocer-np.ochsner.me",
                //     "https://grocer.ochsner.me");
                policy.AllowAnyOrigin();
                policy.AllowAnyMethod();
                policy.AllowAnyHeader();
                // policy.AllowCredentials();
            });
    });
// await using var ctx = new GrocerContext();
}


var app = builder.Build();

var rootSettingsPostBuild = app.Services.GetRequiredService<IOptions<RootSettings>>().Value; // Post build Access

app.UseCors(MyAllowSpecificOrigins);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
    
} 

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");;

app.Run();
