import { Topic } from '../../types';
import { createTopic, TopicRawSpec } from './builder';

export const JAVA_TOPIC_NAMES: string[] = [
  "Introduction to Java", "Java Applications", "Installing the JDK", "Setting Up VS Code", "Your First Java Program",
  "Understanding main()", "Java Syntax", "System.out.println()", "Comments", "Compiling and Running Java",
  "Variables", "Naming Conventions", "Primitive Data Types", "Reference Types", "Literals",
  "Constants and final", "Type Casting", "Strings", "Scanner Input", "Output Formatting",
  "Arithmetic Operators", "Relational Operators", "Logical Operators", "Assignment Operators", "Unary Operators",
  "Increment and Decrement", "Ternary Operator", "Bitwise Operators", "Operator Precedence", "Expression Practice",
  "if Statements", "if-else", "else-if Chains", "Nested Conditions", "switch Statements",
  "for Loops", "while Loops", "do-while Loops", "break and continue", "Nested Loops",
  "Arrays", "Array Initialization", "Array Traversal", "Multidimensional Arrays", "Searching Arrays",
  "Sorting Arrays", "String Methods", "StringBuilder", "String Comparison", "Array and String Problems",
  "Creating Methods", "Parameters and Return Values", "Method Overloading", "Variable Scope", "Classes and Objects",
  "Constructors", "this Keyword", "Static Members", "Access Modifiers", "Packages and Imports",
  "Encapsulation", "Inheritance", "super Keyword", "Polymorphism", "Method Overriding",
  "Abstract Classes", "Interfaces", "Composition", "Object Class", "OOP Practice Problems",
  "Wrapper Classes", "Autoboxing and Unboxing", "ArrayList", "LinkedList", "HashSet",
  "HashMap", "Iterators", "Generics", "Exception Handling", "Custom Exceptions",
  "File Handling", "Java NIO Basics", "Enums", "Records", "Lambda Expressions",
  "Functional Interfaces", "Stream API", "Optional", "Date and Time API", "Multithreading Fundamentals",
  "Synchronization", "Executors and Thread Pools", "Networking Fundamentals", "JDBC Fundamentals", "Database Connectivity",
  "Unit Testing with JUnit", "Data Structures and Algorithms", "Big-O Complexity", "Build a Console Application", "Final Java Capstone Project"
];

const UNIT_NAMES = [
  "Fundamentals", "Variables and Data Types", "Operators", "Control Flow", "Arrays and Strings",
  "Methods and Classes", "Object-Oriented Programming", "Collections and Exceptions", "Advanced Java", "Professional Skills and Projects"
];

function getDifficulty(topicNum: number): 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced' | 'Expert' {
  if (topicNum <= 20) return 'Beginner';
  if (topicNum <= 40) return 'Elementary';
  if (topicNum <= 70) return 'Intermediate';
  if (topicNum <= 90) return 'Advanced';
  return 'Expert';
}

export const javaTopics: Topic[] = JAVA_TOPIC_NAMES.map((title, idx) => {
  const topicNum = idx + 1;
  const unitNum = Math.floor(idx / 10) + 1;
  const unitTitle = UNIT_NAMES[unitNum - 1];
  const difficulty = getDifficulty(topicNum);

  let englishExplanation = `Welcome to Java Topic ${topicNum}: ${title}. In this topic, we delve into how Java's robust, strongly-typed architecture manages this concept. Java is central to ICSE, ISC, and CBSE curricula.`;
  let tamilExplanation = `ஜாவா தலைப்பு ${topicNum}: ${title}. ஜாவா என்பது ஒரு strongly-typed object-oriented language. இந்த பாடத்தில் ${title} பற்றி நாம் விரிவாக கற்கிறோம்.`;
  let syntax = `// Java Syntax for: ${title}\npublic class Main {\n    public static void main(String[] args) {\n        // statement\n    }\n}`;
  let codeExample = `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Java Topic ${topicNum}: ${title}");\n    }\n}`;
  let expectedOutput = `Java Topic ${topicNum}: ${title}`;
  let starterCode = `public class Main {\n    public static void main(String[] args) {\n        // Fill in the blank space (______) to complete the solution:\n        System.out.println(______);\n    }\n}`;
  let exercisePrompt = `Write the Java statement to print 'Java Topic ${topicNum} passed'.`;
  let expectedExerciseOutput = `Java Topic ${topicNum} passed`;
  let hint = `Remember System.out.println() ends with a semicolon in Java.`;
  let explanationOnMistake = `Ensure you replace the blank with "Java Topic ${topicNum} passed" and end with a semicolon.`;
  let relatedPracticeQuestion = `How does Java enforce compile-time safety for ${title}?`;
  let lineByLineExplanation: { line: string; explanation: string }[] | undefined = [
    { line: `public class Main {`, explanation: "Declares a publicly accessible class named Main matching the file compilation unit." },
    { line: `public static void main(String[] args) {`, explanation: "The standard entry point where the JVM begins executing code." },
    { line: `System.out.println(...);`, explanation: "Streams text to standard console followed by a newline separator." }
  ];

  if (topicNum === 1) {
    englishExplanation = "Java is a class-based, object-oriented programming language designed by James Gosling at Sun Microsystems in 1995. Its core design philosophy is 'Write Once, Run Anywhere' (WORA) via bytecode running on the Java Virtual Machine (JVM).";
    tamilExplanation = "Java என்பது 1995 இல் James Gosling என்பவரால் உருவாக்கப்பட்ட class-based object oriented language. JVM மூலம் எந்த OS-லும் இயங்கும் தன்மை கொண்டது (Write Once, Run Anywhere).";
    syntax = "public class Main {\n    public static void main(String[] args) {}\n}";
    codeExample = "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Welcome to CodeQuest Java!\");\n        System.out.println(\"Java runs on billions of devices.\");\n    }\n}";
    expectedOutput = "Welcome to CodeQuest Java!\nJava runs on billions of devices.";
    exercisePrompt = "Write a Java program that prints 'Hello Java World!'.";
    starterCode = "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello Java World!\");\n    }\n}";
    expectedExerciseOutput = "Hello Java World!";
    hint = "Use System.out.println(\"Hello Java World!\"); inside main().";
    explanationOnMistake = "Ensure capitalization of System and String, and remember the ending semicolon.";
    relatedPracticeQuestion = "What role does bytecode play in Java's platform independence?";
  } else if (topicNum === 5) {
    englishExplanation = "Your first Java program consists of a class container and the main() method. Every Java application must have at least one class definition.";
    tamilExplanation = "Java-ல் எழுதப்படும் ஒவ்வொரு code-ம் ஒரு class-க்குள் மட்டுமே இருக்க முடியும். main() method தான் program தொடங்கும் இடம்.";
    syntax = "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}";
    codeExample = "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}";
    expectedOutput = "Hello, World!";
    exercisePrompt = "Print 'Hello, World!' to the console in Java.";
    starterCode = "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}";
    expectedExerciseOutput = "Hello, World!";
    hint = "Notice the exact spelling of System.out.println().";
    explanationOnMistake = "Java is case-sensitive: 'system' with a lowercase s will cause a compiler error.";
    relatedPracticeQuestion = "Why must the filename match the public class name in standard Java compilers?";
  } else if (topicNum === 8) {
    englishExplanation = "System.out.println() is Java's standard console output statement. 'System' is a built-in class in java.lang, 'out' is a static PrintStream field, and 'println' prints the argument and terminates the line.";
    tamilExplanation = "System.out.println() என்பது Java-ல் console output-ஐ பிரிண்ட் செய்யும் வழிமுறை. System என்பது class, out என்பது object, println என்பது method.";
    syntax = "System.out.println(value);\nSystem.out.print(value); // no newline";
    codeExample = "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Class 11 Computer Science\");\n        System.out.println(\"Roll No: \" + 24);\n    }\n}";
    expectedOutput = "Class 11 Computer Science\nRoll No: 24";
    exercisePrompt = "Print the number 100 using System.out.println().";
    starterCode = "public class Main {\n    public static void main(String[] args) {\n        System.out.println(100);\n    }\n}";
    expectedExerciseOutput = "100";
    hint = "Pass 100 directly inside println().";
    explanationOnMistake = "Do not forget the semicolon after the println statement.";
    relatedPracticeQuestion = "What is the difference between System.out.print() and System.out.println()?";
  } else if (topicNum === 13) {
    englishExplanation = "Java has eight primitive data types: byte, short, int, long (integers), float, double (floating-point), char (16-bit Unicode character), and boolean (true/false).";
    tamilExplanation = "Java-ல் 8 primitive data types உள்ளன: byte, short, int, long, float, double, char, மற்றும் boolean. இவை நேரடியாக memory-ல் சேமிக்கப்படும்.";
    syntax = "int age = 17;\ndouble percentage = 92.5;\nboolean isStudent = true;";
    codeExample = "public class Main {\n    public static void main(String[] args) {\n        int age = 16;\n        double marks = 89.5;\n        char grade = 'A';\n        System.out.println(\"Age: \" + age + \", Marks: \" + marks + \", Grade: \" + grade);\n    }\n}";
    expectedOutput = "Age: 16, Marks: 89.5, Grade: A";
    exercisePrompt = "Declare an integer variable count with value 25 and print it.";
    starterCode = "public class Main {\n    public static void main(String[] args) {\n        int count = 25;\n        System.out.println(count);\n    }\n}";
    expectedExerciseOutput = "25";
    hint = "Declare 'int count = 25;' and print count.";
    explanationOnMistake = "Ensure 'int' is in lowercase and the variable name matches.";
    relatedPracticeQuestion = "Why does Java char occupy 2 bytes (16 bits) instead of 1 byte?";
  } else if (topicNum === 36) {
    englishExplanation = "The Java for loop repeats code a predetermined number of times. It consists of three parts separated by semicolons: initialization, condition test, and increment/update step.";
    tamilExplanation = "for loop மூன்று பகுதிகளை கொண்டது: initialization (தொடக்க மதிப்பு), condition (நிபந்தனை), மற்றும் increment (மதிப்பு கூட்டுதல்).";
    syntax = "for (int i = 0; i < n; i++) {\n    // loop body\n}";
    codeExample = "public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 3; i++) {\n            System.out.println(\"Java Step \" + i);\n        }\n    }\n}";
    expectedOutput = "Java Step 1\nJava Step 2\nJava Step 3";
    exercisePrompt = "Write a loop from 1 to 2 that prints 'Pass ' and the index.";
    starterCode = "public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 2; i++) {\n            System.out.println(\"Pass \" + i);\n        }\n    }\n}";
    expectedExerciseOutput = "Pass 1\nPass 2";
    hint = "Use a loop with int i = 1; i <= 2; i++.";
    explanationOnMistake = "Check that your loop terminates at 2.";
    relatedPracticeQuestion = "How does the enhanced for-each loop simplify array iteration in Java?";
  } else if (topicNum === 55) {
    englishExplanation = "In Java, a class encapsulates state (fields) and behavior (methods). An object is an instantiated instance of a class allocated in heap memory using the 'new' keyword.";
    tamilExplanation = "Java-ல் class என்பது blueprint. 'new' keyword மூலம் memory-யில் object உருவாக்கப்படுகிறது. அதில் variables மற்றும் methods இருக்கும்.";
    syntax = "class Student {\n    String name;\n}\nStudent s = new Student();";
    codeExample = "class Student {\n    String name = \"Priya\";\n    int roll = 101;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Student s = new Student();\n        System.out.println(s.name + \" - Roll: \" + s.roll);\n    }\n}";
    expectedOutput = "Priya - Roll: 101";
    exercisePrompt = "Instantiate an object and print its field value 'CodeQuest Java'.";
    starterCode = "class App {\n    String title = \"CodeQuest Java\";\n}\npublic class Main {\n    public static void main(String[] args) {\n        App app = new App();\n        System.out.println(app.title);\n    }\n}";
    expectedExerciseOutput = "CodeQuest Java";
    hint = "Access field using app.title and print it.";
    explanationOnMistake = "Check that you created an instance with new App().";
    relatedPracticeQuestion = "What is the difference between heap memory and stack memory for Java objects?";
  } else if (topicNum === 100) {
    englishExplanation = "Congratulations on completing all 100 Java topics! In this capstone project, you apply OOP design patterns, collections, exception hierarchies, and modular methods to create a high-performance Student Academic Record & Exam Evaluation system.";
    tamilExplanation = "அபாரமான சாதனை! ஜாவாவில் 100 பாடங்களையும் வெற்றிகரமாக முடித்துள்ளீர்கள். இந்த Capstone Project-ல் OOP, Collections மற்றும் Exception handling அனைத்தையும் ஒருங்கிணைப்பீர்கள்.";
    syntax = "// Final Java Capstone System\npublic class Capstone {\n    // Complete architecture\n}";
    codeExample = "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Course 100% Completed!\");\n        System.out.println(\"ICSE/ISC & CBSE Java Core Mastery Achieved.\");\n    }\n}";
    expectedOutput = "Java Course 100% Completed!\nICSE/ISC & CBSE Java Core Mastery Achieved.";
    exercisePrompt = "Print 'Java Course 100% Completed!' to complete your Java curriculum journey.";
    starterCode = "public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Course 100% Completed!\");\n    }\n}";
    expectedExerciseOutput = "Java Course 100% Completed!";
    hint = "Use System.out.println(\"Java Course 100% Completed!\");";
    explanationOnMistake = "Make sure the output string matches exactly.";
    relatedPracticeQuestion = "How do Java 17/21 modern LTS features expand upon traditional class structures?";
  } else {
    englishExplanation = `In Java Topic ${topicNum} ("${title}"), we examine how Java enforces ${title.toLowerCase()}. Part of Unit ${unitNum} (${unitTitle}), this is crucial for building deterministic, type-safe programs.`;
    tamilExplanation = `ஜாவா தலைப்பு ${topicNum} ("${title}"): Unit ${unitNum} (${unitTitle})-ல் இந்த முக்கியமான ஜாவா கருத்தை நடைமுறை உதாரணத்துடன் கற்கிறோம்.`;
    syntax = `// Syntax for ${title}\n// Implemented inside class methods`;
    codeExample = `public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Topic ${topicNum}: ${title}\");\n        int val = ${topicNum};\n        System.out.println(\"Verified index: \" + val);\n    }\n}`;
    expectedOutput = `Java Topic ${topicNum}: ${title}\nVerified index: ${topicNum}`;
    exercisePrompt = `Write code demonstrating ${title} that prints 'Java Topic ${topicNum} passed'.`;
    starterCode = `public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"Java Topic ${topicNum} passed\");\n    }\n}`;
    expectedExerciseOutput = `Java Topic ${topicNum} passed`;
    hint = `Review Java syntax for ${title} and terminate with semicolon.`;
    explanationOnMistake = `Ensure class Main has public static void main and outputs 'Java Topic ${topicNum} passed'.`;
    relatedPracticeQuestion = `Where does ${title} feature in software design and exam question patterns?`;
  }

  const spec: TopicRawSpec = {
    topicNumber: topicNum,
    title,
    unitNumber: unitNum,
    unitTitle,
    difficulty,
    englishExplanation,
    tamilExplanation,
    syntax,
    codeExample,
    expectedOutput,
    lineByLineExplanation,
    exercisePrompt,
    starterCode,
    expectedExerciseOutput,
    hint,
    explanationOnMistake,
    relatedPracticeQuestion,
  };

  return createTopic('java', spec);
});
