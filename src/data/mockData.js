export const MOCK_USERS = [
  {
    id: "user-1",
    name: "Principal Sharma",
    email: "principal@school.com",
    password: "password123",
    role: "principal",
  },
  {
    id: "user-2",
    name: "Mr. Rahul (Teacher)",
    email: "teacher1@school.com",
    password: "password123",
    role: "teacher",
    teacherId: "teacher-1",
  },
  {
    id: "user-3",
    name: "Ms. Priya (Teacher)",
    email: "teacher2@school.com",
    password: "password123",
    role: "teacher",
    teacherId: "teacher-2",
  },
];

export const SUBJECTS = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Geography",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Art",
];

const now = new Date();

function hoursFromNow(h) {
  const d = new Date(now);
  d.setHours(d.getHours() + h);
  return d.toISOString();
}

function hoursAgo(h) {
  const d = new Date(now);
  d.setHours(d.getHours() - h);
  return d.toISOString();
}

const SEED_CONTENT = [
  {
    id: "content-1",
    teacherId: "teacher-1",
    teacherName: "Mr. Rahul",
    title: "Introduction to Algebra",
    subject: "Mathematics",
    description: "Basic algebra concepts for 8th grade students. Covers variables, expressions, and simple equations.",
    fileUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
    fileName: "algebra_intro.jpg",
    fileType: "image/jpeg",
    status: "approved",
    rejectionReason: null,
    startTime: hoursAgo(1),
    endTime: hoursFromNow(2),
    rotationDuration: 30,
    uploadedAt: hoursAgo(5),
  },
  {
    id: "content-2",
    teacherId: "teacher-1",
    teacherName: "Mr. Rahul",
    title: "Photosynthesis Process",
    subject: "Biology",
    description: "How plants make food using sunlight. Diagram explaining the full photosynthesis process.",
    fileUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80",
    fileName: "photosynthesis.png",
    fileType: "image/png",
    status: "pending",
    rejectionReason: null,
    startTime: hoursFromNow(1),
    endTime: hoursFromNow(4),
    rotationDuration: 45,
    uploadedAt: hoursAgo(2),
  },
  {
    id: "content-3",
    teacherId: "teacher-1",
    teacherName: "Mr. Rahul",
    title: "World War 2 Timeline",
    subject: "History",
    description: "A visual timeline of key events during World War 2 from 1939 to 1945.",
    fileUrl: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=600&q=80",
    fileName: "ww2_timeline.jpg",
    fileType: "image/jpeg",
    status: "rejected",
    rejectionReason: "The image quality is too low. Please upload a higher resolution image.",
    startTime: hoursFromNow(2),
    endTime: hoursFromNow(5),
    rotationDuration: 60,
    uploadedAt: hoursAgo(24),
  },
  {
    id: "content-4",
    teacherId: "teacher-2",
    teacherName: "Ms. Priya",
    title: "Newton's Laws of Motion",
    subject: "Physics",
    description: "Visual explanation of Newton's three laws with real-world examples.",
    fileUrl: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&q=80",
    fileName: "newtons_laws.jpg",
    fileType: "image/jpeg",
    status: "approved",
    rejectionReason: null,
    startTime: hoursAgo(3),
    endTime: hoursFromNow(1),
    rotationDuration: 30,
    uploadedAt: hoursAgo(8),
  },
  {
    id: "content-5",
    teacherId: "teacher-2",
    teacherName: "Ms. Priya",
    title: "English Grammar – Tenses",
    subject: "English",
    description: "A comprehensive chart of English tenses with examples.",
    fileUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    fileName: "english_tenses.png",
    fileType: "image/png",
    status: "pending",
    rejectionReason: null,
    startTime: hoursFromNow(3),
    endTime: hoursFromNow(6),
    rotationDuration: 30,
    uploadedAt: hoursAgo(1),
  },
  {
    id: "content-6",
    teacherId: "teacher-2",
    teacherName: "Ms. Priya",
    title: "Periodic Table of Elements",
    subject: "Chemistry",
    description: "Color-coded periodic table highlighting element groups.",
    fileUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
    fileName: "periodic_table.jpg",
    fileType: "image/jpeg",
    status: "approved",
    rejectionReason: null,
    startTime: hoursAgo(2),
    endTime: hoursFromNow(3),
    rotationDuration: 45,
    uploadedAt: hoursAgo(10),
  },
];

const TEACHER_POOL = [
  { id: "teacher-1", name: "Mr. Rahul" },
  { id: "teacher-2", name: "Ms. Priya" },
];

const TITLE_TEMPLATES = [
  ["Chapter {n}: Linear Equations", "Mathematics"],
  ["Geometry Basics – Angles & Triangles", "Mathematics"],
  ["Quadratic Equations Visual Guide", "Mathematics"],
  ["Probability and Statistics Overview", "Mathematics"],
  ["Trigonometry Ratios Chart", "Mathematics"],
  ["Cell Structure and Functions", "Biology"],
  ["Human Digestive System", "Biology"],
  ["DNA and Genetics Introduction", "Biology"],
  ["Ecosystem Food Chains", "Biology"],
  ["Plant and Animal Cells", "Biology"],
  ["Newton's Laws – Chapter {n}", "Physics"],
  ["Electromagnetic Spectrum", "Physics"],
  ["Waves and Sound Properties", "Physics"],
  ["Optics and Light Refraction", "Physics"],
  ["Thermodynamics Basics", "Physics"],
  ["Atomic Structure", "Chemistry"],
  ["Chemical Bonding – Ionic & Covalent", "Chemistry"],
  ["Acids, Bases and pH Scale", "Chemistry"],
  ["Organic Chemistry Introduction", "Chemistry"],
  ["Electrochemistry Overview", "Chemistry"],
  ["World War 1 Causes and Effects", "History"],
  ["The French Revolution – Key Events", "History"],
  ["Ancient Civilizations of Mesopotamia", "History"],
  ["Indian Independence Movement", "History"],
  ["Cold War Era Summary", "History"],
  ["Parts of Speech – Grammar Guide", "English"],
  ["Essay Writing Structure", "English"],
  ["Active and Passive Voice", "English"],
  ["Shakespeare's Works Overview", "English"],
  ["Reading Comprehension Tips", "English"],
  ["Map Skills and Scale Reading", "Geography"],
  ["Climate Zones of the World", "Geography"],
  ["Rivers and Landforms", "Geography"],
  ["Population Distribution Patterns", "Geography"],
  ["Natural Resources and Conservation", "Geography"],
  ["Introduction to Programming – Chapter {n}", "Computer Science"],
  ["Data Structures: Arrays and Lists", "Computer Science"],
  ["Algorithms and Flowcharts", "Computer Science"],
  ["Web Development Basics", "Computer Science"],
  ["Binary Number System", "Computer Science"],
  ["Colour Theory and Design Principles", "Art"],
  ["Perspective Drawing Techniques", "Art"],
  ["Famous Artists and Their Styles", "Art"],
  ["Watercolour Painting Basics", "Art"],
  ["Sculpting and 3D Art", "Art"],
  ["Environmental Science – Ecosystems", "Science"],
  ["Forces and Motion", "Science"],
  ["Matter and Its Properties", "Science"],
  ["Energy Sources and Types", "Science"],
  ["Weather and Climate Patterns", "Science"],
];

const IMAGE_POOL = [
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
  "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80",
  "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=600&q=80",
  "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=600&q=80",
  "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
  "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&q=80",
  "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=600&q=80",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
  "https://images.unsplash.com/photo-1453733190371-0a9bedd82893?w=600&q=80",
];

const STATUS_POOL = ["pending", "approved", "approved", "approved", "rejected"];

const REJECTION_POOL = [
  "Image quality is too low. Please upload a higher resolution image.",
  "The content does not match the selected subject. Please review and resubmit.",
  "File appears corrupted or unreadable. Please re-upload.",
  "The schedule overlaps with another approved broadcast. Adjust the time window.",
  "Content contains inappropriate material for the student age group.",
];

function generateContent(count) {
  return Array.from({ length: count }, (_, i) => {
    const index = i % TITLE_TEMPLATES.length;
    const [titleTemplate, subject] = TITLE_TEMPLATES[index];
    const title = titleTemplate.replace("{n}", i + 1);

    const teacher = TEACHER_POOL[i % TEACHER_POOL.length];
    const status = STATUS_POOL[i % STATUS_POOL.length];
    const hoursOffset = (i % 48) - 24;

    const startTime = hoursOffset < 0
      ? hoursAgo(Math.abs(hoursOffset))
      : hoursFromNow(hoursOffset);
    const endTime = hoursOffset < 0
      ? hoursFromNow(2)
      : hoursFromNow(hoursOffset + 3);

    return {
      id: `gen-content-${i + 1}`,
      teacherId: teacher.id,
      teacherName: teacher.name,
      title,
      subject,
      description: `Educational content covering ${title.toLowerCase()} for students.`,
      fileUrl: IMAGE_POOL[i % IMAGE_POOL.length],
      fileName: `content_${i + 1}.jpg`,
      fileType: "image/jpeg",
      status,
      rejectionReason: status === "rejected" ? REJECTION_POOL[i % REJECTION_POOL.length] : null,
      startTime,
      endTime,
      rotationDuration: [15, 30, 45, 60][i % 4],
      uploadedAt: hoursAgo((i % 72) + 1),
    };
  });
}

export const MOCK_CONTENT = [...SEED_CONTENT, ...generateContent(500)];
