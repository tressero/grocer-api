namespace angular_dotnet.DbModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class StoreSection
{
    
    public StoreSection()
    {
        
    }
    public Guid Id { get; set; }
    public string Name { get; set; }
}