import { neon } from '@neondatabase/serverless';
import { User, Course } from '@/types';

const sql = neon(process.env.DATABASE_URL!);

// ─── Create tables on first run ───────────────────────────────
export async function initDB() {
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      enrolled_courses TEXT DEFAULT '[]',
      completed_lessons TEXT DEFAULT '[]',
      created_at TEXT DEFAULT ''
    )
  `;
}

// ─── User helpers ──────────────────────────────────────────────
export async function findUserByEmail(email: string): Promise<User | undefined> {
  await initDB();
  const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
  if (!rows[0]) return undefined;
  return {
    ...rows[0],
    enrolledCourses: JSON.parse(rows[0].enrolled_courses || '[]'),
    completedLessons: JSON.parse(rows[0].completed_lessons || '[]'),
  } as User;
}

export async function findUserById(id: string): Promise<User | undefined> {
  await initDB();
  const rows = await sql`SELECT * FROM users WHERE id = ${id}`;
  if (!rows[0]) return undefined;
  return {
    ...rows[0],
    enrolledCourses: JSON.parse(rows[0].enrolled_courses || '[]'),
    completedLessons: JSON.parse(rows[0].completed_lessons || '[]'),
  } as User;
}

export async function createUser(user: User): Promise<void> {
  await initDB();
  await sql`
    INSERT INTO users (id, name, email, password, enrolled_courses, completed_lessons, created_at)
    VALUES (
      ${user.id},
      ${user.name},
      ${user.email},
      ${user.password},
      ${JSON.stringify(user.enrolledCourses)},
      ${JSON.stringify(user.completedLessons)},
      ${user.createdAt}
    )
  `;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User | null> {
  await initDB();
  if (updates.enrolledCourses !== undefined) {
    await sql`UPDATE users SET enrolled_courses = ${JSON.stringify(updates.enrolledCourses)} WHERE id = ${id}`;
  }
  if (updates.completedLessons !== undefined) {
    await sql`UPDATE users SET completed_lessons = ${JSON.stringify(updates.completedLessons)} WHERE id = ${id}`;
  }
  return (await findUserById(id)) ?? null;
}

// ─── Courses (static, no DB needed) ───────────────────────────
export const courses: Course[] = [
  {
    id: 'course_1',
    title: 'Python for Beginners',
    description: 'Learn Python programming from scratch with hands-on projects.',
    longDescription: 'Start your coding journey with Python — the world\'s most beginner-friendly language. This course takes you from zero to writing real programs, covering variables, loops, functions, and object-oriented programming with fun mini-projects throughout.',
    instructor: 'Dr. Priya Sharma',
    instructorBio: 'IIT Delhi alumna with 10+ years of teaching CS fundamentals.',
    thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg',
    category: 'Programming', level: 'Beginner', duration: '12h 30m',
    lessonsCount: 8, rating: 4.8, studentsCount: 24300, color: '#f97316',
    tags: ['Python', 'Programming', 'Beginner', 'Coding'],
    lessons: [
      { id: 'lesson_1_1', title: 'Introduction to Python', description: 'What is Python and why learn it?', videoId: 'rfscVS0vtbw', duration: '4:26:52', order: 1 },
      { id: 'lesson_1_2', title: 'Variables & Data Types', description: 'Understanding strings, integers, floats and booleans.', videoId: '_uQrJ0TkZlc', duration: '6:14', order: 2 },
      { id: 'lesson_1_3', title: 'Conditionals & Loops', description: 'Control flow with if/else and for/while loops.', videoId: 'DZwmZ8Usvnk', duration: '9:42', order: 3 },
      { id: 'lesson_1_4', title: 'Functions', description: 'Writing reusable code with functions.', videoId: 'NSbOtYzIQI0', duration: '8:15', order: 4 },
      { id: 'lesson_1_5', title: 'Lists & Dictionaries', description: 'Working with Python data structures.', videoId: 'W8KRzm-HUcc', duration: '11:03', order: 5 },
      { id: 'lesson_1_6', title: 'File Handling', description: 'Read and write files with Python.', videoId: 'Uh2ebFW8OYM', duration: '10:22', order: 6 },
      { id: 'lesson_1_7', title: 'Object-Oriented Programming', description: 'Classes, objects, and inheritance.', videoId: 'JeznW_7DlB0', duration: '13:48', order: 7 },
      { id: 'lesson_1_8', title: 'Final Project', description: 'Build a mini project using everything you\'ve learned.', videoId: 'SqvVm3QiQVk', duration: '22:10', order: 8 },
    ],
  },
  {
    id: 'course_2',
    title: 'Mathematics Fundamentals',
    description: 'Master algebra, geometry, and calculus concepts with visual explanations.',
    longDescription: 'Build a rock-solid math foundation covering algebra, coordinate geometry, trigonometry, and an introduction to calculus.',
    instructor: 'Prof. Arjun Nair', instructorBio: 'Former JEE Advanced topper and IISc research scholar.',
    thumbnail: 'https://img.youtube.com/vi/WnjQTJAj4FU/maxresdefault.jpg',
    category: 'Mathematics', level: 'Intermediate', duration: '18h 45m',
    lessonsCount: 6, rating: 4.9, studentsCount: 41200, color: '#8b5cf6',
    tags: ['Math', 'Algebra', 'Calculus', 'Geometry'],
    lessons: [
      { id: 'lesson_2_1', title: 'Algebra Basics', description: 'Equations, inequalities and expressions.', videoId: 'NybHckSEQBI', duration: '12:04', order: 1 },
      { id: 'lesson_2_2', title: 'Coordinate Geometry', description: 'Points, lines and curves on the Cartesian plane.', videoId: 'WnjQTJAj4FU', duration: '15:30', order: 2 },
      { id: 'lesson_2_3', title: 'Trigonometry', description: 'Sine, cosine, tangent and their applications.', videoId: 'PUB0TaZ7bhA', duration: '18:22', order: 3 },
      { id: 'lesson_2_4', title: 'Introduction to Calculus', description: 'Limits, derivatives and integrals explained visually.', videoId: 'WUvTyaaNkzM', duration: '20:15', order: 4 },
      { id: 'lesson_2_5', title: 'Probability & Statistics', description: 'Basic probability and statistical reasoning.', videoId: 'uzkc-qNVoOk', duration: '14:10', order: 5 },
      { id: 'lesson_2_6', title: 'Problem Solving Masterclass', description: 'Apply all concepts to challenging problems.', videoId: 'EKvHQc3QEow', duration: '25:00', order: 6 },
    ],
  },
  {
    id: 'course_3',
    title: 'Web Development Bootcamp',
    description: 'Build modern websites from scratch with HTML, CSS and JavaScript.',
    longDescription: 'Go from complete beginner to building fully functional websites with HTML, CSS, and JavaScript.',
    instructor: 'Meera Iyer', instructorBio: 'Senior Frontend Engineer at a top-tier startup, coding educator for 7 years.',
    thumbnail: 'https://img.youtube.com/vi/G3e-cpL7ofc/maxresdefault.jpg',
    category: 'Web Dev', level: 'Beginner', duration: '22h 00m',
    lessonsCount: 7, rating: 4.7, studentsCount: 31800, color: '#06b6d4',
    tags: ['HTML', 'CSS', 'JavaScript', 'Web', 'Frontend'],
    lessons: [
      { id: 'lesson_3_1', title: 'HTML Essentials', description: 'Structure your first webpage with HTML.', videoId: 'G3e-cpL7ofc', duration: '1:01:35', order: 1 },
      { id: 'lesson_3_2', title: 'CSS Styling', description: 'Make your pages beautiful with CSS.', videoId: 'OXGznpKZ_sA', duration: '11:23:22', order: 2 },
      { id: 'lesson_3_3', title: 'JavaScript Basics', description: 'Add interactivity with JavaScript.', videoId: 'PkZNo7MFNFg', duration: '3:26:42', order: 3 },
      { id: 'lesson_3_4', title: 'Responsive Design', description: 'Make websites work on any screen size.', videoId: 'srvUrASNj0s', duration: '45:00', order: 4 },
      { id: 'lesson_3_5', title: 'Flexbox & Grid', description: 'Master modern CSS layout techniques.', videoId: 'fYq5PXgSsbE', duration: '37:20', order: 5 },
      { id: 'lesson_3_6', title: 'DOM Manipulation', description: 'Update your webpage dynamically with JS.', videoId: '5fb2aPlgoys', duration: '28:54', order: 6 },
      { id: 'lesson_3_7', title: 'Final Portfolio Project', description: 'Build and deploy your own portfolio site.', videoId: 'r_hYR53r61M', duration: '1:10:00', order: 7 },
    ],
  },
  {
    id: 'course_4',
    title: 'Physics: Mechanics & Waves',
    description: 'Deep-dive into classical mechanics, motion, forces, and wave phenomena.',
    longDescription: 'Understand the physical world starting from Newton\'s laws through energy, momentum, oscillations, and wave mechanics.',
    instructor: 'Dr. Rajan Kapoor', instructorBio: 'PhD from TIFR, JEE Physics expert with 15 years of teaching.',
    thumbnail: 'https://img.youtube.com/vi/ZM8ECpBuQYE/maxresdefault.jpg',
    category: 'Science', level: 'Advanced', duration: '16h 20m',
    lessonsCount: 6, rating: 4.9, studentsCount: 18900, color: '#10b981',
    tags: ['Physics', 'Mechanics', 'Waves', 'JEE', 'Science'],
    lessons: [
      { id: 'lesson_4_1', title: 'Newton\'s Laws of Motion', description: 'Force, mass, acceleration and the three laws.', videoId: 'ZM8ECpBuQYE', duration: '16:30', order: 1 },
      { id: 'lesson_4_2', title: 'Work, Energy & Power', description: 'Conservation of energy and work-energy theorem.', videoId: 'w4QFJb9a8vo', duration: '20:14', order: 2 },
      { id: 'lesson_4_3', title: 'Circular Motion', description: 'Centripetal force, angular velocity and more.', videoId: 'bpFK2VCRHUs', duration: '18:45', order: 3 },
      { id: 'lesson_4_4', title: 'Gravitation', description: 'Gravitational force, orbits and escape velocity.', videoId: 'MTY1Kje0yLg', duration: '22:00', order: 4 },
      { id: 'lesson_4_5', title: 'Simple Harmonic Motion', description: 'Oscillations, pendulums and springs.', videoId: 'q-Y-z6HmRgI', duration: '25:30', order: 5 },
      { id: 'lesson_4_6', title: 'Waves & Sound', description: 'Wave properties, interference and the Doppler effect.', videoId: 'Rxhj6RaBh2o', duration: '30:10', order: 6 },
    ],
  },
];

export function findCourseById(id: string): Course | undefined {
  return courses.find(c => c.id === id);
}