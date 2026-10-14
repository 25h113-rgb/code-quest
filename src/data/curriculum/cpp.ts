import { Topic } from '../../types';
import { createTopic, TopicRawSpec } from './builder';

export const CPP_TOPIC_NAMES: string[] = [
  "Introduction to C++", "Applications of C++", "Installing a C++ Compiler", "Setting Up VS Code", "Your First C++ Program",
  "Understanding main()", "#include and Header Files", "cout", "Comments", "Compiling and Running C++",
  "Variables", "Naming Rules", "int and long", "float and double", "char and bool",
  "Constants", "Type Conversion", "auto Keyword", "cin Input", "Output Formatting",
  "Arithmetic Operators", "Relational Operators", "Logical Operators", "Assignment Operators", "Increment and Decrement",
  "Bitwise Operators", "Ternary Operator", "Operator Precedence", "Expressions", "Operator Practice",
  "if Statements", "if-else Statements", "else-if Chains", "switch Statements", "for Loops",
  "while Loops", "do-while Loops", "break and continue", "Nested Loops", "Pattern Printing",
  "Arrays", "Array Traversal", "Multidimensional Arrays", "std::string", "String Operations",
  "C-Style Strings", "Function Declaration", "Function Definition", "Pass by Value and Reference", "Function Overloading",
  "Scope and Lifetime", "References", "Pointers", "Null Pointers", "Pointer Arithmetic",
  "Pointers and Arrays", "Dynamic Memory Concepts", "new and delete", "Stack and Heap", "Memory Safety Fundamentals",
  "Classes and Objects", "Constructors", "Destructors", "this Pointer", "Encapsulation",
  "Inheritance", "Polymorphism", "Virtual Functions", "Abstract Classes", "Operator Overloading",
  "Introduction to STL", "std::vector", "std::array", "std::list", "std::deque",
  "std::stack", "std::queue", "std::set and std::map", "Iterators and Algorithms", "Templates",
  "Function Templates", "Class Templates", "Lambda Expressions", "Smart Pointers", "RAII",
  "Exception Handling", "File Streams", "Namespaces", "const Correctness", "Move Semantics",
  "Copy and Move Constructors", "Modern C++ Features", "C++17 and C++20 Overview", "Basic Concurrency", "Data Structures",
  "Algorithms and Big-O", "Debugging and Unit Testing", "Build a Console Application", "Problem-Solving Practice", "Final C++ Capstone Project"
];

const UNIT_NAMES = [
  "Fundamentals", "Variables and Data Types", "Operators", "Conditions and Loops", "Arrays, Strings, and Functions",
  "Pointers and Memory", "Object-Oriented Programming", "Standard Template Library", "Advanced C++", "Professional Skills and Projects"
];

function getDifficulty(topicNum: number): 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced' | 'Expert' {
  if (topicNum <= 20) return 'Beginner';
  if (topicNum <= 40) return 'Elementary';
  if (topicNum <= 70) return 'Intermediate';
  if (topicNum <= 90) return 'Advanced';
  return 'Expert';
}

export const cppTopics: Topic[] = CPP_TOPIC_NAMES.map((title, idx) => {
  const topicNum = idx + 1;
  const unitNum = Math.floor(idx / 10) + 1;
  const unitTitle = UNIT_NAMES[unitNum - 1];
  const difficulty = getDifficulty(topicNum);

  let englishExplanation = `Welcome to C++ Topic ${topicNum}: ${title}. In this topic, we master how C++ gives programmers direct control over memory, speed, and algorithmic architecture.`;
  let tamilExplanation = `C++ தலைப்பு ${topicNum}: ${title}. C++ என்பது அதிவேக கணினி பயன்பாடுகள் மற்றும் competitive programming-க்கு மிகச் சிறந்த மொழியாகும்.`;
  let syntax = `// C++ syntax for ${title}\n#include <iostream>\n\nint main() {\n    // logic\n    return 0;\n}`;
  let codeExample = `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "C++ Topic ${topicNum}: ${title}" << endl;\n    return 0;\n}`;
  let expectedOutput = `C++ Topic ${topicNum}: ${title}`;
  let starterCode = `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Fill in the blank space (______) to complete the solution:\n    cout << ______ << endl;\n    return 0;\n}`;
  let exercisePrompt = `Write the C++ statement to print 'C++ Topic ${topicNum} passed'.`;
  let expectedExerciseOutput = `C++ Topic ${topicNum} passed`;
  let hint = `Remember std::cout << "..." << std::endl; and return 0; in main().`;
  let explanationOnMistake = `Ensure you replace the blank with "C++ Topic ${topicNum} passed" in quotes.`;
  let relatedPracticeQuestion = `How does ${title} optimize runtime efficiency compared to managed runtimes?`;
  let lineByLineExplanation: { line: string; explanation: string }[] | undefined = [
    { line: `#include <iostream>`, explanation: "Preprocessor directive that imports standard input/output stream capabilities." },
    { line: `using namespace std;`, explanation: "Allows direct use of symbols from the standard namespace without std:: prefix." },
    { line: `int main() { ... }`, explanation: "Mandatory operating system entry point returning an exit code integer." }
  ];

  if (topicNum === 1) {
    englishExplanation = "C++ was designed by Bjarne Stroustrup at Bell Labs starting in 1979 as an extension of C with classes. It provides zero-overhead abstractions, deterministic resource management, and raw hardware speed.";
    tamilExplanation = "C++ என்பது 1979 இல் Bjarne Stroustrup என்பவரால் C மொழியின் நீட்சியாக உருவாக்கப்பட்டது. மெமரி கட்டுப்பாடு மற்றும் அதீத வேகம் இதன் தனிச்சிறப்பு.";
    syntax = "#include <iostream>\n\nint main() {\n    std::cout << \"Hello!\" << std::endl;\n    return 0;\n}";
    codeExample = "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Welcome to CodeQuest C++!\" << endl;\n    cout << \"High performance and systems power.\" << endl;\n    return 0;\n}";
    expectedOutput = "Welcome to CodeQuest C++!\nHigh performance and systems power.";
    exercisePrompt = "Write a C++ program that prints 'Hello C++ World!'.";
    starterCode = "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello C++ World!\" << endl;\n    return 0;\n}";
    expectedExerciseOutput = "Hello C++ World!";
    hint = "Use cout << \"Hello C++ World!\" << endl; inside main().";
    explanationOnMistake = "Make sure you include <iostream> and end statements with semicolons.";
    relatedPracticeQuestion = "Why is C++ favored for game engines, browsers, and high-frequency trading systems?";
  } else if (topicNum === 5) {
    englishExplanation = "Your first C++ program demonstrates the preprocessor #include <iostream>, the int main() entry function, and stream output using cout and the stream insertion operator (<<).";
    tamilExplanation = "உங்கள் முதல் C++ நிரல் #include மூலம் iostream-ஐ இணைத்து, main() வழியாக cout மற்றும் << பயன்படுத்தி console-ல் எழுத்துக்களை காட்டும்.";
    syntax = "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\\n\";\n    return 0;\n}";
    codeExample = "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}";
    expectedOutput = "Hello, World!";
    exercisePrompt = "Print 'Hello, World!' to the console in C++.";
    starterCode = "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"Hello, World!\" << endl;\n    return 0;\n}";
    expectedExerciseOutput = "Hello, World!";
    hint = "Use cout << \"Hello, World!\" << endl;";
    explanationOnMistake = "Ensure stream operator << points to the left towards cout.";
    relatedPracticeQuestion = "What does returning 0 from main() indicate to the operating system?";
  } else if (topicNum === 8) {
    englishExplanation = "std::cout (character output stream) outputs formatted text to standard output. The insertion operator (<<) chains multiple values, variables, and formatting manipulators like endl or '\\n'.";
    tamilExplanation = "std::cout என்பது screen-ல் output கொண்டு வர உதவும். << என்ற insertion operator மூலம் எண்களையும் சொற்களையும் தொடர்ச்சியாக print செய்யலாம்.";
    syntax = "cout << item1 << item2 << endl;";
    codeExample = "#include <iostream>\nusing namespace std;\n\nint main() {\n    int mark = 98;\n    cout << \"Score: \" << mark << \" / 100\" << endl;\n    return 0;\n}";
    expectedOutput = "Score: 98 / 100";
    exercisePrompt = "Print the number 75 using cout.";
    starterCode = "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << 75 << endl;\n    return 0;\n}";
    expectedExerciseOutput = "75";
    hint = "Pass 75 to cout: cout << 75 << endl;";
    explanationOnMistake = "Ensure you output the number 75 without quotes or with proper formatting.";
    relatedPracticeQuestion = "What is the performance difference between endl and '\\n' in C++ streams?";
  } else if (topicNum === 11) {
    englishExplanation = "Variables in C++ are explicitly typed storage locations in RAM. You must declare the variable type before assigning or manipulating values.";
    tamilExplanation = "C++ மொழியில் variables என்பது RAM-ல் உள்ள நினைவக பகுதிகள். பயன்பாட்டிற்கு முன் அதன் data type-ஐ கட்டாயம் குறிப்பிட வேண்டும்.";
    syntax = "type variable_name = value;";
    codeExample = "#include <iostream>\nusing namespace std;\n\nint main() {\n    int age = 17;\n    float gpa = 3.9f;\n    char section = 'B';\n    cout << \"Student \" << age << \"y Section \" << section << endl;\n    return 0;\n}";
    expectedOutput = "Student 17y Section B";
    exercisePrompt = "Declare an integer variable x with value 50 and print it.";
    starterCode = "#include <iostream>\nusing namespace std;\n\nint main() {\n    int x = 50;\n    cout << x << endl;\n    return 0;\n}";
    expectedExerciseOutput = "50";
    hint = "Type int x = 50; and then cout << x << endl;";
    explanationOnMistake = "Ensure you end the declaration with a semicolon.";
    relatedPracticeQuestion = "How does static typing prevent runtime errors in C++?";
  } else if (topicNum === 53) {
    englishExplanation = "A pointer is a variable that stores the memory address of another variable. The address-of operator (&) extracts an address, and the dereference operator (*) accesses the value stored at that address.";
    tamilExplanation = "Pointer என்பது மற்றொரு variable-ன் memory முகவரியை (address) சேமிக்கும் ஒரு சிறப்பு variable. & முகவரியை அறியவும், * அந்த முகவரியில் உள்ள மதிப்பை அறியவும் உதவுகிறது.";
    syntax = "int* ptr = &variable;\nint val = *ptr;";
    codeExample = "#include <iostream>\nusing namespace std;\n\nint main() {\n    int score = 42;\n    int* ptr = &score;\n    cout << \"Value via pointer: \" << *ptr << endl;\n    return 0;\n}";
    expectedOutput = "Value via pointer: 42";
    exercisePrompt = "Dereference pointer ptr pointing to integer 88 and print the value.";
    starterCode = "#include <iostream>\nusing namespace std;\n\nint main() {\n    int val = 88;\n    int* ptr = &val;\n    cout << *ptr << endl;\n    return 0;\n}";
    expectedExerciseOutput = "88";
    hint = "Use *ptr to print the dereferenced value.";
    explanationOnMistake = "Ensure you use the asterisk * before ptr to dereference it.";
    relatedPracticeQuestion = "What happens if you dereference an uninitialized or wild pointer in C++?";
  } else if (topicNum === 72) {
    englishExplanation = "std::vector is a dynamic array in the Standard Template Library (STL). It automatically manages memory, resizing dynamically as elements are pushed back or popped.",
    tamilExplanation = "std::vector என்பது STL-ல் உள்ள ஒரு dynamic array ஆகும். தேவைப்படும்போது இது தானாகவே memory-யை விரிவாக்கிக் கொள்ளும்.";
    syntax = "#include <vector>\nstd::vector<int> numbers;\nnumbers.push_back(10);";
    codeExample = "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {10, 20, 30};\n    nums.push_back(40);\n    cout << \"Size: \" << nums.size() << \", First: \" << nums[0] << endl;\n    return 0;\n}";
    expectedOutput = "Size: 4, First: 10";
    exercisePrompt = "Create a vector with elements 1, 2, 3 and print its size.";
    starterCode = "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> v = {1, 2, 3};\n    cout << v.size() << endl;\n    return 0;\n}";
    expectedExerciseOutput = "3";
    hint = "Use v.size() to print the number of elements in the vector.";
    explanationOnMistake = "Ensure you include <vector> and print v.size().";
    relatedPracticeQuestion = "How does vector geometric reallocation (doubling capacity) provide amortized O(1) push_back?";
  } else if (topicNum === 100) {
    englishExplanation = "Congratulations on reaching Topic 100 of the C++ Course! In this capstone project, you combine low-level pointers, references, object-oriented class hierarchies, templates, and the STL into a high-throughput Algorithmic Trading and Order Book simulator.";
    tamilExplanation = "வாழ்த்துகள்! நீங்கள் C++ மொழியின் 100 பாடங்களையும் வெற்றிகரமாக நிறைவு செய்துள்ளீர்கள். இந்த Capstone Project-ல் Pointers, OOP, Templates மற்றும் STL அனைத்தையும் பயன்படுத்தி ஒரு முழுமையான பயன்பாட்டை உருவாக்குவீர்கள்.";
    syntax = "// Final C++ Capstone Project\n// High performance algorithmic core";
    codeExample = "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"C++ Course 100% Completed!\" << endl;\n    cout << \"Systems and Algorithmic C++ Mastery Achieved.\" << endl;\n    return 0;\n}";
    expectedOutput = "C++ Course 100% Completed!\nSystems and Algorithmic C++ Mastery Achieved.";
    exercisePrompt = "Print 'C++ Course 100% Completed!' to finalize your C++ curriculum.";
    starterCode = "#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << \"C++ Course 100% Completed!\" << endl;\n    return 0;\n}";
    expectedExerciseOutput = "C++ Course 100% Completed!";
    hint = "Output 'C++ Course 100% Completed!' with cout.";
    explanationOnMistake = "Ensure matching output string.";
    relatedPracticeQuestion = "How will you utilize C++ in competitive programming or high-performance systems engineering?";
  } else {
    englishExplanation = `In C++ Topic ${topicNum} ("${title}"), we study how C++ implements ${title.toLowerCase()}. Part of Unit ${unitNum} (${unitTitle}), this is key to high-performance logic.`;
    tamilExplanation = `C++ தலைப்பு ${topicNum} ("${title}"): Unit ${unitNum} (${unitTitle})-ல் உள்ள இந்த C++ பகுதியை நாம் விவரமாக கற்று கொள்கிறோம்.`;
    syntax = `// Syntax for C++ ${title}\nint result = 0;`;
    codeExample = `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "C++ Topic ${topicNum}: ${title}" << endl;\n    int val = ${topicNum};\n    cout << "Index verified: " << val << endl;\n    return 0;\n}`;
    expectedOutput = `C++ Topic ${topicNum}: ${title}\nIndex verified: ${topicNum}`;
    exercisePrompt = `Write code demonstrating ${title} that prints 'C++ Topic ${topicNum} passed'.`;
    starterCode = `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "C++ Topic ${topicNum} passed" << endl;\n    return 0;\n}`;
    expectedExerciseOutput = `C++ Topic ${topicNum} passed`;
    hint = `Review C++ syntax for ${title} and return 0.`;
    explanationOnMistake = `Ensure cout outputs 'C++ Topic ${topicNum} passed' and ends with semicolon.`;
    relatedPracticeQuestion = `Where is ${title} applied in competitive algorithms and school exams?`;
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

  return createTopic('cpp', spec);
});
