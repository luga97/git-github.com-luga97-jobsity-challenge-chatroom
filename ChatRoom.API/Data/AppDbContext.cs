using System.ComponentModel.DataAnnotations.Schema;
using ChatRoom.API.Entities;
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Room> Rooms { get; set; }
    public DbSet<Message> Messages { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase("ChatRoomDB");
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        ConfigUserModel(builder);
        ConfigRoomModel(builder);
        ConfigMessageModel(builder);
    }

    private static void ConfigMessageModel(ModelBuilder builder)
    {
        builder.Entity<Message>()
                    .HasKey(r => r.Id);

        builder.Entity<Message>()
            .Property(m => m.Id)
            .ValueGeneratedOnAdd();

        builder.Entity<Message>()
            .HasOne(m => m.Users)
            .WithMany();
    }

    private static void ConfigRoomModel(ModelBuilder builder)
    {
        builder.Entity<Room>()
            .HasKey(r => r.Id);

        builder.Entity<Room>()
            .Property(r => r.Id)
            .ValueGeneratedOnAdd();

        builder.Entity<Room>()
            .HasOne(r => r.Owner)
            .WithMany(u => u.OwnedRooms);

        builder.Entity<Room>()
            .HasMany(r => r.Messages)
            .WithOne(m => m.Room);
    }

    private static void ConfigUserModel(ModelBuilder builder)
    {
        builder.Entity<User>()
            .HasKey(u => u.Id);

        builder.Entity<User>()
            .Property(u => u.Id)
            .ValueGeneratedOnAdd();

        builder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();

        builder.Entity<User>()
                .Property(u => u.Username)
                .IsRequired();

        builder.Entity<User>()
            .HasMany(u => u.Rooms)
            .WithMany(r => r.Participants);

    }
}
