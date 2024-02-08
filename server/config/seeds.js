const db = require("./connection");
const { Category, Recipe, User } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Category", "categories");
  await cleanDB("Recipe", "recipes");
  await cleanDB("User", "users");

  const categories = await Category.create([
    { name: "Breakfast" },
    { name: "Lunch" },
    { name: "Dinner" },
    { name: "Desert" },
    { name: "Snack" },
  ]);

  console.log("Categories seeded");

  const users = await User.create([
    {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      password: "password9876m",
    },
    {
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice@example.com",
      password: "password98765",
    },
    {
      firstName: "Bob",
      lastName: "Smith",
      email: "bob@example.com",
      password: "bobpassword789",
    },
    {
      firstName: "Eva",
      lastName: "Brown",
      email: "eva@example.com",
      password: "evapass4321",
    },
    {
      firstName: "Charlie",
      lastName: "Miller",
      email: "charlie@example.com",
      password: "charliepass",
    },
  ]);

  console.log("Users seeded");

  const recipesData = [
    {
      title: "Vegetarian Pasta",
      description: "A delicious and healthy vegetarian pasta dish.",
      category: categories[2]._id,
      ingredients: [
        "Pasta",
        "Tomatoes",
        "Bell Peppers",
        "Spinach",
        "Olive Oil",
      ],
      preparationTime: 30,
      servings: 4,
      instructions:
        "Boil the pasta. Saute tomatoes, bell peppers, and spinach in olive oil. Mix with pasta.",
      notes: "Garnish with grated Parmesan cheese.",
    },
    {
      title: "Grilled Chicken Salad",
      description: "A light and refreshing salad with grilled chicken.",
      category: categories[1]._id,
      ingredients: [
        "Chicken Breast",
        "Lettuce",
        "Cherry Tomatoes",
        "Cucumbers",
        "Balsamic Vinaigrette",
      ],
      preparationTime: 25,
      servings: 3,
      instructions:
        "Grill the chicken breast. Mix with lettuce, cherry tomatoes, and cucumbers. Drizzle with balsamic vinaigrette.",
      notes: "Add croutons for extra crunch.",
    },
    {
      title: "Scrambled Eggs",
      description: "Delicious scrambled eggs for breakfast.",
      category: categories[0]._id,
      ingredients: ["Eggs", "Butter", "Salt", "Pepper"],
      preparationTime: 15,
      servings: 2,
      instructions:
        "Scramble the eggs in a pan with butter. Add salt and pepper to taste.",
      notes: "Serve hot with toast.",
    },
    {
      title: "Margherita Pizza",
      description: "Classic Margherita pizza with fresh tomatoes and basil.",
      category: categories[0]._id,
      ingredients: [
        "Pizza Dough",
        "Tomatoes",
        "Fresh Mozzarella",
        "Basil",
        "Olive Oil",
      ],
      preparationTime: 20,
      servings: 2,
      instructions:
        "Roll out the pizza dough. Top with sliced tomatoes and fresh mozzarella. Bake until crust is golden. Garnish with fresh basil and a drizzle of olive oil.",
      notes: "For extra flavor, sprinkle with a pinch of salt.",
    },
    {
      title: "Vegetable Stir-Fry",
      description: "Quick and healthy vegetable stir-fry.",
      category: categories[2]._id,
      ingredients: [
        "Broccoli",
        "Carrots",
        "Bell Peppers",
        "Soy Sauce",
        "Ginger",
        "Garlic",
      ],
      preparationTime: 15,
      servings: 3,
      instructions:
        "Stir-fry broccoli, carrots, and bell peppers in a pan with soy sauce, ginger, and garlic. Serve hot.",
      notes: "Sprinkle sesame seeds for added crunch.",
    },
    {
      title: "Berry Smoothie",
      description: "Refreshing berry smoothie for a quick breakfast.",
      category: categories[0]._id,
      ingredients: ["Mixed Berries", "Yogurt", "Honey", "Banana"],
      preparationTime: 10,
      servings: 2,
      instructions:
        "Blend mixed berries, yogurt, honey, and banana until smooth. Pour into glasses and enjoy.",
      notes: "Add a handful of spinach for a nutritional boost.",
    },
    {
      title: "Spaghetti Bolognese",
      description: "Classic Spaghetti Bolognese with savory meat sauce.",
      category: categories[0]._id,
      ingredients: [
        "Spaghetti",
        "Ground Beef",
        "Tomato Sauce",
        "Onion",
        "Garlic",
        "Herbs",
      ],
      preparationTime: 40,
      servings: 4,
      instructions:
        "Cook spaghetti. In a pan, brown ground beef with onion and garlic. Add tomato sauce and herbs. Simmer until sauce thickens. Serve over spaghetti.",
      notes: "Top with grated Parmesan cheese.",
    },
    {
      title: "Caprese Salad",
      description:
        "Simple and elegant Caprese salad with fresh mozzarella and tomatoes.",
      category: categories[1]._id,
      ingredients: ["Tomatoes", "Fresh Mozzarella", "Basil", "Balsamic Glaze"],
      preparationTime: 15,
      servings: 2,
      instructions:
        "Slice tomatoes and fresh mozzarella. Arrange on a plate with fresh basil. Drizzle with balsamic glaze.",
      notes: "Sprinkle with salt and pepper for extra flavor.",
    },
    {
      title: "Chicken Alfredo Pasta",
      description: "Creamy Chicken Alfredo pasta for a comforting meal.",
      category: categories[2]._id,
      ingredients: [
        "Fettuccine Pasta",
        "Chicken Breast",
        "Alfredo Sauce",
        "Parmesan Cheese",
      ],
      preparationTime: 30,
      servings: 3,
      instructions:
        "Cook fettuccine pasta. Grill chicken breast and slice. Mix with Alfredo sauce and Parmesan cheese. Serve hot.",
      notes: "Garnish with chopped parsley.",
    },
    {
      title: "Mango Salsa",
      description: "Fresh and vibrant mango salsa for dipping or topping.",
      category: categories[1]._id,
      ingredients: ["Mango", "Red Onion", "Cilantro", "Lime Juice"],
      preparationTime: 15,
      servings: 4,
      instructions:
        "Dice mango and red onion. Mix with chopped cilantro and lime juice. Chill before serving.",
      notes: "Great with tortilla chips or grilled chicken.",
    },
    {
      title: "Greek Salad",
      description: "Classic Greek salad with feta cheese and olives.",
      category: categories[1]._id,
      ingredients: [
        "Cucumbers",
        "Tomatoes",
        "Feta Cheese",
        "Olives",
        "Oregano",
      ],
      preparationTime: 20,
      servings: 3,
      instructions:
        "Chop cucumbers, tomatoes, and olives. Mix with crumbled feta cheese. Sprinkle with oregano.",
      notes: "Drizzle with olive oil before serving.",
    },
    {
      title: "Vegetable Curry",
      description: "Flavorful vegetable curry with a variety of spices.",
      category: categories[2]._id,
      ingredients: [
        "Mixed Vegetables",
        "Coconut Milk",
        "Curry Paste",
        "Basmati Rice",
      ],
      preparationTime: 40,
      servings: 4,
      instructions:
        "Simmer mixed vegetables in coconut milk and curry paste. Serve over basmati rice.",
      notes: "Garnish with fresh cilantro.",
    },
    {
      title: "Banana Pancakes",
      description:
        "Light and fluffy banana pancakes for a delightful breakfast.",
      category: categories[0]._id,
      ingredients: ["Bananas", "Flour", "Milk", "Eggs", "Maple Syrup"],
      preparationTime: 25,
      servings: 2,
      instructions:
        "Mash bananas and mix with flour, milk, and eggs. Cook as pancakes. Drizzle with maple syrup.",
      notes: "Add a sprinkle of cinnamon for extra flavor.",
    },
    {
      title: "Tomato Basil Soup",
      description: "Comforting tomato basil soup with a hint of garlic.",
      category: categories[1]._id,
      ingredients: [
        "Tomatoes",
        "Fresh Basil",
        "Onion",
        "Garlic",
        "Vegetable Broth",
      ],
      preparationTime: 35,
      servings: 3,
      instructions:
        "Saute onion and garlic. Add tomatoes, fresh basil, and vegetable broth. Simmer until flavors meld. Blend until smooth.",
      notes: "Serve with a side of crusty bread.",
    },
    {
      title: "Shrimp Scampi",
      description: "Garlicky shrimp scampi with a touch of lemon.",
      category: categories[2]._id,
      ingredients: [
        "Shrimp",
        "Garlic",
        "Butter",
        "Lemon",
        "Parsley",
        "Linguine",
      ],
      preparationTime: 25,
      servings: 2,
      instructions:
        "Cook linguine. Saute shrimp in garlic, butter, and lemon. Toss with linguine. Garnish with chopped parsley.",
      notes: "Sprinkle with grated Parmesan cheese.",
    },
    {
      title: "Quinoa Salad",
      description: "Healthy quinoa salad with colorful vegetables.",
      category: categories[3]._id,
      ingredients: [
        "Quinoa",
        "Cherry Tomatoes",
        "Cucumbers",
        "Feta Cheese",
        "Balsamic Vinaigrette",
      ],
      preparationTime: 20,
      servings: 3,
      instructions:
        "Cook quinoa. Mix with cherry tomatoes, cucumbers, and crumbled feta cheese. Drizzle with balsamic vinaigrette.",
      notes: "Add black olives for extra flavor.",
    },
    {
      title: "Beef Tacos",
      description: "Classic beef tacos with all the toppings.",
      category: categories[0]._id,
      ingredients: [
        "Ground Beef",
        "Taco Seasoning",
        "Tortillas",
        "Lettuce",
        "Tomatoes",
        "Cheese",
      ],
      preparationTime: 30,
      servings: 4,
      instructions:
        "Brown ground beef with taco seasoning. Fill tortillas with beef, lettuce, tomatoes, and cheese.",
      notes: "Top with salsa and sour cream.",
    },
    {
      title: "Chocolate Chip Cookies",
      description: "Soft and chewy chocolate chip cookies.",
      category: categories[4]._id,
      ingredients: [
        "Flour",
        "Butter",
        "Brown Sugar",
        "Chocolate Chips",
        "Vanilla Extract",
      ],
      preparationTime: 15,
      servings: 24,
      instructions:
        "Cream butter and brown sugar. Mix in flour, chocolate chips, and vanilla extract. Drop onto baking sheets and bake until golden.",
      notes: "Allow to cool before serving.",
    },
    {
      title: "Lemon Garlic Roast Chicken",
      description:
        "Juicy roast chicken with a zesty lemon and garlic marinade.",
      category: categories[1]._id,
      ingredients: [
        "Whole Chicken",
        "Lemon",
        "Garlic",
        "Rosemary",
        "Olive Oil",
      ],
      preparationTime: 2 * 60,
      servings: 6,
      instructions:
        "Marinate whole chicken with lemon, garlic, rosemary, and olive oil. Roast until golden and juices run clear.",
      notes: "Serve with roasted vegetables on the side.",
    },
    {
      title: "Ratatouille",
      description: "Classic French ratatouille with colorful vegetables.",
      category: categories[2]._id,
      ingredients: [
        "Eggplant",
        "Zucchini",
        "Bell Peppers",
        "Tomatoes",
        "Herbs de Provence",
      ],
      preparationTime: 40,
      servings: 4,
      instructions:
        "Slice vegetables and layer in a baking dish. Sprinkle with herbs de Provence. Bake until vegetables are tender.",
      notes: "Serve as a side or over rice.",
    },
    {
      title: "Pineapple Fried Rice",
      description:
        "Sweet and savory pineapple fried rice with vegetables and tofu.",
      category: categories[3]._id,
      ingredients: [
        "Cooked Rice",
        "Pineapple",
        "Tofu",
        "Carrots",
        "Peas",
        "Soy Sauce",
      ],
      preparationTime: 25,
      servings: 4,
      instructions:
        "Saute tofu, carrots, and peas. Add cooked rice, pineapple, and soy sauce. Stir until heated through.",
      notes: "Garnish with chopped green onions.",
    },
  ];
  const recipes = await Recipe.create(
    recipesData.map((recipe, index) => ({
      ...recipe,
      author: users[index % users.length]._id,
    }))
  );

  console.log("Recipes seeded");

  process.exit();
});
