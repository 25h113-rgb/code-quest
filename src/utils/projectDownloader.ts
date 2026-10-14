import JSZip from 'jszip';

export async function downloadProjectZip(): Promise<void> {
  const zip = new JSZip();

  // Root files
  zip.file(
    'README.md',
    `# CodeQuest — Level Up Your Coding Skills\n\nComprehensive programming education platform for Python, Java, and C++ with 300 structured topics, interactive practice exercises, and achievement tracking.\n\n## Quick Start\n\`\`\`bash\nnpm install\nnpm run dev\n\`\`\`\n\n## Django Backend\n\`\`\`bash\ncd backend_django\npython -m venv venv\nsource venv/bin/activate  # or venv\\Scripts\\activate on Windows\npip install -r requirements.txt\npython manage.py migrate\npython manage.py test courses\npython manage.py runserver\n\`\`\`\n`
  );

  zip.file(
    'requirements.txt',
    `Django>=5.0,<5.2\ndjangorestframework>=3.15.0\npython-dotenv>=1.0.1\ndjango-cors-headers>=4.3.1\npytest-django>=4.8.0\n`
  );

  zip.file(
    'package.json',
    JSON.stringify(
      {
        name: 'codequest',
        version: '1.0.0',
        scripts: {
          dev: 'vite --port=3000',
          build: 'vite build',
          preview: 'vite preview',
        },
        dependencies: {
          react: '^19.0.1',
          'react-dom': '^19.0.1',
          'lucide-react': '^0.546.0',
          jszip: '^3.10.1',
        },
      },
      null,
      2
    )
  );

  // Django files
  const djangoFolder = zip.folder('backend_django');
  if (djangoFolder) {
    djangoFolder.file(
      'manage.py',
      `#!/usr/bin/env python\nimport os\nimport sys\n\ndef main():\n    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'codequest_project.settings')\n    from django.core.management import execute_from_command_line\n    execute_from_command_line(sys.argv)\n\nif __name__ == '__main__':\n    main()\n`
    );

    const coursesApp = djangoFolder.folder('courses');
    if (coursesApp) {
      coursesApp.file('__init__.py', '');
      coursesApp.file(
        'models.py',
        `from django.db import models\nfrom django.contrib.auth.models import User\n\nclass StudentProfile(models.Model):\n    user = models.OneToOneField(User, on_delete=models.CASCADE)\n    full_name = models.CharField(max_length=150)\n    total_xp = models.PositiveIntegerField(default=0)\n    level = models.PositiveIntegerField(default=1)\n\nclass Topic(models.Model):\n    course_slug = models.CharField(max_length=20)\n    topic_number = models.PositiveIntegerField()\n    title = models.CharField(max_length=150)\n`
      );
      coursesApp.file(
        'tests.py',
        `from django.test import TestCase\nfrom django.contrib.auth.models import User\nfrom .models import StudentProfile\n\nclass CodeQuestTests(TestCase):\n    def test_student_profile(self):\n        user = User.objects.create_user(username='student', password='password123')\n        profile = StudentProfile.objects.create(user=user, full_name='Student User', total_xp=100)\n        self.assertEqual(profile.total_xp, 100)\n`
      );
    }
  }

  // Generate ZIP blob and trigger browser download
  const content = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(content);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'CodeQuest-Master-Project.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
