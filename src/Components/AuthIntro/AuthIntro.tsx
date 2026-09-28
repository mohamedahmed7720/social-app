export default function AuthIntro() {
  return (
    <>
      <div className="max-w-xl mx-auto md:mx-0 ">
        <h1 className="text-3xl font-extrabold sm:text-6xl lg:block mb-3 text-main">Route Posts</h1>
        <p className="text-base md:text-2xl font-medium mb-8 text-slate-700">
          Connect with friends and the world around you on Route Posts.
        </p>
        <div className="p-4 bg-white rounded-2xl border border-[#c9d5ff]">
          <p className="text-xs mb-2 font-extrabold text-center md:text-start text-main uppercase tracking-widest">About Route Academy</p>
          <p className="font-semibold text-lg md:text-xl mb-3 text-slate-900 text-center md:text-start">
            Egypt's Leading IT Training Center Since 2012
          </p>
          <p className="mb-6 text-sm font-medium text-slate-700">
            Route academy is the premier IT training center in Egypt,
            established in 2012. We specialize in delivering high-quality
            training courses in programming, web development, and application
            development. we've identified the unique challenges people may face
            when learning new technology and made efforts to provide strategies
            to overcome them.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div className="p-2 bg-[#F2F6FF] border border-[#c9d5ff] rounded-xl text-center md:text-start">
              <p className="font-bold text-main">2012</p>
              <p className="text-xs font-semibold text-slate-700 text-[11px]">FOUNDED</p>
            </div>
            <div className="p-2 bg-[#F2F6FF] border border-[#c9d5ff] rounded-xl text-center md:text-start">
              <p className="font-bold text-main">40K+</p>
              <p className="text-xs font-semibold text-slate-700 text-[11px]">GRADUATES</p>
            </div>
            <div className="p-2 bg-[#F2F6FF] border border-[#c9d5ff] rounded-xl text-center md:text-start">
              <p className="font-bold text-main">50+</p>
              <p className="text-xs font-semibold text-slate-700 text-[11px]">PARTNER COMPANIES</p>
            </div>
            <div className="p-2 bg-[#F2F6FF] border border-[#c9d5ff] rounded-xl text-center md:text-start">
              <p className="font-bold text-main">5</p>
              <p className="text-xs font-semibold text-slate-700 text-[11px]">BRANCHES</p>
            </div>
            <div className="p-2 bg-[#F2F6FF] border border-[#c9d5ff] rounded-xl text-center md:text-start">
              <p className="font-bold text-main">20</p>
              <p className="text-xs font-semibold text-slate-700 text-[11px]">DIPLOMAS AVAILABLE</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
