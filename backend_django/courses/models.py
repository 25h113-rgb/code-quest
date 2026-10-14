from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator

class StudentProfile(models.Model):
    CLASS_CHOICES = [
        ('Class 10', 'Class 10'),
        ('Class 11', 'Class 11'),
        ('Class 12', 'Class 12'),
        ('Other', 'Other'),
    ]
    COURSE_CHOICES = [
        ('python', 'Python'),
        ('java', 'Java'),
        ('cpp', 'C++'),
    ]
    LANG_CHOICES = [
        ('English', 'English'),
        ('Tamil/Tanglish', 'Tamil/Tanglish'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=150)
    student_class = models.CharField(max_length=20, choices=CLASS_CHOICES, default='Class 11')
    preferred_course = models.CharField(max_length=20, choices=COURSE_CHOICES, default='python')
    explanation_language = models.CharField(max_length=30, choices=LANG_CHOICES, default='English')
    total_xp = models.PositiveIntegerField(default=0)
    level = models.PositiveIntegerField(default=1)
    streak_days = models.PositiveIntegerField(default=1)
    last_active_date = models.DateField(auto_now=True)

    def calculate_level(self):
        return (self.total_xp // 100) + 1

    def __str__(self):
        return f"{self.user.username} ({self.student_class}) - {self.total_xp} XP"


class Course(models.Model):
    COURSE_SLUGS = [
        ('python', 'Python'),
        ('java', 'Java'),
        ('cpp', 'C++'),
    ]
    slug = models.SlugField(max_length=20, unique=True, choices=COURSE_SLUGS)
    title = models.CharField(max_length=50)
    tagline = models.CharField(max_length=150)
    description = models.TextField()
    total_topics = models.PositiveIntegerField(default=100)

    def __str__(self):
        return self.title


class CourseUnit(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='units')
    unit_number = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(10)])
    name = models.CharField(max_length=120)
    description = models.TextField()
    difficulty = models.CharField(max_length=30)
    start_topic = models.PositiveIntegerField()
    end_topic = models.PositiveIntegerField()

    class Meta:
        unique_together = ('course', 'unit_number')
        ordering = ['course', 'unit_number']

    def __str__(self):
        return f"{self.course.title} - Unit {self.unit_number}: {self.name}"


class Topic(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='topics')
    unit = models.ForeignKey(CourseUnit, on_delete=models.CASCADE, related_name='topics')
    topic_number = models.PositiveIntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)])
    title = models.CharField(max_length=150)
    difficulty = models.CharField(max_length=30)
    english_explanation = models.TextField()
    tamil_explanation = models.TextField()
    syntax = models.TextField(blank=True, null=True)
    code_example = models.TextField()
    expected_output = models.TextField()
    related_practice_question = models.TextField()
    xp_reward = models.PositiveIntegerField(default=10)

    class Meta:
        unique_together = ('course', 'topic_number')
        ordering = ['course', 'topic_number']

    def __str__(self):
        return f"{self.course.slug.upper()} #{self.topic_number}: {self.title}"


class PracticeExercise(models.Model):
    topic = models.OneToOneField(Topic, on_delete=models.CASCADE, related_name='exercise')
    prompt = models.TextField()
    starter_code = models.TextField()
    expected_output = models.TextField()
    hint = models.TextField()
    explanation_on_mistake = models.TextField()
    xp_reward = models.PositiveIntegerField(default=20)

    def __str__(self):
        return f"Exercise for {self.topic}"


class LessonCompletion(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='completions')
    topic = models.ForeignKey(Topic, on_delete=models.CASCADE)
    completed_at = models.DateTimeField(auto_now_add=True)
    xp_awarded = models.PositiveIntegerField(default=10)

    class Meta:
        unique_together = ('student', 'topic')

    def __str__(self):
        return f"{self.student.user.username} completed {self.topic}"


class ExerciseAttempt(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='exercise_attempts')
    exercise = models.ForeignKey(PracticeExercise, on_delete=models.CASCADE)
    submitted_code = models.TextField()
    is_correct = models.BooleanField(default=False)
    attempted_at = models.DateTimeField(auto_now_add=True)
    xp_awarded = models.PositiveIntegerField(default=0)


class XpTransaction(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='xp_transactions')
    amount = models.PositiveIntegerField()
    description = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.user.username} +{self.amount} XP: {self.description}"


class Achievement(models.Model):
    slug = models.SlugField(unique=True)
    title = models.CharField(max_length=100)
    description = models.TextField()
    tier = models.CharField(max_length=20, default='bronze')
    category = models.CharField(max_length=30, default='milestone')
    required_topics_count = models.PositiveIntegerField(default=0)
    required_xp = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title


class EarnedAchievement(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='earned_achievements')
    achievement = models.ForeignKey(Achievement, on_delete=models.CASCADE)
    unlocked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'achievement')
