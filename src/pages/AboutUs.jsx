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
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              مهمتنا هي أن نبقي روح صباحات الأجداد حيّة، حيث كانت القهوة أكثر من مجرد شراب، بل كانت قلب اللقاء ودفء اللحظة. نستمد إلهامنا من كلمات الجد: "لو بتحبها أوي اعملها صح أوي"، فنحمل وصيته معنا في كل فنجان نقدّمه. نحن نحافظ على أصالة الحرفة بما فيها من عناية وصبر وعمق، ونمزجها بأساليب حديثة تجعل هذا الإرث حاضرًا اليوم. وباعتبارنا أوّل من قدّم القهوة المحمّصة على الفحم، نمنحها طعمًا جريئًا ونقيًا وخالدًا. كل رشفة نقدّمها هي جسر يصل بين الأمس واليوم، تحمل ذاكرة العائلة، ودفء البيت، ووعد القهوة كما يجب أن تكون.
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
            Experience the artistry behind every cup of CoffeeMaker coffee
          </p>
        </div>


      </div>
    </div>
  );
};

export default AboutUs;