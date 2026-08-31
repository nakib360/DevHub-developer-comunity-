import { RiRocket2Fill } from "react-icons/ri";
import DottedBackground from "./_DotBg/DottedBackground";
import { cookies } from 'next/headers'
import DevImg from "../../../public/dev.png"
import Image from "next/image";
import { createClient } from "../utils/supabase/server";

const Home = async () => {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()
  console.log(todos);
  return (
    <DottedBackground>
      <section className="relative min-h-screen w-full  px-6 py-12 md:px-16 lg:px-24 flex items-center justify-center">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content Column */}
          <div className="flex flex-col items-start space-y-6">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-semibold shadow-sm">
              <RiRocket2Fill className="w-3.5 h-3.5" />
              <span>DevHub v1.0</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Where Developers Connect, Build and Learn.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              Join a thriving ecosystem of engineers. Share knowledge, showcase projects, and accelerate your technical career in a community built for code.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                Join the Community
              </button>
              <button className="px-6 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-colors shadow-sm">
                Explore Developers
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3 pt-4">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-block h-8 w-8 rounded-full bg-slate-400 ring-2 ring-white" />
                <div className="inline-block h-8 w-8 rounded-full bg-slate-500 ring-2 ring-white" />
                <div className="inline-block h-8 w-8 rounded-full bg-slate-600 ring-2 ring-white" />
              </div>
              <span className="text-sm font-medium text-slate-600">
                Trusted by 50,000+ engineers
              </span>
            </div>

          </div>

          {/* Right Image Placeholder Column */}
          <div className="w-full flex justify-center items-center">
            <Image
              src={DevImg}
              alt="DevHub Application Interface"
              className="w-full transition-all -rotate-3 hover:rotate-0 h-auto max-w-lg lg:max-w-none rounded-2xl shadow-2xl border border-slate-200 object-cover"
            />
          </div>

        </div>
      </section>
    </DottedBackground>
  );
};

export default Home;
