const jwt = require('jsonwebtoken')

const createToken = (user,secret,expiresIn) => {
    const {username,email} = user
    return jwt.sign({username,email}, secret, {expiresIn})
}

exports.resolvers = {
    Query: {
        getAllRecipes: async (root, args, {Recipe}) => {
            return await Recipe.find()
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
        }
    }
}