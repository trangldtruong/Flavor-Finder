import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useStoreContext } from "../../utils/GlobalState";
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "../../utils/actions";
import { QUERY_CATEGORIES } from "../../utils/queries";

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories, currentCategory } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
    }
  }, [categoryData, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      <select
        value={currentCategory}
        onChange={(e) => handleClick(e.target.value)}
      >
        <option value="">All</option>
        {categories.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );

  // return (
  //   <div>
  //     <h2>Choose a Category:</h2>
  //     {categories.map((item) => (
  //       <button
  //         key={item._id}
  //         onClick={() => {
  //           handleClick(item._id);
  //         }}
  //         className={currentCategory === item._id ? "active" : ""}
  //       >
  //         {item.name}
  //       </button>
  //     ))}
  //     <button
  //       onClick={() => {
  //         handleClick("");
  //       }}
  //       className={!currentCategory ? "active" : ""}
  //     >
  //       All
  //     </button>
  //   </div>
  // );
}

export default CategoryMenu;
