// 더미 데이터 생성 함수
const generateDummyData = (count: number) => {
  const adjectives = [
    "Amazing",
    "Brilliant",
    "Creative",
    "Dynamic",
    "Elegant",
    "Fantastic",
    "Gorgeous",
    "Happy",
    "Innovative",
    "Joyful",
  ];
  const nouns = [
    "Product",
    "Service",
    "Item",
    "Solution",
    "Package",
    "Design",
    "Creation",
    "Offer",
    "Deal",
    "Concept",
  ];
  const colors = [
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Orange",
    "Pink",
    "Teal",
    "Indigo",
    "Coral",
  ];
  const categories = [
    "Electronics",
    "Fashion",
    "Home",
    "Books",
    "Sports",
    "Toys",
    "Food",
    "Beauty",
    "Garden",
    "Automotive",
  ];

  const items = [];

  for (let i = 0; i < count; i++) {
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const price = (Math.random() * 1000).toFixed(2);
    const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0 - 5.0
    const reviews = Math.floor(Math.random() * 1000);

    items.push({
      id: `item-${i + 1}`,
      title: `Item ${i + 1}`,
      description: `This is a ${randomAdjective.toLowerCase()} ${randomNoun.toLowerCase()} in ${randomColor.toLowerCase()}. Perfect for all your ${randomCategory.toLowerCase()} needs.`,
      price: parseFloat(price),
      category: randomCategory,
      rating: parseFloat(rating),
      reviews: reviews,
      imageUrl: `https://picsum.photos/300/200?random=${i + 1}`,
      inStock: Math.random() > 0.2,
      discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30 + 5) : 0,
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 10000000000)
      ).toISOString(),
    });
  }

  return items;
};

// 초기 데이터 생성 (예: 100개)
const initialData = generateDummyData(100);

// API를 시뮬레이션하는 함수 (페이지네이션)
const fetchMoreData = async (page = 1, pageSize = 20) => {
  // 실제 API 호출을 시뮬레이션하기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  const startIndex = (page - 1) * pageSize;
  return generateDummyData(pageSize).map((item, index) => ({
    ...item,
    id: `item-${startIndex + index + 1}`,
  }));
};

// 간단한 사용자 프로필 데이터
const generateUserProfiles = (count: number) => {
  const firstNames = [
    "John",
    "Jane",
    "Mike",
    "Sarah",
    "David",
    "Emma",
    "Tom",
    "Lisa",
    "Chris",
    "Anna",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Wilson",
    "Martinez",
  ];
  const jobs = [
    "Developer",
    "Designer",
    "Manager",
    "Engineer",
    "Analyst",
    "Consultant",
    "Artist",
    "Writer",
    "Teacher",
    "Chef",
  ];

  const users = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    users.push({
      id: `user-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
      job: jobs[Math.floor(Math.random() * jobs.length)],
      followers: Math.floor(Math.random() * 10000),
      following: Math.floor(Math.random() * 1000),
      posts: Math.floor(Math.random() * 500),
      joinDate: new Date(
        Date.now() - Math.floor(Math.random() * 31536000000)
      ).toISOString(),
      isVerified: Math.random() > 0.8,
      bio: `${jobs[Math.floor(Math.random() * jobs.length)]} with ${Math.floor(
        Math.random() * 15 + 1
      )} years of experience. Passionate about innovation and creativity.`,
    });
  }

  return users;
};

// 포스트/피드 형태의 데이터
const generatePosts = (count: number) => {
  const posts = [];
  const users = generateUserProfiles(10); // 10명의 사용자 생성

  for (let i = 0; i < count; i++) {
    const author = users[Math.floor(Math.random() * users.length)];
    const contentTypes = ["text", "image", "video"];
    const contentType =
      contentTypes[Math.floor(Math.random() * contentTypes.length)];

    let content = {
      type: contentType,
      text: `This is post #${
        i + 1
      }. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ${
        Math.random() > 0.5
          ? "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          : "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris."
      }`,
      imageUrl: `https://picsum.photos/600/400?random=${i + 1}`,
      videoUrl: `https://example.com/video/${i + 1}`,
      thumbnailUrl: `https://picsum.photos/600/400?random=${i + 1}`,
    };

    if (contentType === "image") {
      content.imageUrl = `https://picsum.photos/600/400?random=${i + 1}`;
    } else if (contentType === "video") {
      content.videoUrl = `https://example.com/video/${i + 1}`;
      content.thumbnailUrl = `https://picsum.photos/600/400?random=${i + 1}`;
    }

    posts.push({
      id: `post-${i + 1}`,
      author: author,
      content: content,
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 100),
      shares: Math.floor(Math.random() * 50),
      createdAt: new Date(
        Date.now() - Math.floor(Math.random() * 86400000)
      ).toISOString(),
      isLiked: Math.random() > 0.7,
      isBookmarked: Math.random() > 0.9,
    });
  }

  return posts;
};

// 사용 예시
export {
  generateDummyData,
  fetchMoreData,
  generateUserProfiles,
  generatePosts,
  initialData,
};
