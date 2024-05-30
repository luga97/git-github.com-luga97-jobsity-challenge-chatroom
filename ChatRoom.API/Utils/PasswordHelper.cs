using System.Security.Cryptography;

namespace ChatRoom.API.Utils;

public static class PasswordHelper
{
    private const int SaltSize = 16;
    private const int HashSize = 20;
    private const int Iterations = 10000;

    // Método para encriptar una contraseña
    public static (string salt, string hash) EncryptPassword(string password)
    {
        byte[] saltBytes = GenerateSalt();
        byte[] hashBytes = GenerateHash(password, saltBytes);
        return (Convert.ToBase64String(saltBytes), Convert.ToBase64String(hashBytes));
    }

    // Método para verificar si una contraseña coincide con un hash y un salt
    public static bool VerifyPassword(string password, string salt, string hash)
    {
        byte[] saltBytes = Convert.FromBase64String(salt);
        byte[] hashBytes = Convert.FromBase64String(hash);
        byte[] newHashBytes = GenerateHash(password, saltBytes);

        return SlowEquals(hashBytes, newHashBytes);
    }

    // Método para generar un hash a partir de una contraseña y un salt
    private static byte[] GenerateHash(string password, byte[] salt)
    {
        using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA1);
        return pbkdf2.GetBytes(HashSize);
    }

    // Método para generar un salt aleatorio
    private static byte[] GenerateSalt()
    {
        byte[] salt = new byte[SaltSize];
        RandomNumberGenerator.Create().GetBytes(salt);
        return salt;
    }

    // Método para comparar dos arrays de bytes de manera lenta para evitar timing attacks
    private static bool SlowEquals(byte[] a, byte[] b)
    {
        uint diff = (uint)a.Length ^ (uint)b.Length;
        for (int i = 0; i < a.Length && i < b.Length; i++)
            diff |= (uint)(a[i] ^ b[i]);
        return diff == 0;
    }
}

