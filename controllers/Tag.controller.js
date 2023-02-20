const PackagedModel = require("../models/Packaged.model")
const GenericModel = require("../models/Generic.model")

const Tag = require("../models/Tag.model")
const healthTags = ['alcohol-cocktail', 'alcohol-free', 'celery-free','crustacean-free','dairy-free', 'dash','egg-free','fish-free','fodmap-free','gluten-free','immuno-supportive','keto-friendly','kidney-friendly','kosher','low-fat-abs','low-potassium','low-sugar','lupine-free','mediterranean',
'mollusk-free','mustard-free', 'no-oil-added','paleo','peanut-free','pescatarian','pork-free','red-meat-free','sesame-free','shellfish-free','soy-free','sugar-conscious','sulfite-free','tree-nut-free',
'vegan','vegetarian','wheat-free']

exports.getTags = async (req, res) => {
    try {
        const tags = await Tag.find()
        return res.json({ 
            success: true ,
            list: tags
        })  
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}

exports.addTags = async (req, res) => {
    try {
        const label = req.body.label
        const description = req.body.description
        const tag = await Tag.find({label: label})
        if (tag.length > 0) {
            return res.json({success: false, message: 'duplicate tag' })
        }
        const newTag = new Tag()
        newTag.label = label
        newTag.description = description
        await newTag.save()
        res.json({success:true, tag: newTag})
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}
exports.deleteTags = async (req, res) => {
    try {
        const id = req.params.id
        const tag = await Tag.findById(id)
        await Tag.findByIdAndDelete(id)
        
        return res.json({ 
            success: true ,
            tag: tag
        })  
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}

exports.addPackagedRecipeTags = async (req, res) => {
    try {
        const tagId = req.body.tag_ID
        const recipeId = req.body.recipe_ID
        const recipe = await PackagedModel.findById(recipeId)
        const tag = await Tag.findById(tagId)
        recipe.aharaTags.push(tag.label)
        await recipe.save()

        res.json({success:true, tag: tag})
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}
exports.addGenericRecipeTags = async (req, res) => {
    try {
        const tagId = req.body.tag_ID
        const recipeId = req.body.recipe_ID
        const recipe = await GenericModel.findById(recipeId)
        const tag = await Tag.findById(tagId)
        recipe.aharaTags.push(tag.label)
        await recipe.save()

        res.json({success:true, tag: tag})
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}

exports.deletePackagedRecipeTags = async (req, res) => {
    try {
        const recipeId = req.params.recipeId
        const tag = req.params.tag
        const recipe = await PackagedModel.findById(recipeId)
        recipe.aharaTags = recipe.aharaTags.filter(item => item !== tag)
        await recipe.save()
        
        return res.json({ 
            success: true ,
        })  
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}
exports.deleteGenericRecipeTags = async (req, res) => {
    try {
        const recipeId = req.params.recipeId
        const tag = req.params.tag
        const recipe = await GenericModel.findById(recipeId)
        recipe.aharaTags = recipe.aharaTags.filter(item => item !== tag)
        await recipe.save()
        
        return res.json({ 
            success: true ,
        })  
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}

exports.searchTags = async (req, res) => {
    try {
        const tag = req.params.tag
        const newTags = healthTags.filter(itm => itm.includes(tag));
        const tags = await Tag.find().where({label : {$regex: tag, $options: 'i'}})
        for (let i = 0; i < tags.length; i++) {
            newTags.push(tags[i].label)
        }
        return res.json({
            success: true,
            list: newTags
        })
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}