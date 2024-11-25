export const examples = {
    hello: `// Simple Hello World Program
manlo name = "Ez Peoples"
likho("Hello, $name!")`,

    fibonacci: `// Fibonacci Series Program
manlo n = 10
manlo a = 0
manlo b = 1
  
likho("Fibonacci series up to $n terms:")
jabtak n > 0 ho_tabtak
    likho("$a")
    manlo temp = a + b
    a = b
    b = temp
    n = n - 1`,

    starPattern1: `// Simple Star Pattern
manlo n = 5
  
manlo i = 1
jabtak i <= n ho_tabtak
    manlo j = 1
    jabtak j <= i ho_tabtak
        likho("*")
        j = j + 1
    likho("")
    i = i + 1`,

    starPattern2: `// Diamond Star Pattern
manlo n = 5
  
// Upper part
manlo i = 1
jabtak i <= n ho_tabtak
    manlo spaces = n - i
    manlo k = 1
    jabtak k <= spaces ho_tabtak
        likho(" ")
        k = k + 1
  
    manlo j = 1
    jabtak j <= (2 * i - 1) ho_tabtak
        likho("*")
        j = j + 1
  
    likho("")
    i = i + 1
  
// Lower part
manlo i = n - 1
jabtak i >= 1 ho_tabtak
    manlo spaces = n - i
    manlo k = 1
    jabtak k <= spaces ho_tabtak
        likho(" ")
        k = k + 1
  
    manlo j = 1
    jabtak j <= (2 * i - 1) ho_tabtak
        likho("*")
        j = j + 1
  
    likho("")
    i = i - 1`,

    hollowSquare: `// Hollow Square Pattern
manlo n = 5
manlo i = 1
  
jabtak i <= n ho_tabtak
    manlo j = 1
    jabtak j <= n ho_tabtak
        agar i == 1 ho_tab
            likho("*")
        nahi_to_agar i == n ho_tab
            likho("*")
        nahi_to_agar j == 1 ho_tab
            likho("*")
        nahi_to_agar j == n ho_tab
            likho("*")
        nahi_to
            likho(" ")
        j = j + 1
    likho("")
    i = i + 1`,

    rightTriangle: `// Right Triangle Star Pattern
manlo n = 5
manlo i = 1
  
jabtak i <= n ho_tabtak
    manlo j = 1
    jabtak j <= i ho_tabtak
        likho("*")
        j = j + 1
    likho("")
    i = i + 1`,

    invertedPyramid: `// Inverted Pyramid Star Pattern
manlo n = 5
  
manlo i = n
jabtak i >= 1 ho_tabtak
    manlo spaces = n - i
    manlo k = 1
    jabtak k <= spaces ho_tabtak
        likho(" ")
        k = k + 1
  
    manlo j = 1
    jabtak j <= (2 * i - 1) ho_tabtak
        likho("*")
        j = j + 1
  
    likho("")
    i = i - 1`,

    checkerBoard: `// Checkerboard Pattern
manlo n = 8
  
manlo i = 1
jabtak i <= n ho_tabtak
    manlo j = 1
    jabtak j <= n ho_tabtak
        agar (i + j) % 2 == 0 ho_tab
            likho("*")
        nahi_to
            likho(" ")
        j = j + 1
    likho("")
    i = i + 1`,

    numberPyramid: `// Number Pyramid
manlo n = 5
manlo i = 1
  
jabtak i <= n ho_tabtak
    manlo spaces = n - i
    manlo k = 1
    jabtak k <= spaces ho_tabtak
        likho(" ")
        k = k + 1
  
    manlo j = 1
    jabtak j <= i ho_tabtak
        likho("$j")
        j = j + 1
  
    likho("")
    i = i + 1`,

    hollowDiamond: `// Hollow Diamond Pattern
manlo n = 5
  
// Upper part
manlo i = 1
jabtak i <= n ho_tabtak
    manlo spaces = n - i
    manlo k = 1
    jabtak k <= spaces ho_tabtak
        likho(" ")
        k = k + 1
  
    manlo j = 1
    jabtak j <= (2 * i - 1) ho_tabtak
        agar j == 1 ho_tab || j == (2 * i - 1) ho_tab
            likho("*")
        nahi_to
            likho(" ")
        j = j + 1
  
    likho("")
    i = i + 1
  
// Lower part
manlo i = n - 1
jabtak i >= 1 ho_tabtak
    manlo spaces = n - i
    manlo k = 1
    jabtak k <= spaces ho_tabtak
        likho(" ")
        k = k + 1
  
    manlo j = 1
    jabtak j <= (2 * i - 1) ho_tabtak
        agar j == 1 ho_tab || j == (2 * i - 1) ho_tab
            likho("*")
        nahi_to
            likho(" ")
        j = j + 1
  
    likho("")
    i = i - 1`,

    hourglass: `// Hourglass Star Pattern
manlo n = 5

// Upper part
manlo i = n
jabtak i >= 1 ho_tabtak
    manlo spaces = n - i
    manlo k = 1
    jabtak k <= spaces ho_tabtak
        likho(" ")
        k = k + 1
  
    manlo j = 1
    jabtak j <= (2 * i - 1) ho_tabtak
        likho("*")
        j = j + 1
  
    likho("")
    i = i - 1
  
// Lower part
manlo i = 2
jabtak i <= n ho_tabtak
    manlo spaces = n - i
    manlo k = 1
    jabtak k <= spaces ho_tabtak
        likho(" ")
        k = k + 1
  
    manlo j = 1
    jabtak j <= (2 * i - 1) ho_tabtak
        likho("*")
        j = j + 1
  
    likho("")
    i = i + 1`

}