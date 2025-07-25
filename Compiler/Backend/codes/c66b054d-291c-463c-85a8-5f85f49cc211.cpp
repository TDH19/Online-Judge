#include <iostream>

int main() {
    int num1, num2, sum;

    
    std::cin >> num1; // Get first number from user

   
    std::cin >> num2; // Get second number from user

    sum = num1 + num2; // Calculate the sum

    std::cout << "The sum of " << num1 << " and " << num2 << " is: " << sum << std::endl; // Display the sum

    return 0;
}