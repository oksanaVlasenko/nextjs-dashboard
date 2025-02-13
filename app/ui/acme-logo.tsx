
export default function AcmeLogo() {
  return (
    <div
      className={`flex flex-row items-center leading-none text-white`}
    >
      <img src="/logo-cat.svg" alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" />

      <p className="inline-block text-black text-xl md:text-3xl font-semibold tracking-tight mb-4">LK</p>
    </div>
  );
}
