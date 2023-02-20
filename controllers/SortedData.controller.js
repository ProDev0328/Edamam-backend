import VitaminB12_SortedCache_Generic from "../models/VitaminB12_SortedCache_Generic.model"
import VitaminB12_SortedCache_Packaged from "../models/VitaminB12_SortedCache_Packaged.model"
import VitaminD_SortedCache_Generic from "../models/VitaminD_SortedCache_Generic.model"
import VitaminD_SortedCache_Packaged from "../models/VitaminD_SortedCache_Packaged.model"
import VitaminC_SortedCache_Generic from "../models/VitaminC_SortedCache_Generic.model"
import VitaminC_SortedCache_Packaged from "../models/VitaminC_SortedCache_Packaged.model"
import Magnesium_SortedCache_Generic from "../models/Magnesium_SortedCache_Generic.model"
import Magnesium_SortedCache_Packaged from "../models/Magnesium_SortedCache_Packaged.model"
import Choline_SortedCache_Generic from "../models/Choline_SortedCache_Generic.model"
import Choline_SortedCache_Packaged from "../models/Choline_SortedCache_Packaged.model"
import Omega3_SortedCache_Generic from "../models/Omega3_SortedCache_Generic.model"
import Omega3_SortedCache_Packaged  from "../models/Omega3_SortedCache_Packaged.model"

exports.getSortedData = async (req, res) => {
    try {
        const db = req.query.source
        const nutrient = req.query.nutrient
        if (nutrient == 'VitaminB12' && db == 'generic') {
            const data = await VitaminB12_SortedCache_Generic.find()
            return res.json({ 
                success: true ,
                list: data
            })  
        }
        if (nutrient == 'VitaminB12' && db == 'packaged') {
            const data = await VitaminB12_SortedCache_Packaged.find()
            return res.json({ 
                success: true ,
                list: data
            })  
        }
        if (nutrient == 'VitaminC' && db == 'generic') {
            const data = await VitaminC_SortedCache_Generic.find()
            return res.json({ 
                success: true ,
                list: data
            })  
        }
        if (nutrient == 'VitaminC' && db == 'packaged') {
            const data = await VitaminC_SortedCache_Packaged.find()
            return res.json({ 
                success: true ,
                list: data
            })  
        }
        if (nutrient == 'VitaminD' && db == 'generic') {
            const data = await VitaminD_SortedCache_Generic.find()
            return res.json({ 
                success: true ,
                list: data
            })  
        }
        if (nutrient == 'VitaminD' && db == 'packaged') {
            const data = await VitaminD_SortedCache_Packaged.find()
            return res.json({ 
                success: true ,
                list: data
            })  
        }
        if (nutrient == 'Magnesium' && db == 'generic') {
            const data = await Magnesium_SortedCache_Generic.find()
            return res.json({ 
                success: true ,
                list: data
            })  
        }
        if (nutrient == 'Magnesium' && db == 'packaged') {
            const data = await Magnesium_SortedCache_Packaged.find()
            return res.json({ 
                success: true ,
                list: data
            })  
        }
        if (nutrient == 'Choline' && db == 'generic') {
            const data = await Choline_SortedCache_Generic.find()
            return res.json({ 
                success: true ,
                list: data
            })  
        }
        if (nutrient == 'Choline' && db == 'packaged') {
            const data = await Choline_SortedCache_Packaged.find()
            return res.json({ 
                success: true ,
                list: data
            })  
        }
        if (nutrient == 'Omega3' && db == 'generic') {
            const data = await Omega3_SortedCache_Generic.find()
            return res.json({ 
                success: true ,
                list: data
            })  
        }
        if (nutrient == 'Omega3' && db == 'packaged') {
            const data = await Omega3_SortedCache_Packaged.find()
            return res.json({ 
                success: true ,
                list: data
            })  
        }
        
       
    } catch (e) {
        return res.status(500).json({ success: false, message: e.message })
    }
}
