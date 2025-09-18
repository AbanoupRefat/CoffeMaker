import { Instagram, Facebook, Phone, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AboutUs = () => {
  const video1Ref = useRef(null);
  const video2Ref = useRef(null);
  const [TikTokEmbed, setTikTokEmbed] = useState(null);

  useEffect(() => {
    // Dynamically import TikTokEmbed only on client
    import("react-social-media-embed").then((mod) => {
      setTikTokEmbed(() => mod.TikTokEmbed);
    });

    // Auto-play videos
    const playVideos = () => {
      if (video1Ref.current) video1Ref.current.play().catch(console.log);
      if (video2Ref.current) video2Ref.current.play().catch(console.log);
    };
    const timer = setTimeout(playVideos, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section with TikTok Video */}
        <div className="relative rounded-lg shadow-lg mb-12 overflow-hidden bg-black">
          <div className="flex justify-center items-center p-4">
            <div className="w-full max-w-md mx-auto">
              {TikTokEmbed && (
                <TikTokEmbed
                  url="https://www.tiktok.com/@coffeemakercr/video/7547748307980799248"
                  width="100%"
                  style={{ maxWidth: "100%" }}
                />
              )}
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Our Story
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4" dir="rtl">
              بدأت قصة صانع القهوة فى بيت الأجداد وكانت العادة الصباحية التي تجمع الاقارب والاصدقاء
              هی تحضير القهوہ و الإهتمام بتفاصيل كل مرحلة باسلوب الأجداد الأصيل والبسيط ، وكانت جملة الجد الشهيرة هى «لو بتحبها أوى أعملها صح اوی» و تناقلت هذه العبارة عبر الزمن ونقلت معها حب القهوة بين الأبناء حتى وصلت برائحتها ومذاقها المميز والاصيل باساليب التحضير الحديثة لتكون حضارة الأجداد بين أيدينا اليوم
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-4">
              Our mission is simple: to provide an unparalleled coffee
              experience, from bean to cup. We are dedicated to delivering not
              just coffee, but a commitment to quality, sustainability, and
              community. We believe in fostering a deeper appreciation for
              coffee by educating our customers and offering a curated selection
              that caters to every palate.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Beyond the brew, CoffeeCraft is about connection. It's about the
              conversations sparked over a warm mug, the quiet moments of
              reflection, and the shared joy of a perfectly crafted beverage.
              Join us in celebrating the art and science of coffee, and let us
              help you craft your perfect coffee experience, every single day.
            </p>
          </div>
        </div>

        {/* Coffee Process TikTok Video Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm mb-12">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent text-center">
            Our Coffee Process
          </h2>

          <div className="relative rounded-lg bg-black">
            <div className="flex justify-center p-6">
              <div className="w-full max-w-sm">
                {TikTokEmbed && (
                  <TikTokEmbed
                    url="https://www.tiktok.com/@coffeemakercr/video/7526945009640148232"
                    width="100%"
                  />
                )}
              </div>
            </div>
          </div>

          <p className="text-center text-gray-600 mt-4">
            Experience the artistry behind every cup of CoffeeCraft coffee
          </p>
        </div>

        {/* Social Media and Contact */}
        <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl border border-amber-100 p-8 shadow-xl text-center">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Connect With Us
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We love hearing from our customers! Reach out to us through our
            social media channels or directly via phone and email.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <a
              href="https://www.instagram.com/coffeemaker.cr"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                <Instagram className="w-8 h-8 text-white" />
              </div>
              <span className="font-semibold text-gray-800">Instagram</span>
              <span className="text-sm text-gray-500 mt-1">@coffeemaker.cr</span>
            </a>

            <a
              href="https://wa.me/+201001246102"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <span className="font-semibold text-gray-800">WhatsApp</span>
              <span className="text-sm text-gray-500 mt-1">+201001246102</span>
            </a>

            <a
              href="https://www.facebook.com/coffeemaker.cr"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                <Facebook className="w-8 h-8 text-white" />
              </div>
              <span className="font-semibold text-gray-800">Facebook</span>
              <span className="text-sm text-gray-500 mt-1">@coffeemaker.cr</span>
            </a>

            <a
              href="https://www.tiktok.com/@coffeemakercr"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="p-3 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-white"
                >
                  <path d="M9 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
                  <path d="M15 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                  <path d="M15 8v8a4 4 0 0 1-4 4" />
                  <line x1="15" y1="4" x2="15" y2="12" />
                </svg>
              </div>
              <span className="font-semibold text-gray-800">TikTok</span>
              <span className="text-sm text-gray-500 mt-1">@coffeemakercr</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;