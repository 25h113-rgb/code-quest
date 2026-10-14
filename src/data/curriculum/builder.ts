import { CourseId, Difficulty, Topic } from '../../types';

export interface TopicRawSpec {
  topicNumber: number;
  title: string;
  unitNumber: number;
  unitTitle: string;
  difficulty: Difficulty;
  englishExplanation: string;
  tamilExplanation: string;
  syntax?: string;
  codeExample: string;
  expectedOutput: string;
  lineByLineExplanation?: { line: string; explanation: string }[];
  exercisePrompt: string;
  starterCode: string;
  expectedExerciseOutput: string;
  hint: string;
  explanationOnMistake: string;
  relatedPracticeQuestion: string;
  mcqQuestion?: string;
  mcqOptions?: string[];
  correctOptionIndex?: number;
  mcqExplanation?: string;
}

interface GeneratedQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Helper to shuffle correct answer into a deterministic pseudo-random position (0, 1, 2, or 3)
function buildQuizWithPosition(
  question: string,
  correctAnswer: string,
  distractors: [string, string, string],
  explanation: string,
  seed: number
): GeneratedQuiz {
  const targetIndex = Math.abs(seed) % 4;
  const options: string[] = [];
  let dIdx = 0;

  for (let i = 0; i < 4; i++) {
    if (i === targetIndex) {
      options.push(correctAnswer);
    } else {
      options.push(distractors[dIdx++]);
    }
  }

  return {
    question,
    options,
    correctIndex: targetIndex,
    explanation,
  };
}

// Generate topic-specific MCQ quiz questions with authentic programming knowledge checks
function generateMCQForTopic(courseId: CourseId, topicNumber: number, title: string, expectedOutput: string): GeneratedQuiz {
  const lang = courseId === 'python' ? 'Python' : courseId === 'java' ? 'Java' : 'C++';
  const seed = topicNumber * 13 + (courseId === 'python' ? 3 : courseId === 'java' ? 7 : 11);

  // Dedicated topic quizzes
  if (topicNumber === 1) {
    if (courseId === 'python') {
      return buildQuizWithPosition(
        "Which built-in function is used to display text or output on the console screen in Python?",
        "print()",
        ["echo()", "System.out.println()", "console.log()"],
        "In Python, print() is the built-in function used to output data to the standard console display.",
        seed
      );
    } else if (courseId === 'java') {
      return buildQuizWithPosition(
        "What is the exact signature of the main entry point method in a Java application?",
        "public static void main(String[] args)",
        ["public void main(String args)", "static int main()", "function main(args)"],
        "The JVM looks for 'public static void main(String[] args)' to begin execution of Java programs.",
        seed
      );
    } else {
      return buildQuizWithPosition(
        "Which header file must be included in C++ to use std::cout and std::cin?",
        "<iostream>",
        ["<stdio.h>", "<conio.h>", "<stream.h>"],
        "<iostream> defines the standard input and output stream objects std::cout and std::cin.",
        seed
      );
    }
  }

  if (topicNumber === 2) {
    if (courseId === 'python') {
      return buildQuizWithPosition(
        "What type of programming language is Python primarily categorized as?",
        "Interpreted and dynamically typed",
        ["Purely compiled into machine bytecode only", "Statically typed without dynamic evaluation", "Low-level assembly language"],
        "Python is an interpreted, high-level, dynamically typed language created by Guido van Rossum in 1991.",
        seed
      );
    } else if (courseId === 'java') {
      return buildQuizWithPosition(
        "What makes Java platform-independent across different operating systems?",
        "Bytecode executed by the Java Virtual Machine (JVM)",
        ["Compiling directly to native x86 machine assembly", "Requiring identical hardware on all computers", "Translating code to JavaScript in web browsers"],
        "Java source files compile to bytecode (.class), which runs on any OS having a compatible JVM ('Write Once, Run Anywhere').",
        seed
      );
    } else {
      return buildQuizWithPosition(
        "Who originally designed and created the C++ programming language at Bell Labs in 1979?",
        "Bjarne Stroustrup",
        ["Guido van Rossum", "James Gosling", "Dennis Ritchie"],
        "C++ was created by Bjarne Stroustrup as an extension of the C language with classes and object-oriented capabilities.",
        seed
      );
    }
  }

  if (topicNumber === 3 || topicNumber === 4) {
    return buildQuizWithPosition(
      `When setting up an integrated development environment (IDE) for ${lang}, what extension or toolchain is required?`,
      `The language language-server extension and runtime/compiler installed on the OS`,
      [`A graphic photo editor plugin`, `An HTML-only browser add-on`, `A specialized hardware GPU debugger`],
      `Writing and executing ${lang} programs requires the official language runtime/compiler and appropriate VS Code extensions.`,
      seed
    );
  }

  if (topicNumber === 5) {
    if (courseId === 'python') {
      return buildQuizWithPosition(
        "What is the correct syntax to output 'Hello, World!' in Python 3?",
        "print('Hello, World!')",
        ["print 'Hello, World!'", "echo('Hello, World!')", "System.out.println('Hello, World!')"],
        "Python 3 requires parentheses around the arguments passed to the print() function.",
        seed
      );
    } else if (courseId === 'java') {
      return buildQuizWithPosition(
        "Which statement properly outputs 'Hello, World!' on a new line in Java?",
        'System.out.println("Hello, World!");',
        ['print("Hello, World!");', 'Console.Write("Hello, World!");', 'cout << "Hello, World!";'],
        'System.out.println() prints the given string followed by a newline character.',
        seed
      );
    } else {
      return buildQuizWithPosition(
        "Which stream insertion operator is used with std::cout in C++?",
        "<< (stream insertion operator)",
        [">> (stream extraction operator)", "-> (member pointer)", ":: (scope resolution)"],
        "The << operator inserts formatted data into the output stream object std::cout.",
        seed
      );
    }
  }

  if (topicNumber === 6) {
    if (courseId === 'python') {
      return buildQuizWithPosition(
        "How is a code block (such as inside an if statement or function) delimited in Python?",
        "Indentation (spaces or tabs)",
        ["Curly braces { }", "BEGIN and END keywords", "Semicolons ; at line ends"],
        "Python relies strictly on consistent indentation whitespace to define blocks of code.",
        seed
      );
    } else {
      return buildQuizWithPosition(
        `How are code blocks delimited in ${lang}?`,
        "Curly braces { and }",
        ["Indentation whitespace only", "Square brackets [ and ]", "Parentheses ( and )"],
        `In ${lang}, executable statement blocks are enclosed inside curly braces { }.`,
        seed
      );
    }
  }

  if (topicNumber === 7) {
    if (courseId === 'python') {
      return buildQuizWithPosition(
        "What separator does the Python print() function use by default between multiple arguments?",
        "A single space (' ')",
        ["A comma (',')", "A newline ('\\n')", "A tab ('\\t')"],
        "By default, print(a, b) separates arguments with a single space character (sep=' ').",
        seed
      );
    } else if (courseId === 'java') {
      return buildQuizWithPosition(
        "What is the difference between System.out.print() and System.out.println() in Java?",
        "println() terminates the line with a newline, whereas print() does not",
        ["print() prints in bold, println() in italics", "println() only prints numbers", "print() works only in applets"],
        "println() moves the cursor to the next line after printing, while print() keeps it on the same line.",
        seed
      );
    } else {
      return buildQuizWithPosition(
        "In C++, which manipulator is used with std::cout to insert a newline and flush the output buffer?",
        "std::endl",
        ["std::next", "std::flush_line", "std::break"],
        "std::endl inserts a newline character ('\\n') and flushes the standard output stream buffer.",
        seed
      );
    }
  }

  if (topicNumber === 8 || topicNumber === 9) {
    if (courseId === 'python') {
      return buildQuizWithPosition(
        "Which character is used to create a single-line comment in Python?",
        "# (hash / pound)",
        ["// (double slash)", "/* (slash star)", "-- (double dash)"],
        "In Python, any line or inline statement starting with # is treated as a comment and ignored by the interpreter.",
        seed
      );
    } else {
      return buildQuizWithPosition(
        `Which symbol starts a single-line comment in ${lang}?`,
        "// (double forward slash)",
        ["# (hash symbol)", "<!-- (HTML comment)", "/* without closing */"],
        `In ${lang}, single-line comments begin with //, while multi-line comments are enclosed in /* ... */.`,
        seed
      );
    }
  }

  if (topicNumber >= 11 && topicNumber <= 20) {
    // Unit 2: Variables and Data Types
    if (title.toLowerCase().includes('naming')) {
      return buildQuizWithPosition(
        `Which of the following is an INVALID variable name in ${lang}?`,
        "2nd_variable (starting with a number)",
        ["_tempValue", "studentScore", "total_marks"],
        "Variable names cannot begin with a numeric digit in modern programming languages.",
        seed
      );
    }
    if (title.toLowerCase().includes('boolean')) {
      return buildQuizWithPosition(
        `What two literal values can a boolean data type hold?`,
        "true and false",
        ["yes and no", "0 and 2", "null and undefined"],
        "Boolean data types represent binary truth values and evaluate strictly to either true or false.",
        seed
      );
    }
    return buildQuizWithPosition(
      `In ${lang}, what is the purpose of declaring and using variables?`,
      "To store, name, and retrieve data values in memory during program execution",
      ["To permanently write data to optical disk storage", "To stop the compiler from checking syntax errors", "To speed up network internet connections"],
      "Variables allocate named memory addresses where program state and values are dynamically stored and referenced.",
      seed
    );
  }

  if (topicNumber >= 21 && topicNumber <= 30) {
    // Unit 3: Operators
    if (title.toLowerCase().includes('modulus') || topicNumber === 21) {
      return buildQuizWithPosition(
        `Which operator calculates the remainder of an integer division?`,
        "% (percent / modulus)",
        ["/ (division)", "// (floor division)", "^ (caret)"],
        "The modulus operator (%) returns the remainder when the left operand is divided by the right operand.",
        seed
      );
    }
    if (title.toLowerCase().includes('logical')) {
      return buildQuizWithPosition(
        `Which operator evaluates to true only if BOTH operands are true?`,
        courseId === 'python' ? "and" : "&& (logical AND)",
        [courseId === 'python' ? "or" : "|| (logical OR)", courseId === 'python' ? "not" : "! (logical NOT)", "^ (bitwise XOR)"],
        "The logical AND operator requires both expressions to evaluate to true for the entire expression to be true.",
        seed
      );
    }
    return buildQuizWithPosition(
      `What does the assignment operator (=) do in ${lang}?`,
      "Assigns the value on its right-hand side to the variable on its left-hand side",
      ["Compares two values for equality", "Checks if a value is greater than zero", "Swaps two memory locations automatically"],
      "Single equals (=) is the assignment operator. Equality comparison uses double equals (==).",
      seed
    );
  }

  if (topicNumber >= 31 && topicNumber <= 40) {
    // Unit 4: Control flow and loops
    if (title.toLowerCase().includes('if')) {
      return buildQuizWithPosition(
        `Under what condition does the block inside an 'if' statement execute?`,
        "Only when the conditional test expression evaluates to true",
        ["Only when an error occurs in the compiler", "Every single time the program starts regardless of condition", "Only when the user provides keyboard input"],
        "An 'if' conditional branch is triggered strictly when its test condition returns true.",
        seed
      );
    }
    if (title.toLowerCase().includes('break')) {
      return buildQuizWithPosition(
        `What is the effect of executing a 'break' statement inside a loop?`,
        "Immediately terminates the loop and jumps to the code following the loop",
        ["Restarts the current iteration from line 1", "Skips only the next single line of code", "Terminates the entire operating system"],
        "The 'break' keyword immediately exits the nearest enclosing loop.",
        seed
      );
    }
    return buildQuizWithPosition(
      `What is the primary role of loops (for / while) in ${lang}?`,
      "To repeat a block of code multiple times until a terminating condition is met",
      ["To permanently lock computer memory", "To declare new object classes", "To encrypt program source files"],
      "Loops automate repetitive computational tasks efficiently without repeating code blocks.",
      seed
    );
  }

  if (topicNumber >= 41 && topicNumber <= 50) {
    // Unit 5: Collections / Strings / Arrays
    if (title.toLowerCase().includes('index') || title.toLowerCase().includes('array')) {
      return buildQuizWithPosition(
        `In ${lang}, what is the standard index of the very first element in an array or collection?`,
        "0 (zero-indexed)",
        ["1 (one-indexed)", "-1", "None / undefined"],
        `${lang} uses zero-based indexing, meaning the first element is at index 0.`,
        seed
      );
    }
    return buildQuizWithPosition(
      `Why are collection data structures (like arrays and lists) essential in programming?`,
      "They allow storing and managing multiple related data items in a single ordered container",
      ["They eliminate the need for computer RAM", "They compile code into HTML automatically", "They make code impossible to inspect"],
      "Collections allow grouping, traversing, and manipulating multiple items under one variable name.",
      seed
    );
  }

  if (topicNumber >= 51 && topicNumber <= 60) {
    // Unit 6: Functions
    return buildQuizWithPosition(
      `What key software engineering benefit do functions / methods provide?`,
      "Code reusability, modularity, and easier debugging (DRY principle)",
      ["Increasing the final file size intentionally", "Preventing any comments from being added", "Requiring code to run only on cloud servers"],
      "Functions prevent code duplication, enhance readability, and allow dividing complex logic into testable modules.",
      seed
    );
  }

  if (topicNumber >= 61 && topicNumber <= 80) {
    // Intermediate / OOP Concepts
    if (title.toLowerCase().includes('class') || title.toLowerCase().includes('object') || title.toLowerCase().includes('constructor')) {
      return buildQuizWithPosition(
        `In Object-Oriented Programming (OOP), what is the relationship between a class and an object?`,
        "A class is the blueprint or template, while an object is an instance created from that blueprint",
        ["An object is the blueprint, while a class is the running instance", "Classes and objects are unrelated and cannot interact", "A class only holds numbers, while an object only holds text"],
        "Classes define the attributes and methods; objects are concrete instances instantiated in memory.",
        seed
      );
    }
    if (title.toLowerCase().includes('inheritance')) {
      return buildQuizWithPosition(
        `What does the concept of inheritance enable in Object-Oriented Programming?`,
        "A child/subclass acquires properties and methods of a parent/superclass",
        ["Deletes all parent variables when child is instantiated", "Forces all classes to have identical names", "Bypasses all security firewalls"],
        "Inheritance promotes hierarchical code reuse by allowing subclasses to inherit and extend superclass behavior.",
        seed
      );
    }
    return buildQuizWithPosition(
      `What is the core objective of Encapsulation in object-oriented design?`,
      "Bundling data with methods and restricting direct unauthorized access to internal state",
      ["Making every variable globally accessible to all files", "Translating code into multiple human languages", "Speeding up CPU clock frequencies directly"],
      "Encapsulation hides internal implementation details and protects object integrity through controlled access.",
      seed
    );
  }

  // Unit 9 & 10: Advanced topics, Error Handling, Memory, Projects
  if (title.toLowerCase().includes('exception') || title.toLowerCase().includes('try') || title.toLowerCase().includes('error')) {
    return buildQuizWithPosition(
      `What is the primary purpose of exception handling (try-catch / try-except) blocks?`,
      "To gracefully catch runtime errors and prevent the application from crashing abruptly",
      ["To permanently delete problematic files from the hard disk", "To turn errors into valid numbers automatically", "To hide source code from users"],
      "Exception handling allows programs to detect runtime anomalies, execute recovery logic, and maintain stability.",
      seed
    );
  }

  // General robust topic quiz
  return buildQuizWithPosition(
    `When working with Topic ${topicNumber} (${title}) in ${lang}, which principle is most critical?`,
    `Following precise syntax rules and understanding how ${title} manipulates program state`,
    [`Ignoring compilation and execution errors`, `Never using variables or functions with this feature`, `Running the code exclusively in a web browser without a runtime`],
    `Mastering ${title} requires adhering to ${lang}'s syntax conventions, data flow, and runtime evaluation rules.`,
    seed
  );
}

// Generate realistic starter code with a clear BLANK SPACE (______) for students to fill in
function generateBlankStarterCode(courseId: CourseId, title: string, topicNumber: number): string {
  if (courseId === 'python') {
    if (topicNumber === 1) {
      return `# Topic 1: ${title}\n# Replace the blank space (______) below with the message 'Coding is fun!':\nprint(______)`;
    }
    if (topicNumber === 2) {
      return `# Topic 2: ${title}\n# Replace the blank space (______) to print 'Python is powerful and simple':\nprint(______)`;
    }
    if (topicNumber === 5) {
      return `# Topic 5: ${title}\n# Replace the blank space (______) to print the classic greeting:\nprint(______)`;
    }
    if (topicNumber === 7) {
      return `# Topic 7: ${title}\n# Replace the blank space (______) with the number 42:\nprint(______)`;
    }
    if (topicNumber === 11) {
      return `# Topic 11: ${title}\n# Replace the blank space (______) to set score to 100:\nscore = ______\nprint(score)`;
    }
    if (topicNumber === 21) {
      return `# Topic 21: ${title}\n# Replace the blank space (______) so that 10 * ______ equals 50:\nprint(10 * ______)`;
    }
    if (topicNumber === 31) {
      return `# Topic 31: ${title}\n# Replace the blank space (______) with a condition that evaluates to True:\nx = 10\nif x > ______:\n    print('Greater')`;
    }
    if (topicNumber === 35) {
      return `# Topic 35: ${title}\n# Replace the blank space (______) with range parameter 3:\nfor i in range(______):\n    print(i)`;
    }
    if (topicNumber === 44) {
      return `# Topic 44: ${title}\n# Replace the blank space (______) with len to find the list length:\nfruits = ['apple', 'banana']\nprint(______(fruits))`;
    }
    if (topicNumber === 51) {
      return `# Topic 51: ${title}\n# Replace the blank space (______) with 'Hi!':\ndef say_hi():\n    print(______)\n\nsay_hi()`;
    }
    if (topicNumber === 81) {
      return `# Topic 81: ${title}\n# Replace the blank space (______) with 'CodeQuest Guide':\nclass Book:\n    title = ______\n\nb = Book()\nprint(b.title)`;
    }
    if (topicNumber === 100) {
      return `# Topic 100: Capstone Project\n# Replace the blank space (______) with 'Python Course 100% Completed':\nprint(______)`;
    }
    return `# Topic ${topicNumber}: ${title}\n# Replace the blank space (______) with your code to produce the required output:\nprint(______)`;
  }

  if (courseId === 'java') {
    if (topicNumber === 1) {
      return `public class Main {\n    public static void main(String[] args) {\n        // Replace the blank space (______) to print 'Hello Java World!':\n        System.out.println(______);\n    }\n}`;
    }
    if (topicNumber === 5) {
      return `public class Main {\n    public static void main(String[] args) {\n        // Replace the blank space (______) with "Hello, World!":\n        System.out.println(______);\n    }\n}`;
    }
    if (topicNumber === 11) {
      return `public class Main {\n    public static void main(String[] args) {\n        // Replace the blank space (______) with 100:\n        int score = ______;\n        System.out.println(score);\n    }\n}`;
    }
    return `public class Main {\n    public static void main(String[] args) {\n        // Topic ${topicNumber}: ${title}\n        // Fill in the blank space (______) to complete the statement:\n        System.out.println(______);\n    }\n}`;
  }

  // C++ course
  if (topicNumber === 1) {
    return `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Replace the blank space (______) to print 'Hello C++ World!':\n    cout << ______ << endl;\n    return 0;\n}`;
  }
  if (topicNumber === 5) {
    return `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Replace the blank space (______) with "Hello, World!":\n    cout << ______ << endl;\n    return 0;\n}`;
  }
  if (topicNumber === 11) {
    return `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Replace the blank space (______) with 100:\n    int score = ______;\n    cout << score << endl;\n    return 0;\n}`;
  }
  return `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Topic ${topicNumber}: ${title}\n    // Fill in the blank space (______) to complete the statement:\n    cout << ______ << endl;\n    return 0;\n}`;
}

export function createTopic(courseId: CourseId, spec: TopicRawSpec): Topic {
  const mcq = generateMCQForTopic(courseId, spec.topicNumber, spec.title, spec.expectedExerciseOutput);
  const blankStarter = generateBlankStarterCode(courseId, spec.title, spec.topicNumber);

  return {
    id: `${courseId}-${spec.topicNumber}`,
    topicNumber: spec.topicNumber,
    courseId,
    unitNumber: spec.unitNumber,
    unitTitle: spec.unitTitle,
    title: spec.title,
    difficulty: spec.difficulty,
    englishExplanation: spec.englishExplanation,
    tamilExplanation: spec.tamilExplanation,
    syntax: spec.syntax,
    codeExample: spec.codeExample,
    expectedOutput: spec.expectedOutput,
    lineByLineExplanation: spec.lineByLineExplanation,
    exercise: {
      id: `ex-${courseId}-${spec.topicNumber}`,
      prompt: spec.exercisePrompt,
      starterCode: blankStarter,
      expectedOutput: spec.expectedExerciseOutput,
      hint: spec.hint,
      explanationOnMistake: spec.explanationOnMistake,
      options: mcq.options,
      correctOptionIndex: mcq.correctIndex,
      mcqQuestion: mcq.question,
      mcqExplanation: mcq.explanation,
      type: 'multiple-choice',
    },
    relatedPracticeQuestion: spec.relatedPracticeQuestion,
    xpReward: 10,
  };
}
