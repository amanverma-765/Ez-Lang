# Ez-Lang 🇮🇳💻

## Overview
Ez-Lang is a toy programming language that transpiles Hindi-syntax code to Python, making programming more accessible and enjoyable experience.

***The project features a website with an interactive playground, enabling users to write and test Ez-Lang code directly in their browser.***

## 🌟 Language Features

* **Hindi Syntax**: Code in Hindi-like syntax, making programming accessible for Hindi-speaking learners.

* **Python-Based**: Transpiled into Python, ensuring compatibility and leveraging Python's robustness.

* **Interactive Playground**: Web-based environment for real-time language experimentation.


### Basic Constructs

#### Variable Declaration
```
manlo x = 10       // Integer declaration
manlo name = "Ez"  // String declaration
manlo is_active = True  // Boolean declaration
manlo numbers = [1, 2, 3, 4, 5]  // List declaration
```

#### Variable Manipulation
```
x = x + 5      // Arithmetic operations
name = name + " Language"  // String concatenation
```

#### Printing and String Interpolation
```
likho("Hello, World!")     // Simple print
likho("Value is $x")       // Variable interpolation
likho("Name is $name")     // String interpolation
```

### Control Structures

#### Conditional Statements
```
agar x > 5 ho_tab
    likho("Greater than 5")
nahi_to_agar x == 5 ho_tab
    likho("Equal to 5")
nahi_to
    likho("Less than 5")
```

#### Loops with Detailed Examples

##### List Iteration
```
// Iterate through a list
manlo fruits = ["Apple", "Banana", "Cherry"]
jabtak fruit fruits me ho_tabtak
    likho("Fruit: $fruit")
```

##### Numeric Range Loop
```
// Loop with numeric range
manlo n = 5
jabtak i = 1 to n ho_tabtak
    likho("Current number: $i")
```

##### Conditional Loop
```
// Loop with exit condition
manlo counter = 0
jabtak counter < 10 ho_tabtak
    likho("Counter: $counter")
    counter = counter + 1
    
    agar counter == 7 ho_tab
        rukjao  // Break out of loop
```

## Complex Examples

### Fibonacci Series
```
manlo n = 10, a = 0, b = 1
jabtak n > 0 ho_tabtak
    likho("$a")
    manlo temp = a + b
    a = b, b = temp
    n = n - 1
```

### Prime Number Checker
```
manlo num = 30, is_prime = True, i = 2
jabtak i <= num / 2 ho_tabtak
    agar num % i == 0 ho_tab
        is_prime = False
        rukjao
    i = i + 1

agar is_prime ho_tab
    likho("$num is prime")
nahi_to
    likho("$num is not prime")
```

## 🛠 Technology Stack
- Frontend: React, Vite
- Backend: Python, FastAPI
- Core: Hindi-syntax transpilation
- Online Playground Available

## 🌐 Playground
Interactive testing at https://ezlang-beta.vercel.app/

## 🤝 Contributions

Contributions are welcome! Please follow these guidelines:
- Fork the repository
- Create a new branch for your feature
- Submit a pull request