import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import FoodItem from "./FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  return (
    <div className="mt-8">
      <h2 className="font-semibold text-gray-900 text-3xl">
        Top dishes near you
      </h2>
      <div className="grid mt-8 gap-x-8 gap-y-[50px] grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
