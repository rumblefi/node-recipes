const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


const createToken = (user,secret,expiresIn) => {
    const {username,email} = user
    return jwt.sign({username,email}, secret, {expiresIn})
}

exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args, {Recipe}) => {
            return await Recipe.find().sort({createdDate: 'desc'})
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
        updateRecipe: async(root, {firstName,secondName}, {Recipe}) => {
            const recipe = await Recipe.findOne({name: firstName})
            recipe.name = secondName
            return await recipe.save()
        }
    }
}