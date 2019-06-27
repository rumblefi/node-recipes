const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const createToken = (user,secret,expiresIn) => {
    const {username,email} = user
    return jwt.sign({username,email}, secret, {expiresIn})
}

exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args, {Recipe}) => {
            return await Recipe.find().sort({createdAt: 'desc'})
        },
        getCurrentUser: async(root,args,{currentUser,User}) => {
            if(!currentUser) {
                return null
            }
            return await User.findOne({username:currentUser.username})
                .populate({
                    path: 'favorites',
                    model: 'Recipe'
                })
        },
        getRecipe: async (root,{_id}, {Recipe}) => {
            if (!_id.match(/^[0-9a-fA-F]{24}$/)) throw new Error('Recipe not found')
            const recipe = await Recipe.findOne({_id})
            if(!recipe) throw new Error('Recipe not found')
            return recipe
        },
        getUserRecipes: async(root,{username}, {Recipe}) => {
            return await Recipe.find({username}).sort({createdAt: 'desc'})
        },
        isRecipeLiked: async(root,{recipeId,username}, {User}) => {
            const user = await User.findOne({username})            
            return await user.favorites.some(recipe => recipe.equals(recipeId))
        }
    },
    Mutation: {
        addRecipe: async (root,args, {Recipe}) => {
            const {name,imageURL,description, category, ingredients, instructions, username} = args
            return await new Recipe({
                name,imageURL,description, category, ingredients, instructions, username
            }).save()
        },
        signupUser: async (root,{username,email,password},{User}) => {
            const user = await User.findOne({username})
            if(user) {
                throw new Error('User already exists')
            }
            const newUser = new User({
                username,
                email,
                password
            }).save()
            return{
                token: createToken(newUser,process.env.SECRET,'10hr')
            }
        },
        signinUser: async (root,{username,password},{User}) => {
            const user = await User.findOne({username})
            if(!user) {
                throw new Error('Cannot find the user')
            }
            const isValidPassword = await bcrypt.compare(password,user.password)
            if(!isValidPassword) throw new Error('Invalid password')
            return{
                token: createToken(user,process.env.SECRET,'10hr')
            }
        },
        updateRecipe: async(root, {inputData: {_id,name,imageURL,description,category,ingredients,instructions}}, {Recipe}) => {
            const recipe = await Recipe.findOne({_id})
            if(!recipe) throw new Error('Recipe not found')
            recipe.name = name
            recipe.imageURL = imageURL
            recipe.description = description
            recipe.category = category
            recipe.ingredients = ingredients
            recipe.instructions = instructions
            return await recipe.save()
        },
        deleteRecipe: async(root,{_id}, {Recipe}) => {
            const recipe = await Recipe.findOne({_id})
            if(!recipe) throw new Error('Recipe not found')
            return await recipe.remove()
        },
        likeRecipe: async(root,{recipeId,username,doIncrement}, {Recipe,User}) => {
            if(doIncrement) {
                await User.updateOne({username}, { 
                    $push: { favorites: recipeId }
                })
                return await Recipe.findOneAndUpdate(
                    {_id:recipeId},
                    {$inc:{likes:1}},
                    {new: true}
                )
            }
            await User.updateOne({username}, { 
                $pull: { favorites: recipeId }
            })
            return await Recipe.findOneAndUpdate(
                {_id:recipeId},
                {$inc:{likes:-1}},
                {new: true}
            )
        },
        testLikeRecipe: async(root,{_id,username},{Recipe,User}) => {
            const recipe = await Recipe.findOneAndUpdate({_id},{$inc: {likes: 1}})
            await User.findOneAndUpdate({username}, {$addToSet: {favorites: _id}})
            return recipe
        },
        testUnlikeRecipe: async(root,{_id,username},{Recipe,User}) => {
            const recipe = await Recipe.findOneAndUpdate({_id},{$inc: {likes: -1}})
            await User.findOneAndUpdate({username}, {$pull: {favorites: _id}})
            return recipe
        }
    }
}