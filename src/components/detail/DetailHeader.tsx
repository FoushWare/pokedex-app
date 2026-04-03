interface DetailHeaderProps {
  name: string;
  number: string;
}

export default function DetailHeader({ name, number }: DetailHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-t-2xl p-8 text-center shadow-lg">
      <h1 className="text-3xl md:text-4xl font-black text-white capitalize tracking-tight">
        ⚡ {name}
      </h1>
      <p className="text-white/80 font-mono mt-1 text-lg">{number}</p>
    </div>
  );
}
