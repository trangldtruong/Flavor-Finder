const { User, Recipe, Category} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth.js');

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        recipes: async (parent, { category, name}) => {
            const params = {};

            if(category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex: name,
                };
            }

            return await Recipe.find(params).populate('category');
        },

        recipe: async( parent, { _id }) => {
            return await Recipe.findById(_id).populate('category');
        },
        user: async ( parent, args, context) => {
            if( context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'recipes',
                    populate: 'category',
                });

                return user;
            }

            throw AuthenticationError;
        },
        
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user};
        },
        addRecipe: async (parent, args) => {
            if (context.user) {
                const recipe = new Recipe({});
                
                await User.findByIdAndUpdate(context.user._id, {
                    $push: { recipes: recipe},
                });

                return recipe;
            }

            throw AuthenticationError;
        },
        updateRecipe: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context._id, args, {
                    new: true,
                });
            }

            throw AuthenticationError
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


    },
};

module.exports = resolvers;