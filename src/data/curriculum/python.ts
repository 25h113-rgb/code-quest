import { Topic } from '../../types';
import { createTopic, TopicRawSpec } from './builder';

export const PYTHON_TOPIC_NAMES: string[] = [
  "Introduction to Programming", "What Is Python?", "Installing Python", "Setting Up VS Code", "Your First Python Program",
  "Python Syntax", "print() Function", "Comments", "Indentation", "Running Python Programs",
  "Variables", "Variable Naming Rules", "Numeric Data Types", "Strings", "Boolean Values",
  "Type Checking", "Type Conversion", "Multiple Assignment", "Constants and Naming Conventions", "Basic Input and Output",
  "Arithmetic Operators", "Comparison Operators", "Logical Operators", "Assignment Operators", "Membership Operators",
  "Identity Operators", "Operator Precedence", "Augmented Assignment", "Expressions", "Operator Practice Problems",
  "if Statements", "if-else Statements", "if-elif-else", "Nested Conditions", "for Loops",
  "while Loops", "range()", "break", "continue and pass", "Nested Loops",
  "String Indexing", "String Slicing", "String Methods", "Lists", "List Indexing and Slicing",
  "List Methods", "Tuples", "Sets", "Dictionaries", "Collection Iteration",
  "Defining Functions", "Function Parameters", "Return Values", "Default Arguments", "Keyword Arguments",
  "Variable-Length Arguments", "Scope of Variables", "Lambda Functions", "Recursion", "Function Practice Problems",
  "List Comprehensions", "Dictionary Comprehensions", "Sorting Collections", "enumerate()", "zip()",
  "map()", "filter()", "Iterators", "Generators", "Modules and Imports",
  "Built-in Modules", "Creating Custom Modules", "File Handling", "Reading Files", "Writing Files",
  "Working with JSON", "Exception Handling", "try-except-finally", "Raising Exceptions", "Debugging Python Programs",
  "Classes and Objects", "Constructors", "Instance Attributes", "Instance and Class Methods", "Encapsulation",
  "Inheritance", "Polymorphism", "Method Overriding", "Special Methods", "Object-Oriented Practice",
  "Type Hints", "Decorators", "Context Managers", "Regular Expressions", "Virtual Environments and pip",
  "Unit Testing", "Algorithm Fundamentals", "Data Structures and Complexity", "Build a Command-Line Project", "Final Python Capstone Project"
];

const UNIT_NAMES = [
  "Fundamentals", "Variables and Data Types", "Operators", "Conditions and Loops", "Strings and Collections",
  "Functions", "Intermediate Python", "Files and Error Handling", "Object-Oriented Programming", "Advanced Skills and Projects"
];

function getDifficulty(topicNum: number): 'Beginner' | 'Elementary' | 'Intermediate' | 'Advanced' | 'Expert' {
  if (topicNum <= 20) return 'Beginner';
  if (topicNum <= 40) return 'Elementary';
  if (topicNum <= 70) return 'Intermediate';
  if (topicNum <= 90) return 'Advanced';
  return 'Expert';
}

// Generate the complete set of 100 topics with customized educational content
export const pythonTopics: Topic[] = PYTHON_TOPIC_NAMES.map((title, idx) => {
  const topicNum = idx + 1;
  const unitNum = Math.floor(idx / 10) + 1;
  const unitTitle = UNIT_NAMES[unitNum - 1];
  const difficulty = getDifficulty(topicNum);

  let englishExplanation = `Welcome to Topic ${topicNum}: ${title}. In this topic, we examine how Python handles this core concept. Python is designed for readability and expressive clarity, making it ideal for Class 10-12 computer science curricula.`;
  let tamilExplanation = `தலைப்பு ${topicNum}: ${title}. இந்த தலைப்பில் நாம் இந்த முக்கிய கருத்துருவை பற்றி கற்றுக்கொள்வோம். Python மிக எளிமையான syntax கொண்டதால் படிக்கவும் எழுதவும் சுலபமாக இருக்கும்.`;
  let syntax = `# Syntax for ${title}\nexample_expression = ...`;
  let codeExample = `# Topic ${topicNum}: ${title}\nprint("Learning Python: ${title}")\nval = 100\nprint("Status: Active, Value:", val)`;
  let expectedOutput = `Learning Python: ${title}\nStatus: Active, Value: 100`;
  let starterCode = `# Write code for ${title}\nprint("Hello CodeQuest")`;
  let exercisePrompt = `Demonstrate understanding of ${title}. Write Python code that prints the required output.`;
  let expectedExerciseOutput = `Hello CodeQuest`;
  let hint = `Remember standard Python syntax and check your indentation carefully.`;
  let explanationOnMistake = `Ensure correct quotation marks and proper function spelling.`;
  let relatedPracticeQuestion = `How does ${title} relate to building scalable computational logic?`;
  let lineByLineExplanation: { line: string; explanation: string }[] | undefined = [
    { line: `print("Learning Python: ${title}")`, explanation: "Displays the topic heading clearly to the standard output console." },
    { line: `val = 100`, explanation: "Assigns the integer literal 100 to a variable name." },
    { line: `print("Status: Active, Value:", val)`, explanation: "Prints multiple values separated by commas with automatic space separation." }
  ];

  // Specific high-frequency detailed lessons
  if (topicNum === 1) {
    englishExplanation = "Programming is the process of instructing a computer to perform specific tasks using a sequence of logical operations. In Class 10-12, understanding programming develops algorithmic reasoning, computational thinking, and analytical problem-solving skills.";
    tamilExplanation = "Programming என்பது கணினிக்கு குறிப்பிட்ட வேலைகளை செய்ய வரிசையாக கொடுக்கும் கட்டளைகள் (instructions) ஆகும். Logic மற்றும் analytical சிந்தனையை வளர்க்க இது மிக முக்கியமானது.";
    syntax = "# An instruction tells Python what to do\nprint('Output message')";
    codeExample = "# Your very first instruction to Python\nprint('Welcome to CodeQuest!')\nprint('Coding develops logic and problem solving.')";
    expectedOutput = "Welcome to CodeQuest!\nCoding develops logic and problem solving.";
    exercisePrompt = "Write a Python instruction using print() that displays 'Coding is fun!'.";
    starterCode = "# Fill in the blank space (______) to print the message:\nprint(______)";
    expectedExerciseOutput = "Coding is fun!";
    hint = "Use print() with 'Coding is fun!' inside quotes.";
    explanationOnMistake = "Make sure you replace the blank with 'Coding is fun!' inside quotes.";
    relatedPracticeQuestion = "Why do computers need programming languages instead of natural languages?";
  } else if (topicNum === 2) {
    englishExplanation = "Python is a high-level, interpreted, dynamically typed programming language created by Guido van Rossum in 1991. Its clean, English-like syntax allows developers to write clear, logical code for small scripts up to enterprise systems.";
    tamilExplanation = "Python என்பது 1991 இல் Guido van Rossum என்பவரால் உருவாக்கப்பட்ட high-level, interpreted language. இது சுலபமாக வாசிக்கக்கூடிய ஆங்கில வரிகள் போன்ற syntax கொண்டுள்ளது.";
    syntax = "import sys\nprint(sys.version)";
    codeExample = "language = 'Python'\ncreator = 'Guido van Rossum'\nyear = 1991\nprint(language + ' was created by ' + creator + ' in ' + str(year))";
    expectedOutput = "Python was created by Guido van Rossum in 1991";
    exercisePrompt = "Print the string 'Python is powerful and simple' to the console.";
    starterCode = "# Fill in the blank space (______) to display the sentence:\nprint(______)";
    expectedExerciseOutput = "Python is powerful and simple";
    hint = "Enclose 'Python is powerful and simple' inside quotes in print().";
    explanationOnMistake = "Ensure no typographical errors in the target sentence.";
    relatedPracticeQuestion = "What makes an interpreted language different from a compiled language?";
  } else if (topicNum === 5) {
    englishExplanation = "The traditional first program prints 'Hello, World!' to the console screen. In Python, this requires just a single line without boilerplate classes or header files.";
    tamilExplanation = "எல்லா programming மொழிகளிலும் தொடக்கமாக 'Hello, World!' print செய்வது வழக்கம். Python-ல் ஒரே ஒரு வரியில் இதை செய்யலாம்.";
    syntax = "print('Hello, World!')";
    codeExample = "print('Hello, World!')";
    expectedOutput = "Hello, World!";
    exercisePrompt = "Write a complete Python program that prints 'Hello, World!' exactly as shown.";
    starterCode = "# Fill in the classic greeting inside the blank space:\nprint(______)";
    expectedExerciseOutput = "Hello, World!";
    hint = "Type print('Hello, World!') with quotes.";
    explanationOnMistake = "Check capitalization and punctuation in 'Hello, World!'.";
    relatedPracticeQuestion = "Why does Python not require a class or main() function for simple scripts?";
  } else if (topicNum === 7) {
    englishExplanation = "The print() function sends data to the standard output console. You can print strings, numbers, calculations, and multiple items separated by commas. It automatically inserts a space between items and adds a newline at the end.";
    tamilExplanation = "print() function என்பது screen-ல் output-ஐ display செய்ய உதவும். எண்கள், எழுத்துகள் மற்றும் கணக்குகளை print செய்யலாம். comma வைத்தால் தானாகவே இடைவெளி (space) வரும்.";
    syntax = "print(object, ..., sep=' ', end='\\n')";
    codeExample = "print('Score:', 95)\nprint('Math', 'Science', 'English', sep=' | ')\nprint('End of report.')";
    expectedOutput = "Score: 95\nMath | Science | English\nEnd of report.";
    exercisePrompt = "Print the number 42 on the screen using print().";
    starterCode = "# Fill in the blank space with the number 42:\nprint(______)";
    expectedExerciseOutput = "42";
    hint = "Pass 42 directly into print() without quotes.";
    explanationOnMistake = "Check that you put 42 inside print().";
    relatedPracticeQuestion = "How do the sep and end parameters modify print() behavior?";
  } else if (topicNum === 11) {
    englishExplanation = "Variables are named references in memory used to store data values. In Python, a variable is created the moment you first assign a value to it using the assignment operator (=). No type declaration is needed.";
    tamilExplanation = "Variables என்பது data-வை சேமித்து வைக்க memory-யில் நாம் கொடுக்கும் பெயர். Python-ல் data type முன்னாடியே சொல்ல வேண்டியதில்லை; value கொடுத்த உடனேயே variable உருவாகும்.";
    syntax = "variable_name = value";
    codeExample = "student_name = 'Arun'\nstudent_class = 11\nmarks = 94.5\nprint(student_name, 'is in Class', student_class, 'with', marks, 'marks.')";
    expectedOutput = "Arun is in Class 11 with 94.5 marks.";
    exercisePrompt = "Create a variable named 'score' with the value 100 and print it.";
    starterCode = "# Fill in the blank space to set score to 100:\nscore = ______\nprint(score)";
    expectedExerciseOutput = "100";
    hint = "Assign 100 to score and print(score).";
    explanationOnMistake = "Do not put quotes around 100 or score.";
    relatedPracticeQuestion = "What happens in memory when a Python variable is reassigned to a different data type?";
  } else if (topicNum === 21) {
    englishExplanation = "Arithmetic operators perform mathematical calculations: addition (+), subtraction (-), multiplication (*), float division (/), integer floor division (//), modulus (%), and exponentiation (**).";
    tamilExplanation = "Arithmetic operators கணித செயல்பாடுகளுக்கு பயன்படுகிறது: கூட்டல் (+), கழித்தல் (-), பெருக்கல் (*), வகுத்தல் (/), ஈவு (//), மீதி (%) மற்றும் அடுக்கு (**).";
    syntax = "result = a + b\nresult = a // b\nresult = a % b";
    codeExample = "a = 15\nb = 4\nprint('Sum:', a + b)\nprint('Floor Div:', a // b)\nprint('Remainder:', a % b)\nprint('Power:', 2 ** 3)";
    expectedOutput = "Sum: 19\nFloor Div: 3\nRemainder: 3\nPower: 8";
    exercisePrompt = "Calculate 10 multiplied by 5 and print the result.";
    starterCode = "# Fill in the blank space to multiply 10 by 5:\nprint(10 * ______)";
    expectedExerciseOutput = "50";
    hint = "Use the asterisk * for multiplication in Python.";
    explanationOnMistake = "Ensure you multiply 10 * 5 and print the number 50.";
    relatedPracticeQuestion = "What is the difference between single slash (/) and double slash (//) division in Python?";
  } else if (topicNum === 31) {
    englishExplanation = "The if statement evaluates a Boolean condition. If the condition evaluates to True, the indented block of code directly underneath is executed. If False, the block is skipped.";
    tamilExplanation = "if statement என்பது ஒரு நிபந்தனை சரியா (True) என்று சோதிக்கும். உண்மை என்றால் உள்ளே இருக்கும் code execute ஆகும், இல்லையென்றால் skip ஆகிவிடும்.";
    syntax = "if condition:\n    # indented code block\n    statement";
    codeExample = "marks = 75\nif marks >= 50:\n    print('Passed the examination!')\nprint('Evaluation complete.')";
    expectedOutput = "Passed the examination!\nEvaluation complete.";
    exercisePrompt = "Write an if statement where if x is greater than 5, print 'Greater'. Set x = 10.";
    starterCode = "x = 10\nif x > 5:\n    print('Greater')";
    expectedExerciseOutput = "Greater";
    hint = "Remember the colon : after the condition and indent the print line.";
    explanationOnMistake = "Check the colon after 'if x > 5:' and ensure proper indentation.";
    relatedPracticeQuestion = "Why is indentation mandatory in Python compared to braces in C++ and Java?";
  } else if (topicNum === 35) {
    englishExplanation = "A for loop iterates over a sequence (such as a list, string, or range of numbers). It executes a block of code once for each item in the sequence.";
    tamilExplanation = "for loop என்பது வரிசையாக உள்ள elements (list, string, range) ஒவ்வொன்றையும் எடுத்து ஒன்றன் பின் ஒன்றாக செய்ய உதவுகிறது.";
    syntax = "for item in sequence:\n    statement";
    codeExample = "for num in range(1, 4):\n    print('Count:', num)";
    expectedOutput = "Count: 1\nCount: 2\nCount: 3";
    exercisePrompt = "Write a for loop using range(3) that prints each number from 0 to 2.";
    starterCode = "# Fill in the blank space (______) with 3 to repeat 3 times:\nfor i in range(______):\n    print(i)";
    expectedExerciseOutput = "0\n1\n2";
    hint = "Use range(3) which generates 0, 1, 2.";
    explanationOnMistake = "Replace the blank with 3 so range(3) is called.";
    relatedPracticeQuestion = "How does range(start, stop, step) customize iterations?";
  } else if (topicNum === 44) {
    englishExplanation = "Lists are mutable, ordered collections of elements enclosed in square brackets []. Lists can contain duplicate elements and elements of different data types.";
    tamilExplanation = "Lists என்பது மாற்றக்கூடிய (mutable), வரிசைப்படுத்தப்பட்ட elements கொண்ட தொகுப்பு. சதுர அடைப்புக்குறிக்குள் [] எழுதப்படும்.";
    syntax = "my_list = [item1, item2, item3]";
    codeExample = "subjects = ['Maths', 'Physics', 'Chemistry']\nsubjects.append('Computer Science')\nprint('Total subjects:', len(subjects))\nprint('First subject:', subjects[0])";
    expectedOutput = "Total subjects: 4\nFirst subject: Maths";
    exercisePrompt = "Create a list fruits = ['apple', 'banana'] and print its length using len().";
    starterCode = "# Fill in the blank space (______) with len to find list length:\nfruits = ['apple', 'banana']\nprint(______(fruits))";
    expectedExerciseOutput = "2";
    hint = "Use len(fruits) inside print().";
    explanationOnMistake = "Make sure you replace the blank with len.";
    relatedPracticeQuestion = "Why are Python lists zero-indexed?";
  } else if (topicNum === 51) {
    englishExplanation = "Functions are reusable blocks of code that perform a specific task. In Python, functions are defined using the 'def' keyword followed by the function name and parentheses.";
    tamilExplanation = "Functions என்பது நாம் மீண்டும் மீண்டும் பயன்படுத்தக்கூடிய code blocks ஆகும். Python-ல் 'def' keyword கொண்டு function உருவாக்கப்படுகிறது.";
    syntax = "def function_name(parameters):\n    \"\"\"Docstring\"\"\"\n    return result";
    codeExample = "def greet(name):\n    return 'Hello, ' + name + '!'\n\nmessage = greet('Kavya')\nprint(message)";
    expectedOutput = "Hello, Kavya!";
    exercisePrompt = "Define a function named say_hi that prints 'Hi!' and call it.";
    starterCode = "# Fill in the blank space (______) to print 'Hi!':\ndef say_hi():\n    print(______)\n\nsay_hi()";
    expectedExerciseOutput = "Hi!";
    hint = "Define say_hi() with def and put 'Hi!' in print().";
    explanationOnMistake = "Make sure you replace the blank with 'Hi!'.";
    relatedPracticeQuestion = "What is the importance of modularity and code reuse in software engineering?";
  } else if (topicNum === 81) {
    englishExplanation = "Object-Oriented Programming (OOP) models software around entities called objects, which bundle state (attributes) and behavior (methods). A class serves as the blueprint for creating objects.";
    tamilExplanation = "Object-Oriented Programming (OOP) என்பது நிஜ உலக பொருட்களை போல variables (attributes) மற்றும் functions (methods) ஒன்றாக சேர்த்து class என்ற blueprint மூலம் உருவாக்குவது.";
    syntax = "class ClassName:\n    def __init__(self, arg):\n        self.arg = arg";
    codeExample = "class Student:\n    def __init__(self, name, grade):\n        self.name = name\n        self.grade = grade\n    \n    def display(self):\n        print(self.name + ' - Grade: ' + str(self.grade))\n\ns1 = Student('Deepak', 12)\ns1.display()";
    expectedOutput = "Deepak - Grade: 12";
    exercisePrompt = "Create a simple class Book with a title attribute set to 'CodeQuest Guide' and print its title.";
    starterCode = "# Fill in the blank space (______) with 'CodeQuest Guide':\nclass Book:\n    title = ______\n\nb = Book()\nprint(b.title)";
    expectedExerciseOutput = "CodeQuest Guide";
    hint = "Instantiate the class and access the title property with dot notation.";
    explanationOnMistake = "Replace the blank with 'CodeQuest Guide' inside quotes.";
    relatedPracticeQuestion = "How do classes and objects promote reusability and encapsulation?";
  } else if (topicNum === 100) {
    englishExplanation = "Congratulations on reaching Topic 100! In this final capstone project, you combine variables, loops, collections, modular functions, file handling, and classes to build an end-to-end Student Grade and Achievement Management System.";
    tamilExplanation = "வாழ்த்துகள்! நீங்கள் தலைப்பு 100-ஐ அடைந்துவிட்டீர்கள்! இந்த Capstone Project-ல் நாம் இதுவரை படித்த அனைத்தையும் பயன்படுத்தி ஒரு முழுமையான Student Management System உருவாக்குவோம்.";
    syntax = "# Comprehensive Capstone Architecture\nclass System:\n    pass";
    codeExample = "class CodeQuestMaster:\n    def __init__(self, student):\n        self.student = student\n        self.completed_topics = 100\n    \n    def certify(self):\n        return f'Certificate awarded to {self.student}: Python Mastery Verified!'\n\ngraduate = CodeQuestMaster('Student')\nprint(graduate.certify())";
    expectedOutput = "Certificate awarded to Student: Python Mastery Verified!";
    exercisePrompt = "Print 'Python Course 100% Completed' to celebrate finishing all 100 topics.";
    starterCode = "# Fill in the blank space (______) to print the celebration message:\nprint(______)";
    expectedExerciseOutput = "Python Course 100% Completed";
    hint = "Print the exact completion phrase.";
    explanationOnMistake = "Replace the blank with 'Python Course 100% Completed' inside quotes.";
    relatedPracticeQuestion = "How will you architect your next production Python application?";
  } else {
    // For general topics, generate precise tailored descriptions based on title
    englishExplanation = `In Topic ${topicNum} ("${title}"), we study how ${title.toLowerCase()} functions in Python. This topic is part of Unit ${unitNum} (${unitTitle}), designed to build robust coding competence for school examinations and practical projects.`;
    tamilExplanation = `தலைப்பு ${topicNum} ("${title}"): இந்த பகுதியில் நாம் Python-ல் ${title}-ஐ எப்படி பயன்படுத்துவது என்று விரிவாக பார்க்கிறோம். இது Unit ${unitNum} (${unitTitle})-ன் முக்கிய பகுதியாகும்.`;
    syntax = `# Python syntax for: ${title}\nresult = ...`;
    codeExample = `# Demonstration of ${title}\nprint("Mastering ${title} in Python")\nx = ${topicNum}\nprint(f"Topic {x}: Concept ready")`;
    expectedOutput = `Mastering ${title} in Python\nTopic ${topicNum}: Concept ready`;
    exercisePrompt = `Write code demonstrating ${title} that prints 'Topic ${topicNum} passed'.`;
    starterCode = `# Topic ${topicNum}: ${title}\n# Replace the blank space (______) below with the required string:\nprint(______)`;
    expectedExerciseOutput = `Topic ${topicNum} passed`;
    hint = `Review the syntax for ${title} and test your output.`;
    explanationOnMistake = `Ensure you replace the blank with 'Topic ${topicNum} passed' in quotes.`;
    relatedPracticeQuestion = `Where is ${title} most frequently applied in real-world Python applications?`;
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

  return createTopic('python', spec);
});
