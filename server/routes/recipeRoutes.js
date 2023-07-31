const express  = require('express')
const Category = require('../models/Category')
const foodRecipes = require('../models/Recipe') 

const router = express.Router()
const recipeController = require('../controllers/recipeController')
const staticController = require('../controllers/staticController')

router.get('/', recipeController.Homepage);
router.get('/categories',recipeController.exploreCategories)
router.get('/recipe/:id', recipeController.exploreRecipe)
router.get('/categories/:id', recipeController.exploreCategoriesById)
router.post('/search',recipeController.searchRecipe)
router.get('/explore-latest',recipeController.exploreLatest)
router.get('/explore-random',recipeController.exploreRandom)
router.get('/submit-recipe',recipeController.submitRecipe);
router.post('/submit-recipe',recipeController.submitRecipeOnRecipe)
router.get('/about-page',staticController.AboutPage)
router.post('/addRecipe', function(req,res,next){

   
    let Recipes = new foodRecipes({
        name:"Poached Egg",
        description:"Mix spices together Saute onion, garlic and ginger in a skillet.Add broth and tomatoes, simmer.Blend mixture in a blender as directed then return to skillet.Season sauce then add chicken ",
        ingredients:[
            "Chicken breasts",
            "Canned tomatoes",
            "Fresh onion, garlic and ginger",
            "Olive oil ",
            "Low-sodium chicken broth",
            "Cornstarch",
            "Heavy cream",
            "Chopped cilantro ",
          

        ],
        email:'curry-world.co.uk',
        category:'Mexican',
        image:'chicken-curry.jpg'

        
    })

    // let Foodobj = new Category({
       
    //     image:'indian.jpg'
    // })
    Recipes.save()
    .then(function(Recipes){
        res.status(200).json({
            status:'Success',
            message:'Recipe added successfully',
            fooddetails:Recipes
        })
    }).catch(function(error){
        res.status(500).json({
            status:'Failed',
            message:'Unable to add Recipe',
            error
        })
    })
})

module.exports = router;