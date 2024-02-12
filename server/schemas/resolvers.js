const { User, Recipe, Category } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth.js");

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    recipes: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Recipe.find(params).populate("category").populate("author");
    },

    recipe: async (parent, { _id }) => {
      return await Recipe.findById(_id).populate("category").populate("author");
    },

    userRecipes: async (parent, args, context) => {
      if (context.user) {
        const recipe = await Recipe.find({ author: context.user._id }).populate(
          "category"
        );
        console.log(`"context.user": ${context.user}`);
        console.log(`"context.user": ${context.user._id}`);
        return recipe;
      }

      throw AuthenticationError;
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addRecipe: async (parent, args, context) => {
      if (context.user) {
        const recipe = await Recipe.create({
          ...args,
          author: context.user._id,
        });
        await recipe.save();

        await User.findByIdAndUpdate(context.user._id, {
          $push: { recipes: recipe },
        });

        return recipe;
        console.log(recipe);
      }

      throw new AuthenticationError("User not authenticated");
    },

    updateRecipe: async (parent, { _id, ...args }, context) => {
      if (context.user) {
        // Check if the user owns the recipe they're trying to update
        const recipe = await Recipe.findOne({ _id, author: context.user._id });

        // Update the recipe with the provided arguments
        Object.assign(recipe, args);

        // Save the updated recipe
        await recipe.save();

        return recipe;
      }

      throw new AuthenticationError("User not authenticated");
    },
    // updateRecipe: async (parent, { _id, ...args }, context) => {
    //   if (context.user) {
    //     return await Recipe.findByIdAndUpdate(_id, args, {
    //       new: true,
    //     });
    //   }

    //   throw AuthenticationError;
    // },

    // updateRecipe: async (parent, { _id, ...args }, context) => {
    //   if (context.user) {
    //     return await User.findByIdAndUpdate(context._id, args, {
    //       new: true,
    //     });
    //   }

    //   throw AuthenticationError;
    // },
    deleteRecipe: async (_, { _id }) => {
      try {
        // Delete the recipe from the database
        const deletedRecipe = await Recipe.findByIdAndDelete(_id);

        // Check if the recipe was found and deleted
        if (!deletedRecipe) {
          throw new Error("Recipe not found");
        }

        return deletedRecipe;
      } catch (error) {
        throw new Error(`Failed to delete recipe: ${error.message}`);
      }
    },
  },
};

module.exports = resolvers;
