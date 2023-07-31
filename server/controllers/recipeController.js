// require('../models/database')
const Category = require('../models/Category')
const Recipe = require('../models/Recipe')

exports.Homepage = async(req, res)=>{

    try {
        const limitNumber = 5;
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find( {} ).sort({_id:-1}).limit(limitNumber);
        const spanish = await Recipe.find({'category':'Spanish'}).limit(limitNumber);
        const american = await Recipe.find({'category':'American'}).limit(limitNumber);
        const mexican = await Recipe.find({'category':'Mexican'}).limit(limitNumber);
        const chinesse = await Recipe.find({'category':'Chinesse'}).limit(limitNumber);
        // const food ={ latest }

        res.render('index', {title:'Food Blog-Home',categories,chinesse,mexican,american,spanish,  latest})
    } catch (error) {
        res.status(500).json({
            message:"Error occurred", error
        })
    }
}

// get categories

exports.exploreCategories = async(req, res)=>{

    try {
        const limitNumber = 20;
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', {title:'Food Blog-Categories ',categories})
    } catch (error) {
        res.status(500).json({
            message:"Error occurred", error
        })
    }
}

//explore categories by id 

exports.exploreCategoriesById = async(req, res)=>{

    try {
        let categoryId  = req.params.id;
        const limitNumber = 20;
        const categoryById = await Recipe.find({'category':categoryId}).limit(limitNumber);
        res.render('categories', {title:'Food Blog-Categories ',categoryById})
    } catch (error) {
        res.status(500).json({
            message:"Error occurred", error
        })
    }
}

// explore recipes
exports.exploreRecipe = async(req, res)=>{

    try {
        let recipeid = req.params.id;
        const recipe = await Recipe.findById(recipeid)
      
        res.render('recipe', {title:'Food Blog-Recipe ',recipe})
    } catch (error) {
        res.status(500).json({
            message:"Error occurred", error
        })
    }
}

exports.searchRecipe = async(req,res)=>{

    try {
let searchTerm = req.body.searchTerm;
let recipe = await Recipe.find( {$text:{ $search:searchTerm, $diacriticSensitive:true}})
res.render('search',{title:'Food blog - search',recipe})

        
    } catch (error) {
        
    }

   

}

exports.exploreLatest = async(req, res)=>{

    try {
       let limitNumber = 5;
       let recipe = await Recipe.find().sort({_id: -1}).limit(limitNumber)
      
        res.render('explore-latest', {title:'Food Blog-Recipe ',recipe})
    } catch (error) {
        res.status(500).json({
            message:"Error occurred", error
        })
    }
}
exports.exploreRandom = async(req, res)=>{

    try {
        let count = await Recipe.find().countDocuments()
        let random = Math.floor(Math.random() * count)
        let recipe = await Recipe.findOne().skip(random).exec();
       
     
        res.render('explore-random', {title:'Food Blog-Recipe ',recipe})
    } catch (error) {
        res.status(500).json({
            message:"Error occurred", error
        })
    }
}

// submt
exports.submitRecipe = async(req, res)=>{

    const infoErrorsObj = req.flash('infoErrors')
    const infoSubmitObj = req.flash('infoSubmit')
    
    res.render('submit-recipe',{title:"Food Blog-Submit Recipe" ,infoErrorsObj,infoSubmitObj})
}

exports.submitRecipeOnRecipe = async(req,res)=>{
    try {

        let imageUploadFile;
        let uploadPath;
        let newImageName
        if(!req.files || Object.keys(req.files).length === 0){
            console.log('No files uploaded')
        }else{
            imageUploadFile = req.files.image
            newImageName = Date.now()+imageUploadFile.name

            uploadPath = require('path').resolve('./') + '/public/uploads/'+newImageName
            imageUploadFile.mv(uploadPath, function(err){
                if(err) return res.status(500).send(err)
            })
        }

        const newRecipe = new Recipe({
            name:req.body.name,
            description:req.body.description,
            email:req.body.email,
            ingredients:req.body.ingredients,
            category: req.body.category,
            image: newImageName


        });
        await newRecipe.save();


        req.flash('infoSubmit','Recipe has been added')
    res.redirect('/submit-recipe')  
    } catch (error) {
        res.send(error)
        req.flash('infoErrors','Recipe could not be added')
        res.redirect('/submit-recipe') 
    }
  
}





// async function insertdummydata(){
//     try {
//         await Category.insertMany(
//             [
//                 {
//                     "name":"Thai",
//                     "image":"american-food.jpg"
//                 },
//                 {
//                     "name":"Chinesse",
//                     "image":"chinesse.jpg"
//                 },
//                 {
//                     "name":"Spanish",
//                     "image":"spanish.jpg"
//                 },
//                 {
//                     "name":"Mexican",
//                     "image":"mexican.jpg"
//                 },
//                 {
//                     "name":"indian",
//                     "image":"indian.jpg"
//                 }

//             ]
//         )
//     } catch (error) {
//         console.log(error)
//     }
// }

// insertdummydata()