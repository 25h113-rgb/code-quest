from django.test import TestCase
from django.contrib.auth.models import User
from .models import StudentProfile, Course, CourseUnit, Topic, PracticeExercise, LessonCompletion, XpTransaction

class CodeQuestCoreTests(TestCase):
    def setUp(self):
        # Create test student
        self.user = User.objects.create_user(username='teststudent', password='SecurePass123!')
        self.profile = StudentProfile.objects.create(
            user=self.user,
            full_name='Test Student',
            student_class='Class 11',
            preferred_course='python',
            total_xp=0,
            level=1
        )
        # Create Python course and Unit 1
        self.course = Course.objects.create(
            slug='python',
            title='Python',
            tagline='Learn to Code. Play to Win.',
            description='100 topics python course',
            total_topics=100
        )
        self.unit = CourseUnit.objects.create(
            course=self.course,
            unit_number=1,
            name='Fundamentals',
            description='Basics',
            difficulty='Beginner',
            start_topic=1,
            end_topic=10
        )
        self.topic = Topic.objects.create(
            course=self.course,
            unit=self.unit,
            topic_number=1,
            title='Introduction to Programming',
            difficulty='Beginner',
            english_explanation='Computational logic.',
            tamil_explanation='கணினி அடிப்படைகள்.',
            code_example='print("Hello")',
            expected_output='Hello',
            related_practice_question='Why code?',
            xp_reward=10
        )
        self.exercise = PracticeExercise.objects.create(
            topic=self.topic,
            prompt='Print Hello',
            starter_code='print("Hello")',
            expected_output='Hello',
            hint='Use print()',
            explanation_on_mistake='Check syntax',
            xp_reward=20
        )

    def test_student_profile_creation(self):
        self.assertEqual(self.profile.user.username, 'teststudent')
        self.assertEqual(self.profile.level, 1)
        self.assertEqual(self.profile.total_xp, 0)

    def test_lesson_completion_and_xp_award(self):
        completion = LessonCompletion.objects.create(
            student=self.profile,
            topic=self.topic,
            xp_awarded=10
        )
        self.profile.total_xp += 10
        self.profile.level = self.profile.calculate_level()
        self.profile.save()

        self.assertEqual(self.profile.total_xp, 10)
        self.assertEqual(self.profile.level, 1)

    def test_duplicate_completion_prevention(self):
        LessonCompletion.objects.create(
            student=self.profile,
            topic=self.topic,
            xp_awarded=10
        )
        # Attempting duplicate completion should violate unique_together
        with self.assertRaises(Exception):
            LessonCompletion.objects.create(
                student=self.profile,
                topic=self.topic,
                xp_awarded=10
            )

    def test_level_progression_calculation(self):
        self.profile.total_xp = 250
        self.assertEqual(self.profile.calculate_level(), 3)
