const VitaminB12Generic = require("../models/VitaminB12_SortedCache_Generic.model") 
const VitaminB12Packaged = require("../models/VitaminB12_SortedCache_Packaged.model")
const VitaminDGeneric = require("../models/VitaminD_SortedCache_Generic.model")
const VitaminDPackaged = require("../models/VitaminD_SortedCache_Packaged.model")
const VitaminCGeneric = require("../models/VitaminC_SortedCache_Generic.model")
const VitaminCPackaged = require("../models/VitaminC_SortedCache_Packaged.model")
const MagnesiumGeneric = require("../models/Magnesium_SortedCache_Generic.model")
const MagnesiumPackaged = require("../models/Magnesium_SortedCache_Packaged.model")
const CholineGeneric = require("../models/Choline_SortedCache_Generic.model")
const CholinePackaged = require("../models/Choline_SortedCache_Packaged.model")
const Omega3Generic = require("../models/Omega3_SortedCache_Generic.model")
const Omega3Packaged = require("../models/Omega3_SortedCache_Packaged.model")
const Polyphenols = require("../models/Polyphenols.model")
const SolubleFiber = require("../models/SolubleFiber.model")
const Generic = require("../models/Generic.model")
const Packaged = require("../models/Packaged.model")

exports.getSortedData = async (req, res) => {
    try {
        const db = req.query.source
        const nutrient = req.query.nutrient
        const page = req.query.pagenum || 1;
        const limit = parseInt(req.query.perPage) || 20;
        const skip = page * limit - limit;
        if (nutrient == 'VitaminB12' && db == 'generic') {
            const data = await VitaminB12Generic.find().skip(skip).limit(limit)
            const count = await VitaminB12Generic.countDocuments()
            return res.json({ 
                success: true ,
                list: data,
                totalResults: count,
                number: limit
            })  
        }
        if (nutrient == 'VitaminB12' && db == 'packaged') {
            const data = await VitaminB12Packaged.find().skip(skip).limit(limit)
            const count = await VitaminB12Packaged.countDocuments()
            return res.json({ 
                success: true ,
                list: data,
                totalResults: count,
                number: limit
            })  
        }
        if (nutrient == 'VitaminC' && db == 'generic') {
            const data = await VitaminCGeneric.find().skip(skip).limit(limit)
            const count = await VitaminCGeneric.countDocuments()
            return res.json({ 
                success: true ,
                list: data,
                totalResults: count,
                number: limit
            })  
        }
        if (nutrient == 'VitaminC' && db == 'packaged') {
            const data = await VitaminCPackaged.find().skip(skip).limit(limit)
            const count = await VitaminCPackaged.countDocuments()
            return res.json({ 
                success: true ,
                list: data,
                totalResults: count,
                number: limit
            })  
        }
        if (nutrient == 'VitaminD' && db == 'generic') {
            const data = await VitaminDGeneric.find().skip(skip).limit(limit)
            const count = await VitaminDGeneric.countDocuments()
            return res.json({ 
                success: true ,
                list: data,
                totalResults: count,
                number: limit
            })  
        }
        if (nutrient == 'VitaminD' && db == 'packaged') {
            const data = await VitaminDPackaged.find().skip(skip).limit(limit)
            const count = await VitaminDPackaged.countDocuments()
            return res.json({ 
                success: true ,
                list: data,
                totalResults: count,
                number: limit
            })  
        }
        if (nutrient == 'Magnesium' && db == 'generic') {
            const data = await MagnesiumGeneric.find().skip(skip).limit(limit)
            const count = await MagnesiumGeneric.countDocuments()
            return res.json({ 
                success: true ,
                list: data,
                totalResults: count,
                number: limit
            })  
        }
        if (nutrient == 'Magnesium' && db == 'packaged') {
            const data = await MagnesiumPackaged.find().skip(skip).limit(limit)
            const count = await MagnesiumPackaged.countDocuments()
            return res.json({ 
                success: true ,
                list: data,
                totalResults: count,
                number: limit
            })  
        }
        if (nutrient == 'Choline' && db == 'generic') {
            const data = await CholineGeneric.find().skip(skip).limit(limit)
            const count = await CholineGeneric.countDocuments()
            return res.json({ 
                success: true ,
                list: data,
                totalResults: count,
                number: limit
            })  
        }
        if (nutrient == 'Choline' && db == 'packaged') {
            const data = await CholinePackaged.find().skip(skip).limit(limit)
            const count = await CholinePackaged.countDocuments()
            return res.json({ 
                success: true ,
                list: data,
                totalResults: count,
                number: limit
            })  
        }
        if (nutrient == 'Omega3' && db == 'generic') {
            const data = await Omega3Generic.find().skip(skip).limit(limit)
            const count = await Omega3Generic.countDocuments()
            return res.json({ 
                success: true ,
                list: data,
                totalResults: count,
                number: limit
            })  
        }
        if (nutrient == 'Omega3' && db == 'packaged') {
            const data = await Omega3Packaged.find().skip(skip).limit(limit)
            const count = await Omega3Packaged.countDocuments()
            return res.json({ 
                success: true ,
                list: data,
                totalResults: count,
                number: limit
            })  
        }
        if (nutrient == 'Polyphenols') {
            const data = await Polyphenols.find().skip(skip).limit(limit)
            const count = await Polyphenols.countDocuments()
            return res.json({ 
                success: true ,
                list: data,
                totalResults: count,
                number: limit
            })  
        }
        if (nutrient == 'SolubleFiber') {
            const data = await SolubleFiber.find().skip(skip).limit(limit)
            const count = await SolubleFiber.countDocuments()
            return res.json({ 
                success: true ,
                list: data,
                totalResults: count,
                number: limit
            })  
        }
        
       
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}
