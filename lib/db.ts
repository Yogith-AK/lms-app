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
   // ─── NEW CODING COURSES ───────────────────────────────────────
  {
    id: 'course_5',
    title: 'JavaScript Mastery',
    description: 'Go deep into JavaScript — async, ES6+, APIs and real projects.',
    longDescription: 'Take your JavaScript skills to the next level. This course covers modern ES6+ syntax, promises, async/await, fetch API, DOM projects, and closes with building a full weather app from scratch.',
    instructor: 'Karan Mehta',
    instructorBio: 'Full-stack developer with 8 years experience, ex-Flipkart engineer.',
    thumbnail: 'https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg',
    category: 'Programming', level: 'Intermediate', duration: '14h 00m',
    lessonsCount: 7, rating: 4.8, studentsCount: 29100, color: '#eab308',
    tags: ['JavaScript', 'ES6', 'Async', 'DOM', 'Coding'],
    lessons: [
      { id: 'lesson_5_1', title: 'ES6+ Modern Syntax', description: 'Arrow functions, destructuring, spread, rest.', videoId: 'NCwa_xi0Uuc', duration: '35:00', order: 1 },
      { id: 'lesson_5_2', title: 'DOM Manipulation Deep Dive', description: 'Query, create and manipulate DOM elements.', videoId: '5fb2aPlgoys', duration: '28:54', order: 2 },
      { id: 'lesson_5_3', title: 'Promises & Async/Await', description: 'Handle asynchronous code like a pro.', videoId: 'li18vCMvkl8', duration: '20:00', order: 3 },
      { id: 'lesson_5_4', title: 'Fetch API & REST', description: 'Call external APIs and handle JSON responses.', videoId: 'cuEtnrL9-H0', duration: '18:30', order: 4 },
      { id: 'lesson_5_5', title: 'LocalStorage & Sessions', description: 'Persist data in the browser.', videoId: 'AUOzvFzdIk4', duration: '14:00', order: 5 },
      { id: 'lesson_5_6', title: 'Error Handling', description: 'Try/catch, custom errors and debugging.', videoId: 'blBoIyNhGvY', duration: '12:00', order: 6 },
      { id: 'lesson_5_7', title: 'Build a Weather App', description: 'Full project using everything you\'ve learned.', videoId: 'WZNG8UomjSI', duration: '1:00:00', order: 7 },
    ],
  },
  {
    id: 'course_6',
    title: 'React.js for Beginners',
    description: 'Build dynamic UIs with React — components, hooks, state and more.',
    longDescription: 'Learn the most popular frontend framework used by companies like Meta, Airbnb and Netflix. Covers JSX, components, props, useState, useEffect, React Router and ends with building a full task manager app.',
    instructor: 'Sneha Reddy',
    instructorBio: 'React developer at a Series B startup, open source contributor.',
    thumbnail: 'https://img.youtube.com/vi/bMknfKXIFA8/maxresdefault.jpg',
    category: 'Web Dev', level: 'Intermediate', duration: '11h 30m',
    lessonsCount: 8, rating: 4.9, studentsCount: 35600, color: '#38bdf8',
    tags: ['React', 'JavaScript', 'Frontend', 'Hooks', 'Web Dev'],
    lessons: [
      { id: 'lesson_6_1', title: 'What is React?', description: 'Why React and how it works under the hood.', videoId: 'Tn6-PIqc4UM', duration: '12:00', order: 1 },
      { id: 'lesson_6_2', title: 'JSX & Components', description: 'Writing HTML in JavaScript with JSX.', videoId: 'bMknfKXIFA8', duration: '1:12:00', order: 2 },
      { id: 'lesson_6_3', title: 'Props & State', description: 'Pass data between components with props.', videoId: 'IYvD9oBCuJI', duration: '20:00', order: 3 },
      { id: 'lesson_6_4', title: 'useState Hook', description: 'Manage component state with useState.', videoId: 'O6P86uwfdR0', duration: '18:00', order: 4 },
      { id: 'lesson_6_5', title: 'useEffect Hook', description: 'Handle side effects and data fetching.', videoId: 'UVhIMwHDS9k', duration: '22:00', order: 5 },
      { id: 'lesson_6_6', title: 'React Router', description: 'Add navigation and multiple pages to your app.', videoId: 'Ul3y1LXxzdU', duration: '30:00', order: 6 },
      { id: 'lesson_6_7', title: 'Fetching Data from APIs', description: 'Connect React to a backend API.', videoId: 'T3Px88x_PsA', duration: '25:00', order: 7 },
      { id: 'lesson_6_8', title: 'Build a Task Manager App', description: 'Full React project from scratch.', videoId: 'pV4tFBTWfMU', duration: '1:30:00', order: 8 },
    ],
  },
  {
    id: 'course_7',
    title: 'Node.js & Express Backend',
    description: 'Build REST APIs and backend servers with Node.js and Express.',
    longDescription: 'Learn server-side JavaScript with Node.js. Build REST APIs, handle authentication, connect to databases, and deploy your backend. Perfect for anyone who wants to become a full-stack developer.',
    instructor: 'Vikram Das',
    instructorBio: 'Backend engineer with 10 years experience, AWS certified architect.',
    thumbnail: 'https://img.youtube.com/vi/Oe421EPjeBE/maxresdefault.jpg',
    category: 'Programming', level: 'Intermediate', duration: '13h 00m',
    lessonsCount: 7, rating: 4.7, studentsCount: 22400, color: '#4ade80',
    tags: ['Node.js', 'Express', 'Backend', 'API', 'JavaScript'],
    lessons: [
      { id: 'lesson_7_1', title: 'Node.js Fundamentals', description: 'How Node works, modules and npm.', videoId: 'TlB_eWDSMt4', duration: '1:30:00', order: 1 },
      { id: 'lesson_7_2', title: 'Express.js Setup', description: 'Create your first Express server.', videoId: 'L72fhGm1tfE', duration: '35:00', order: 2 },
      { id: 'lesson_7_3', title: 'REST API Design', description: 'Build GET, POST, PUT, DELETE routes.', videoId: 'fgTGADljAeg', duration: '40:00', order: 3 },
      { id: 'lesson_7_4', title: 'Middleware', description: 'Use and write Express middleware.', videoId: 'lY6icfhap2o', duration: '20:00', order: 4 },
      { id: 'lesson_7_5', title: 'Authentication with JWT', description: 'Secure your API with JSON Web Tokens.', videoId: '7Q17ubqLfaM', duration: '45:00', order: 5 },
      { id: 'lesson_7_6', title: 'Connecting to MongoDB', description: 'Store and retrieve data with Mongoose.', videoId: '-56x56UppqQ', duration: '50:00', order: 6 },
      { id: 'lesson_7_7', title: 'Deploy to Railway', description: 'Put your Node.js backend live on the internet.', videoId: 'MusIvEKjqsc', duration: '25:00', order: 7 },
    ],
  },
  {
    id: 'course_8',
    title: 'Git & GitHub Complete Guide',
    description: 'Master version control with Git and collaborate on GitHub like a pro.',
    longDescription: 'Every developer needs Git. Learn commits, branches, merging, rebasing, pull requests and how to collaborate on real projects. Includes a complete GitHub workflow used in top tech companies.',
    instructor: 'Aditya Bose',
    instructorBio: 'DevOps engineer and open source maintainer with 500+ GitHub contributions.',
    thumbnail: 'https://img.youtube.com/vi/RGOj5yH7evk/maxresdefault.jpg',
    category: 'Programming', level: 'Beginner', duration: '6h 00m',
    lessonsCount: 6, rating: 4.8, studentsCount: 41000, color: '#f43f5e',
    tags: ['Git', 'GitHub', 'Version Control', 'DevOps', 'Coding'],
    lessons: [
      { id: 'lesson_8_1', title: 'What is Git?', description: 'Version control concepts and why you need Git.', videoId: 'RGOj5yH7evk', duration: '1:08:00', order: 1 },
      { id: 'lesson_8_2', title: 'Core Git Commands', description: 'init, add, commit, status, log.', videoId: 'USjZcfj8yxE', duration: '30:00', order: 2 },
      { id: 'lesson_8_3', title: 'Branching & Merging', description: 'Create branches and merge code safely.', videoId: 'e2IbNHi4uCI', duration: '25:00', order: 3 },
      { id: 'lesson_8_4', title: 'GitHub & Remote Repos', description: 'Push, pull and clone from GitHub.', videoId: 'wpISo9TNjfU', duration: '20:00', order: 4 },
      { id: 'lesson_8_5', title: 'Pull Requests & Code Review', description: 'Collaborate with PRs like real teams do.', videoId: '8lGpZkjnkt4', duration: '18:00', order: 5 },
      { id: 'lesson_8_6', title: 'Resolving Merge Conflicts', description: 'Fix conflicts and keep your codebase clean.', videoId: 'xNVM5UxlFSA', duration: '15:00', order: 6 },
    ],
  },
  {
    id: 'course_9',
    title: 'Data Structures & Algorithms',
    description: 'Crack coding interviews with a solid DSA foundation in Python.',
    longDescription: 'The most important course for any developer aiming at top tech companies. Covers arrays, linked lists, stacks, queues, trees, graphs, sorting, searching and dynamic programming — all with Python implementations.',
    instructor: 'Dr. Rohit Verma',
    instructorBio: 'Ex-Google engineer, competitive programming coach, IIT Bombay alumni.',
    thumbnail: 'https://img.youtube.com/vi/pkYVOmU3MgA/maxresdefault.jpg',
    category: 'Programming', level: 'Advanced', duration: '20h 00m',
    lessonsCount: 8, rating: 4.9, studentsCount: 27800, color: '#a855f7',
    tags: ['DSA', 'Algorithms', 'Python', 'Interview Prep', 'Coding'],
    lessons: [
      { id: 'lesson_9_1', title: 'Arrays & Strings', description: 'Master the most common interview data structure.', videoId: 'pkYVOmU3MgA', duration: '1:15:00', order: 1 },
      { id: 'lesson_9_2', title: 'Linked Lists', description: 'Singly, doubly linked lists and operations.', videoId: 'qp8u-frRAnU', duration: '40:00', order: 2 },
      { id: 'lesson_9_3', title: 'Stacks & Queues', description: 'LIFO/FIFO structures and their applications.', videoId: 'wjI1WNcIntg', duration: '35:00', order: 3 },
      { id: 'lesson_9_4', title: 'Trees & Binary Search Trees', description: 'Hierarchical data structures and traversals.', videoId: 'fAAZixBzIAI', duration: '1:00:00', order: 4 },
      { id: 'lesson_9_5', title: 'Graphs', description: 'BFS, DFS and shortest path algorithms.', videoId: 'tWVWeAqZ0WU', duration: '1:10:00', order: 5 },
      { id: 'lesson_9_6', title: 'Sorting Algorithms', description: 'Bubble, merge, quick sort and their complexity.', videoId: 'g-PGLbMth_g', duration: '45:00', order: 6 },
      { id: 'lesson_9_7', title: 'Dynamic Programming', description: 'Solve complex problems with memoization.', videoId: 'oBt53YbR9Kk', duration: '5:00:00', order: 7 },
      { id: 'lesson_9_8', title: 'Mock Interview Problems', description: '10 real interview problems solved step by step.', videoId: 'Peq4GCPNKCA', duration: '1:30:00', order: 8 },
    ],
  },
  {
    id: 'course_10',
    title: 'SQL & Database Design',
    description: 'Learn SQL from scratch and design real-world relational databases.',
    longDescription: 'Databases power every application. Learn to write SQL queries, design schemas, work with joins, indexes and transactions. Includes hands-on practice with PostgreSQL and real-world database design exercises.',
    instructor: 'Nisha Pillai',
    instructorBio: 'Database architect with 12 years at Fortune 500 companies.',
    thumbnail: 'https://img.youtube.com/vi/HXV3zeQKqGY/maxresdefault.jpg',
    category: 'Programming', level: 'Beginner', duration: '9h 00m',
    lessonsCount: 6, rating: 4.7, studentsCount: 19500, color: '#fb923c',
    tags: ['SQL', 'Database', 'PostgreSQL', 'Backend', 'Data'],
    lessons: [
      { id: 'lesson_10_1', title: 'Introduction to Databases', description: 'What is a relational database and how SQL works.', videoId: 'HXV3zeQKqGY', duration: '3:10:00', order: 1 },
      { id: 'lesson_10_2', title: 'SELECT & Filtering', description: 'Query data with WHERE, ORDER BY, LIMIT.', videoId: 'p3qvj9hO_Bo', duration: '40:00', order: 2 },
      { id: 'lesson_10_3', title: 'JOINs Explained', description: 'INNER, LEFT, RIGHT and FULL JOINs with examples.', videoId: '9yeOJ0ZMUYw', duration: '35:00', order: 3 },
      { id: 'lesson_10_4', title: 'Aggregations & GROUP BY', description: 'COUNT, SUM, AVG, GROUP BY and HAVING.', videoId: 'rK5h2dpoinA', duration: '25:00', order: 4 },
      { id: 'lesson_10_5', title: 'Database Design & Normalization', description: 'Design schemas the right way.', videoId: 'GFQaEYEc8_0', duration: '45:00', order: 5 },
      { id: 'lesson_10_6', title: 'Indexes & Performance', description: 'Speed up queries with indexes and explain plans.', videoId: 'fsG1XaZEa78', duration: '30:00', order: 6 },
    ],
  },
];
export function findCourseById(id: string): Course | undefined {
  return courses.find(c => c.id === id);
}