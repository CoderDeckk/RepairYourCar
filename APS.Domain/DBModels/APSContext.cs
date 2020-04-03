using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace APS.Domain.DBModels
{
    public partial class APSContext : DbContext
    {
        public APSContext()
        {
        }

        public APSContext(DbContextOptions<APSContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ApsclientInformation> ApsclientInformation { get; set; }
        public virtual DbSet<AspNetRoleClaims> AspNetRoleClaims { get; set; }
        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<AspNetUserTokens> AspNetUserTokens { get; set; }
        public virtual DbSet<AttorneryClientInformation> AttorneryClientInformation { get; set; }
        public virtual DbSet<CashAccountsInformation> CashAccountsInformation { get; set; }
        public virtual DbSet<InvestmentAccountInformation> InvestmentAccountInformation { get; set; }
        public virtual DbSet<LookupType> LookupType { get; set; }
        public virtual DbSet<LookupValues> LookupValues { get; set; }
        public virtual DbSet<SpouseInformation> SpouseInformation { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=localhost\\SQLEXPRESS2017;Database=APS;Trusted_Connection=True;MultipleActiveResultSets=true;user id =sa;password=Pa55w0rd;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ApsclientInformation>(entity =>
            {
                entity.ToTable("APSClientInformation");

                entity.Property(e => e.AssetAddedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.CompanyName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsRequired();

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.Email).HasMaxLength(50);

                entity.Property(e => e.FileReferencenNumber).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(700);

                entity.Property(e => e.NewAccountNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OriginalAccountNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TranferredDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UniqueId).HasDefaultValueSql("(newid())");
            });

            modelBuilder.Entity<AspNetRoleClaims>(entity =>
            {
                entity.HasIndex(e => e.RoleId);

                entity.Property(e => e.RoleId).IsRequired();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetRoleClaims)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<AspNetRoles>(entity =>
            {
                entity.HasIndex(e => e.NormalizedName)
                    .HasName("RoleNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedName] IS NOT NULL)");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserClaims>(entity =>
            {
                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserClaims)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserLogins>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.HasIndex(e => e.UserId);

                entity.Property(e => e.UserId).IsRequired();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserLogins)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserRoles>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.HasIndex(e => e.RoleId);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.RoleId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUsers>(entity =>
            {
                entity.HasIndex(e => e.NormalizedEmail)
                    .HasName("EmailIndex");

                entity.HasIndex(e => e.NormalizedUserName)
                    .HasName("UserNameIndex")
                    .IsUnique()
                    .HasFilter("([NormalizedUserName] IS NOT NULL)");

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.UserName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserTokens>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserTokens)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AttorneryClientInformation>(entity =>
            {
                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Alias1)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Alias2)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CellPhone).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.CreatedBy).IsRequired();

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.DateOfBirth).HasColumnType("datetime");

                entity.Property(e => e.DateOfMarriage).HasColumnType("datetime");

                entity.Property(e => e.DriverLicenceNumber).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.DriverLicenseExpireDate).HasColumnType("datetime");

                entity.Property(e => e.DriverLicenseState).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.EmailAddress)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.HomePhone).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.MiddleName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Ss).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.UniqueId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.UpdatedOn).HasColumnType("datetime");

                entity.Property(e => e.VoiceMailPhone).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.WorkPhone).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Zip).HasColumnType("numeric(18, 0)");
            });

            modelBuilder.Entity<CashAccountsInformation>(entity =>
            {
                entity.Property(e => e.AssetAddedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.CompanyName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CreatedBy).IsRequired();

                entity.Property(e => e.CreatedOn).HasColumnType("datetime");

                entity.Property(e => e.FileReferencenNumber).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.NewAccountNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.OriginalAccountNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.TranferredDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UniqueId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.AttorneryClientInformation)
                    .WithMany(p => p.CashAccountsInformation)
                    .HasForeignKey(d => d.AttorneryClientInformationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_CashAccountsInformation_AttoerneryClientInformation");
            });

            modelBuilder.Entity<InvestmentAccountInformation>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsRequired();

                entity.Property(e => e.Createdon).HasColumnType("datetime");

                entity.Property(e => e.InvestAssetAddedDate).HasColumnType("datetime");

                entity.Property(e => e.InvestFileReferencenNumber).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.InvestFundNumber).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.InvestNewAccountNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.InvestOriginalAccountNumber)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.InvestTranferredDate).HasColumnType("datetime");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.UniqueId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.AttorneryClientInformation)
                    .WithMany(p => p.InvestmentAccountInformation)
                    .HasForeignKey(d => d.AttorneryClientInformationId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_InvestmentAccountInformation_AttorneryClientInformation");
            });

            modelBuilder.Entity<LookupType>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsRequired();

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.Type).HasMaxLength(500);

                entity.Property(e => e.UniqueId).HasDefaultValueSql("(newid())");
            });

            modelBuilder.Entity<LookupValues>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsRequired();

                entity.Property(e => e.CreatedOn)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.ModifiedOn).HasColumnType("datetime");

                entity.Property(e => e.UniqueId).HasDefaultValueSql("(newid())");
            });

            modelBuilder.Entity<SpouseInformation>(entity =>
            {
                entity.Property(e => e.CreatedBy).IsRequired();

                entity.Property(e => e.CreatedOn).HasColumnType("date");

                entity.Property(e => e.DriverLicenceNumber).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.DriverLicenseExpireDate).HasColumnType("date");

                entity.Property(e => e.DriverLicenseState).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SpouseAlias1)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SpouseAlias2)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SpouseCellPhone).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SpouseDateOfBirth).HasColumnType("date");

                entity.Property(e => e.SpouseEmailAddress)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SpouseFirstName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SpouseLastName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SpouseMiddleName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.SpouseSs).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SpouseVoiceMailPhone).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.SpouseWorkPhone).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.UniqueId).HasDefaultValueSql("(newid())");

                entity.HasOne(d => d.AttorneryClientInformation)
                    .WithMany(p => p.SpouseInformation)
                    .HasForeignKey(d => d.AttorneryClientInformationId)
                    .HasConstraintName("FK_SpouseInformation_AttorneryClientInformation");
            });
        }
    }
}
