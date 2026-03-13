import { Course, User } from '@/types';

// In-memory store (for production, replace with a real DB like Postgres/MongoDB)
export const users: User[] = [
  {
    id: 'user_1',
    name: 'Demo Student',
    email: 'demo@learnhub.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
    enrolledCourses: ['course_1', 'course_2'],
    completedLessons: ['lesson_1_1', 'lesson_1_2'],
    createdAt: '2024-01-01',
  }
];

export const courses: Course[] = [
  {
    id: 'course_1',
    title: 'Python for Beginners',
    description: 'Learn Python programming from scratch with hands-on projects.',
    longDescription: 'Start your coding journey with Python — the world\'s most beginner-friendly language. This course takes you from zero to writing real programs, covering variables, loops, functions, and object-oriented programming with fun mini-projects throughout.',
    instructor: 'Dr. Priya Sharma',
    instructorBio: 'IIT Delhi alumna with 10+ years of teaching CS fundamentals.',
    thumbnail: 'https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg',
    category: 'Programming',
    level: 'Beginner',
    duration: '12h 30m',
    lessonsCount: 8,
    rating: 4.8,
    studentsCount: 24300,
    color: '#f97316',
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
    longDescription: 'Build a rock-solid math foundation. This course uses visual proofs and real-world examples to make abstract concepts tangible. Covers algebra, coordinate geometry, trigonometry, and an introduction to calculus — perfect for students preparing for competitive exams.',
    instructor: 'Prof. Arjun Nair',
    instructorBio: 'Former JEE Advanced topper and IISc research scholar.',
    thumbnail: 'https://img.youtube.com/vi/WnjQTJAj4FU/maxresdefault.jpg',
    category: 'Mathematics',
    level: 'Intermediate',
    duration: '18h 45m',
    lessonsCount: 6,
    rating: 4.9,
    studentsCount: 41200,
    color: '#8b5cf6',
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
    longDescription: 'Go from complete beginner to building fully functional websites. Learn the technologies that power the internet — HTML for structure, CSS for styling, and JavaScript for interactivity. By the end, you\'ll deploy your own portfolio website.',
    instructor: 'Meera Iyer',
    instructorBio: 'Senior Frontend Engineer at a top-tier startup, coding educator for 7 years.',
    thumbnail: 'https://img.youtube.com/vi/G3e-cpL7ofc/maxresdefault.jpg',
    category: 'Web Dev',
    level: 'Beginner',
    duration: '22h 00m',
    lessonsCount: 7,
    rating: 4.7,
    studentsCount: 31800,
    color: '#06b6d4',
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
    longDescription: 'Understand the physical world around you. Starting from Newton\'s laws and progressing to energy, momentum, oscillations, and wave mechanics. Includes animated visualizations and derivations that make the mathematics intuitive.',
    instructor: 'Dr. Rajan Kapoor',
    instructorBio: 'PhD from TIFR, JEE Physics expert with 15 years of teaching.',
    thumbnail: 'https://img.youtube.com/vi/ZM8ECpBuQYE/maxresdefault.jpg',
    category: 'Science',
    level: 'Advanced',
    duration: '16h 20m',
    lessonsCount: 6,
    rating: 4.9,
    studentsCount: 18900,
    color: '#10b981',
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

// Helper to find user by email
export function findUserByEmail(email: string): User | undefined {
  return users.find(u => u.email === email);
}

// Helper to find user by id
export function findUserById(id: string): User | undefined {
  return users.find(u => u.id === id);
}

// Helper to find course by id
export function findCourseById(id: string): Course | undefined {
  return courses.find(c => c.id === id);
}

// Add a new user
export function createUser(user: User): void {
  users.push(user);
}

// Update user data
export function updateUser(id: string, updates: Partial<User>): User | null {
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...updates };
  return users[idx];
}
