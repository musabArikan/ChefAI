import { menu_list } from "../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col gap-5 " id="explore-menu">
      <h1 className="font-semibold text-gray-900 text-3xl">Explore our menu</h1>
      <p className=" text-gray-700 text-md w-full ">
        Choose from a diverse menu featuring a delectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="flex justify-between items-center text-center my-5 mx-0 overflow-x-scroll gap-7">
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
            >
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={`w-[7.5vw] min-w-[80px] cursor-pointer rounded-[50%] transition-all  ${
                  category === item.menu_name
                    ? "border-4 border-[tomato]  "
                    : "border-4 border-transparent"
                }`}
              />
              <p
                className={`mt-2.5 font-medium ${
                  category === item.menu_name
                    ? "text-[tomato] "
                    : "text-gray-700"
                }`}
              >
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="my-2.5 mx-0 h-0.5 bg-gray-300 border-none " />
    </div>
  );
};

export default ExploreMenu;
