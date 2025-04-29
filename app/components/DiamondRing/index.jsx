export default function DiamondRing() {
  return (
    <div className="diamond-ring relative">
      <div className="diamond relative border-solid border-[transparent_transparent_#27c3f3_transparent] border-[0_5px_5px_5px] h-0 w-[23px] z-10 before:absolute before:top-[5px] before:left-[-5px] before:w-0 before:h-0 before:border-solid before:border-[#27c3f3_transparent_transparent_transparent] before:border-[15px_12.5px_0_12.5px] after:absolute after:top-[5px] after:left-[0.5px] after:w-0 after:h-0 after:border-solid after:border-[#7fd4f9_transparent_transparent_transparent] after:border-[15px_7px_7px] hover:scale-120 transition"></div>
      <div className="band absolute top-[16px] left-[-8px] z-10 w-[40px] h-[40px] border-solid border-[4px] border-yellow-300 rounded-full before:content-['+'] before:absolute before:text-red-500/60 after:content-['+'] after:absolute after:text-red-500/60 before:left-[1px] before:top-[-24px] before:text-sm before:text-shadow-[20px_-12px] after:left-[22px] after:top-[-15px] after:text-xs after:text-shadow-[-19px_-18px] after:animate-[shine_0.5s_linear_infinite_0.2s] before:animate-[shine_1s_linear_infinite_0.5s]"></div>
      <div className="inner"></div>
      <div className="details"></div>
    </div>
  );
}
