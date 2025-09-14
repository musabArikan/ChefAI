import assistantIcon from "../assets/assistant_icon.png";

const TableLoading = () => {
  return (
    <div
      className="flex items-center justify-center w-full"
      style={{ minHeight: 180 }}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="relative flex items-center justify-center">
          <img
            src={assistantIcon}
            alt="Assistant Loading"
            className="w-12 h-12 z-10 animate-fade-in"
          />
          <span
            className="absolute w-16 h-16 rounded-full border-4 border-[tomato] border-t-transparent animate-spin"
            style={{ borderTopColor: "#fff5f0", borderRightColor: "#ffb199" }}
          ></span>
        </div>
        <span className="text-sm font-semibold text-[tomato]">Loading...</span>
      </div>
    </div>
  );
};

export default TableLoading;
