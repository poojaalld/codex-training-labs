"""Calculate the factorial of a predefined number."""


def factorial(number: int) -> int:
    if number < 0:
        raise ValueError("factorial is undefined for negative numbers")

    result = 1
    for value in range(1, number + 1):
        result *= value
    return result


def main() -> None:
    number = 6
    print("Factorial result:")
    print(factorial(number))


if __name__ == "__main__":
    main()
