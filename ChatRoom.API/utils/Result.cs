namespace ChatRoom.API.Utils;

public class Result<T>
{
    public T? Value { get; }
    public bool IsSuccess { get; }
    public Exception? Exception { get; }

    protected Result(T? value, bool isSuccess, Exception? exception)
    {
        Value = value;
        Exception = exception;
        this.IsSuccess = isSuccess;
    }

    public static Result<T> Success(T value)
    {
        return new(value,true, null);
    }

    public static Result<T?> Failure(Exception exception)
    {
        return new(default, false, exception);
    }
}