const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const createToken = (user,secret,expiresIn) => {
    const {username,email} = user
    return jwt.sign({username,email}, secret, {expiresIn})
}

exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args, {Recipe}) => {
            return await Recipe.find()
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
            return await Recipe.findOne({_id})
        }
    },
    Mutation: {
        addRecipe: async (root,args, {Recipe}) => {
            const {name,description, category, instructions, username} = args
            return await new Recipe({
                name,description, category, instructions, username
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
                token: createToken(newUser,process.env.SECRET,'1hr')
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
                token: createToken(user,process.env.SECRET,'1hr')
            }
        }
    }
}