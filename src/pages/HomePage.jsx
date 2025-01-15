import CategoryItem from "../components/CategoryItem";
const categories = [
  { href: "/Bags", name: "Bags", imageUrl: "/bags.webp" },
  { href: "/Shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/Trousers", name: "Trousers", imageUrl: "/trouser.jpg" },
  { href: "/Shirts", name: "Shirts", imageUrl: "/shirt.jpg" },
  { href: "/Sweaters", name: "Sweaters", imageUrl: "/sweaters.webp" },
  { href: "/Watches", name: "Watches", imageUrl: "/watch.jpg" },
  { href: "/Glasses", name: "Glasses", imageUrl: "/glasses.jpg" },
  { href: "/Suits", name: "Suits", imageUrl: "/suit.jpg" },
  { href: "/Socks", name: "Socks", imageUrl: "/socks.webp" },
  { href: "/Briefs", name: "Briefs", imageUrl: "/briefs.webp" },
  { href: "/Jeans", name: "Jeans", imageUrl: "/jeans.webp" },
];

const HomePage = () => {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-6">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-stone-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-stone-400 mb-12">
          Discover the latest eco-friendly trends in men&apos;s fashion;
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
