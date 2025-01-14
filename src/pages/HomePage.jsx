import CategoryItem from "../components/CategoryItem";
const categories = [
  { href: "/bags", name: "Jeans", imageUrl: "/jeans.webp" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/trousers", name: "Trousers", imageUrl: "/trouser.jpg" },
  { href: "/shirts", name: "Shirts", imageUrl: "/shirt.jpg" },
  { href: "/sweaters", name: "Sweaters", imageUrl: "/sweaters.webp" },
  { href: "/watches", name: "Watches", imageUrl: "/watch.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suit.jpg" },
  { href: "/socks", name: "Socks", imageUrl: "/socks.webp" },
  { href: "/briefs", name: "Briefs", imageUrl: "/briefs.webp" },
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.webp" },
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
