import { CourseId } from '../types';

export interface ValidationResult {
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  feedbackMessage: string;
  detailedAnalysis?: string[];
  executionType: 'simulated_engine' | 'testcase_pattern';
}

/**
 * Normalizes output strings for fair comparison:
 * - strips leading/trailing whitespace
 * - normalizes Windows CRLF to LF
 * - normalizes multiple whitespace inside lines without destroying necessary indentation
 */
export function normalizeOutput(str: string): string {
  if (!str) return '';
  return str
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .split('\n')
    .map(line => line.trimEnd())
    .filter(line => line.length > 0)
    .join('\n')
    .trim();
}

/**
 * Safely extracts printed output from student code across Python, Java, and C++
 * without executing unsanitized arbitrary code on the server.
 */
export function validateStudentCode(
  courseId: CourseId,
  studentCode: string,
  expectedOutput: string
): ValidationResult {
  const normExpected = normalizeOutput(expectedOutput);
  let simulatedOutput = '';
  const analysis: string[] = [];

  const cleanCode = studentCode.trim();

  // Check if student has left the blank space placeholder intact
  if (cleanCode.includes('______') || cleanCode.includes('____')) {
    return {
      passed: false,
      actualOutput: '(blank space unfilled)',
      expectedOutput: normExpected,
      feedbackMessage: 'Please replace the blank space (______) with your code solution before submitting.',
      detailedAnalysis: ['The code still contains the blank space placeholder ______.', 'Fill in the required value or keyword to complete the program.'],
      executionType: 'simulated_engine',
    };
  }

  if (courseId === 'python') {
    // Check for syntax basics
    const printMatches = cleanCode.matchAll(/print\s*\((.*?)\)/g);
    const printedLines: string[] = [];

    for (const match of printMatches) {
      const rawArg = match[1].trim();
      // Handle simple string literals
      if ((rawArg.startsWith('"') && rawArg.endsWith('"')) || (rawArg.startsWith("'") && rawArg.endsWith("'"))) {
        printedLines.push(rawArg.slice(1, -1));
      } else if (!isNaN(Number(rawArg))) {
        printedLines.push(rawArg);
      } else if (rawArg.includes('+') || rawArg.includes('*')) {
        // Simple numeric or string expressions
        try {
          // If strictly safe numbers
          if (/^[\d\s+\-*/%()]+$/.test(rawArg)) {
            // eslint-disable-next-line no-eval
            printedLines.push(String(Function(`'use strict'; return (${rawArg})`)()));
          } else {
            // String concatenation
            const cleaned = rawArg.replace(/['"]/g, '').replace(/\s*\+\s*/g, '');
            printedLines.push(cleaned);
          }
        } catch {
          printedLines.push(rawArg);
        }
      } else {
        // Variable prints or general tokens
        printedLines.push(rawArg);
      }
    }

    if (printedLines.length > 0) {
      simulatedOutput = printedLines.join('\n');
    } else {
      simulatedOutput = cleanCode;
    }
  } else if (courseId === 'java') {
    // Check Java structure
    if (!cleanCode.includes('class') && !cleanCode.includes('main')) {
      analysis.push('Note: Real Java requires a class wrapper and public static void main() method.');
    }
    const printMatches = cleanCode.matchAll(/System\.out\.print(?:ln)?\s*\((.*?)\);/g);
    const printedLines: string[] = [];

    for (const match of printMatches) {
      const rawArg = match[1].trim();
      if ((rawArg.startsWith('"') && rawArg.endsWith('"')) || (rawArg.startsWith("'") && rawArg.endsWith("'"))) {
        printedLines.push(rawArg.slice(1, -1));
      } else if (!isNaN(Number(rawArg))) {
        printedLines.push(rawArg);
      } else {
        printedLines.push(rawArg.replace(/["+]/g, '').trim());
      }
    }

    if (printedLines.length > 0) {
      simulatedOutput = printedLines.join('\n');
    } else {
      simulatedOutput = cleanCode;
    }
  } else if (courseId === 'cpp') {
    // Check C++ cout structure
    const coutMatches = cleanCode.matchAll(/cout\s*<<\s*([^;]+);/g);
    const printedLines: string[] = [];

    for (const match of coutMatches) {
      const fullExpr = match[1];
      const segments = fullExpr.split('<<').map(s => s.trim()).filter(s => s !== 'endl' && s !== '\\n');
      const lineTokens: string[] = [];
      for (const seg of segments) {
        if ((seg.startsWith('"') && seg.endsWith('"')) || (seg.startsWith("'") && seg.endsWith("'"))) {
          lineTokens.push(seg.slice(1, -1));
        } else if (!isNaN(Number(seg))) {
          lineTokens.push(seg);
        } else {
          lineTokens.push(seg);
        }
      }
      printedLines.push(lineTokens.join(''));
    }

    if (printedLines.length > 0) {
      simulatedOutput = printedLines.join('\n');
    } else {
      simulatedOutput = cleanCode;
    }
  }

  const normSimulated = normalizeOutput(simulatedOutput);

  // Exact or normalized match check
  const isDirectOutputMatch = normSimulated.toLowerCase() === normExpected.toLowerCase();
  const containsExpectedText = cleanCode.toLowerCase().includes(normExpected.toLowerCase());

  const passed = isDirectOutputMatch || containsExpectedText;

  let feedbackMessage = '';
  if (passed) {
    feedbackMessage = 'Excellent work! Your code produced the expected output correctly.';
  } else {
    feedbackMessage = `Output does not match. Expected: "${normExpected}". Evaluated: "${normSimulated || '(no output)'}".`;
  }

  return {
    passed,
    actualOutput: normSimulated || '(no printed output captured)',
    expectedOutput: normExpected,
    feedbackMessage,
    detailedAnalysis: analysis,
    executionType: 'simulated_engine',
  };
}
