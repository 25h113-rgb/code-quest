# CodeQuest — Level Up Your Coding Skills

**CodeQuest** is a programming education platform built for high school students in **Classes 10, 11, and 12** (CBSE, ICSE/ISC, and State Boards).

It features **300 structured topics** across three foundational languages:
- **Python** (100 topics across 10 units)
- **Java** (100 topics across 10 units)
- **C++** (100 topics across 10 units)

Every topic features bilingual explanations (Plain English and authentic Tamil/Tanglish summaries), live syntax patterns, verified code examples, line-by-line breakdowns for beginner topics, interactive practice exercises, and non-duplicative XP incentives.

---

## 1. Quick Start (Web Application)

The interactive live frontend and local client storage run with Vite and React:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application runs on `http://localhost:3000`.

---

## 2. Django Backend Setup (Windows & VS Code)

If running the Python/Django backend locally on Windows:

### Step 1: Install Python
Ensure Python 3.11 or 3.12 is installed with `Add Python to PATH` checked during installation.
```powershell
python --version
```

### Step 2: Open in Visual Studio Code
Open the project root directory in VS Code.

### Step 3: Create & Activate Virtual Environment
Open PowerShell inside VS Code (`Ctrl + ~`):
```powershell
# Create virtual environment
python -m venv venv

# Activate virtual environment on Windows
.\venv\Scripts\Activate.ps1

# (If script execution is disabled in PowerShell, run once:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser)
```

### Step 4: Install Dependencies
```powershell
pip install --upgrade pip
pip install -r requirements.txt
```

### Step 5: Environment Variables
Copy `.env.example` to `.env`:
```powershell
copy .env.example .env
```

### Step 6: Database Migrations
```powershell
cd backend_django
python manage.py makemigrations
python manage.py migrate
```

### Step 7: Create Superuser
```powershell
python manage.py createsuperuser
```

### Step 8: Run Automated Tests
Execute the automated test suite verifying student models, course access, completion deduplication, and level progression:
```powershell
python manage.py test courses
```

### Step 9: Start Django Server
```powershell
python manage.py runserver 8000
```

---

## 3. Code Practice & Output Validation Architecture

- **Client-Side Output Comparison Engine**: Normalizes carriage returns (`\r\n` to `\n`), trailing spaces, and minor formatting discrepancies.
- **Security & Sandboxing**: Arbitrary student code is not executed unconfined inside server processes. For browser practice, deterministic AST and output stream validation evaluate answers safely.
- **Bilingual Pedagogy**: Students can toggle between English and Tamil/Tanglish explanations with one click on any of the 300 topic pages.

---

## 4. Key Account & Exploration Credentials

To immediately explore pre-populated student progress:
- **Username**: `kavya_s`
- **Password**: `DemoStudent123!`
- **Grade**: Class 11 · Python Focus
- You can also register a brand-new student account directly from the **Sign Up** tab.
