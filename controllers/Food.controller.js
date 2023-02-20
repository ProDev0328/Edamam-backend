const GenericModel = require("../models/Generic.model")
const PackagedModel = require("../models/Packaged.model")

exports.findFood = async (req, res) => {
  try {
    const dbLabel = req.query.dbselect
    let db = null
    if (dbLabel == 'packaged') {
      db = PackagedModel
    } else if (dbLabel == 'generic') {
      db = GenericModel
    } else {
      return res.status(500).json({success: false, message: `Invalid ddatabase name ${dbLabel}`, params: 'packaged, generic'})
    }
    const searchLabel = req.query.q || ''
    const healthLabel = req.query.health || ''
    const cuisineTypeLabel = req.query.cuisineType || ''
    const caloriesLabel = req.query.calories || ''
    const timeLabel = req.query.time || ''
    const mealTypeLabel = req.query.mealType || ''
    const dishTypeLabel = req.query.dishType || ''
    const dietLabel = req.query.diet || ''
    const tagLabel = req.query.searchByTag || ''
    const page = req.query.pagenum || 1;
    const limit = parseInt(req.query.perPage) || 20;
    const skip = page * limit - limit;

    req.query.nutrients = req.query.nutrients || '';
    const CA = req.query.nutrients['CA'] || ''
    const CHOCDF = req.query.nutrients['CHOCDF'] || ''
    const CHOCDFNET = req.query.nutrients['CHOCDF.net'] || ''
    const CHOLE = req.query.nutrients['CHOLE'] || ''
    const ENERC_KCAL = req.query.nutrients['ENERC_KCAL'] || ''
    const FAMS = req.query.nutrients['FAMS'] || ''
    const FAPU = req.query.nutrients['FAPU'] || '' 
    const FASAT = req.query.nutrients['FASAT'] || ''
    const FAT = req.query.nutrients['FAT'] || ''
    const FATRN = req.query.nutrients['FATRN'] || ''
    const FE = req.query.nutrients['FE'] || ''
    const FIBTG = req.query.nutrients['FIBTG'] || ''
    const FOLAC = req.query.nutrients['FOLAC'] || ''
    const FOLDFE = req.query.nutrients['FOLDFE'] || ''
    const FOLFD = req.query.nutrients['FOLFD'] || ''
    const K = req.query.nutrients['K'] || ''
    const MG = req.query.nutrients['MG'] || ''
    const NA = req.query.nutrients['NA'] || ''
    const NIA = req.query.nutrients['NIA'] || ''
    const P = req.query.nutrients['P'] || ''
    const PROCNT = req.query.nutrients['PROCNT'] || ''
    const RIBF = req.query.nutrients['RIBF'] || ''
    const SUGAR = req.query.nutrients['SUGAR'] || ''
    const SUGARADDED = req.query.nutrients['SUGAR.added'] || ''
    const SugarAlcohol = req.query.nutrients['Sugar.alcohol'] || ''
    const THIA = req.query.nutrients['THIA'] || ''
    const TOCPHA = req.query.nutrients['TOCPHA'] || ''
    const VITA_RAE = req.query.nutrients['VITA_RAE'] || ''
    const VITB12 = req.query.nutrients['VITB12'] || ''
    const VITB6A = req.query.nutrients['VITB6A'] || ''
    const VITC = req.query.nutrients['VITC'] || ''
    const VITD = req.query.nutrients['VITD'] || ''
    const VITK1 = req.query.nutrients['VITK1'] || ''
    const WATER = req.query.nutrients['WATER'] || ''
    const ZN = req.query.nutrients['ZN'] || ''



    let minCal = 0
    let maxCal = 1000000000
    let minTime = 0
    let maxTime = 1000000000
    let minCA = 0
    let maxCA = 1000000000
    let minCHOCDF = 0
    let maxCHOCDF = 1000000000
    let minCHOCDFNET = 0
    let maxCHOCDFNET = 1000000000
    let minCHOLE = 0
    let maxCHOLE = 1000000000
    let minENERC_KCAL = 0
    let maxENERC_KCAL = 1000000000
    let minFAMS = 0
    let maxFAMS = 1000000000
    let minFAPU = 0
    let maxFAPU = 1000000000
    let minFASAT = 0
    let maxFASAT = 1000000000
    let minFAT = 0
    let maxFAT = 1000000000
    let minFATRN = 0
    let maxFATRN = 1000000000
    let minFE = 0
    let maxFE = 1000000000
    let minFIBTG = 0
    let maxFIBTG = 1000000000
    let minFOLAC = 0
    let maxFOLAC = 1000000000
    let minFOLDFE = 0
    let maxFOLDFE = 1000000000
    let minFOLFD = 0
    let maxFOLFD = 1000000000
    let minK = 0
    let maxK = 1000000000
    let minMG = 0
    let maxMG = 1000000000
    let minNA = 0
    let maxNA = 1000000000
    let minNIA = 0
    let maxNIA = 1000000000
    let minP = 0
    let maxP = 1000000000
    let minPROCNT = 0
    let maxPROCNT = 1000000000
    let minRIBF = 0
    let maxRIBF = 1000000000
    let minSUGAR = 0
    let maxSUGAR = 1000000000
    let minSUGARADDED = 0
    let maxSUGARADDED = 1000000000
    let minSugarAlcohol = 0
    let maxSugarAlcohol = 1000000000
    let minTHIA = 0
    let maxTHIA = 1000000000
    let minTOCPHA = 0
    let maxTOCPHA = 1000000000
    let minVITA_RAE = 0
    let maxVITA_RAE = 1000000000
    let minVITB12 = 0
    let maxVITB12 = 1000000000
    let minVITB6A = 0
    let maxVITB6A = 1000000000
    let minVITC = 0
    let maxVITC = 1000000000
    let minVITD = 0
    let maxVITD = 1000000000
    let minVITK1 = 0
    let maxVITK1 = 1000000000
    let minWATER = 0
    let maxWATER = 1000000000
    let minZN = 0
    let maxZN = 1000000000
    
    const mSp = caloriesLabel.split('-');
    const pSp = caloriesLabel.split('+');
    const mSpT = timeLabel.split('-');
    const pSpT = timeLabel.split('+');
    const mSpCA = CA.split('-')
    const pSpCA = CA.split('+')
    const mSpCHOCDF = CHOCDF.split('-')
    const pSpCHOCDF = CHOCDF.split('+')
    const mSpCHOCDFNET = CHOCDFNET.split('-')
    const pSpCHOCDFNET = CHOCDFNET.split('+')
    const mSpCHOLE = CHOLE.split('-')
    const pSpCHOLE = CHOLE.split('+')
    const mSpENERC_KCAL = ENERC_KCAL.split('-')
    const pSpENERC_KCAL = ENERC_KCAL.split('+')
    const mSpFAMS = FAMS.split('-')
    const pSpFAMS = FAMS.split('+')
    const mSpFAPU = FAPU.split('-')
    const pSpFAPU = FAPU.split('+')
    const mSpFASAT = FASAT.split('-')
    const pSpFASAT = FASAT.split('+')
    const mSpFAT = FAT.split('-')
    const pSpFAT = FAT.split('+')
    const mSpFATRN = FATRN.split('-')
    const pSpFATRN = FATRN.split('+')
    const mSpFE = FE.split('-')
    const pSpFE = FE.split('+')
    const mSpFIBTG = FIBTG.split('-')
    const pSpFIBTG = FIBTG.split('+')
    const mSpFOLAC = FOLAC.split('-')
    const pSpFOLAC = FOLAC.split('+')
    const mSpFOLDFE = FOLDFE.split('-')
    const pSpFOLDFE = FOLDFE.split('+')
    const mSpFOLFD = FOLFD.split('-')
    const pSpFOLFD = FOLFD.split('+')
    const mSpK = K.split('-')
    const pSpK = K.split('+')
    const mSpMG = MG.split('-')
    const pSpMG = MG.split('+')
    const mSpNA = NA.split('-')
    const pSpNA = NA.split('+')
    const mSpNIA = NIA.split('-')
    const pSpNIA = NIA.split('+')
    const mSpP = P.split('-')
    const pSpP = P.split('+')
    const mSpPROCNT = PROCNT.split('-')
    const pSpPROCNT = PROCNT.split('+')
    const mSpRIBF = RIBF.split('-')
    const pSpRIBF = RIBF.split('+')
    const mSpSUGAR = SUGAR.split('-')
    const pSpSUGAR = SUGAR.split('+')
    const mSpSUGARADDED = SUGARADDED.split('-')
    const pSpSUGARADDED = SUGARADDED.split('+')
    const mSpSugarAlcohol = SugarAlcohol.split('-')
    const pSpSugarAlcohol = SugarAlcohol.split('+')
    const mSpTHIA = THIA.split('-')
    const pSpTHIA = THIA.split('+')
    const mSpTOCPHA = TOCPHA.split('-')
    const pSpTOCPHA = TOCPHA.split('+')
    const mSpVITA_RAE = VITA_RAE.split('-')
    const pSpVITA_RAE = VITA_RAE.split('+')
    const mSpVITB12 = VITB12.split('-')
    const pSpVITB12 = VITB12.split('+')
    const mSpVITB6A = VITB6A.split('-')
    const pSpVITB6A = VITB6A.split('+')
    const mSpVITC = VITC.split('-')
    const pSpVITC = VITC.split('+')
    const mSpVITD = VITD.split('-')
    const pSpVITD = VITD.split('+')
    const mSpVITK1 = VITK1.split('-')
    const pSpVITK1 = VITK1.split('+')
    const mSpWATER = WATER.split('-')
    const pSpWATER = WATER.split('+')
    const mSpZN = ZN.split('-')
    const pSpZN = ZN.split('+')

    if(mSp.length == 2 && parseInt(mSp[1]) == mSp[1] && parseInt(mSp[0]) == mSp[0]) {
      minCal = parseInt(mSp[0])
      maxCal = parseInt(mSp[1])
    } else if (mSp.length == 2 && parseInt(mSp[0]) == mSp[0] && mSp[1] == '') {
      maxCal = parseInt(mSp[0])
    } else if (pSp.length == 2 && parseInt(pSp[0]) == pSp[0] && pSp[1] == '') {
      minCal = parseInt(pSp[0])
    } else if (caloriesLabel){
      return res.status(500).json({success: false, message: `Invalid parameter ${caloriesLabel}`, params: 'MIN-MAX, MIN+, MAX-'})
    }
     
    if(mSpT.length == 2 && parseInt(mSpT[1]) == mSpT[1] && parseInt(mSpT[0]) == mSpT[0]) {
      minTime = parseInt(mSpT[0])
      maxTime = parseInt(mSpT[1])
    } else if (mSpT.length == 2 && parseInt(mSpT[0]) == mSpT[0] && mSpT[1] == '') {
      maxTime = parseInt(mSpT[0])
    } else if (pSpT.length == 2 && parseInt(pSpT[0]) == pSpT[0] && pSpT[1] == '') {
      minTime = parseInt(pSpT[0])
    } else if (timeLabel){
      return res.status(500).json({success: false, message: `Invalid parameter ${timeLabel}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpCA.length == 2 && parseInt(mSpCA[1]) == mSpCA[1] && parseInt(mSpCA[0]) == mSpCA[0]) {
      minCA = parseInt(mSpCA[0])
      maxCA = parseInt(mSpCA[1])
    } else if (mSpCA.length == 2 && parseInt(mSpCA[0]) == mSpCA[0] && mSpCA[1] == '') {
      maxCA = parseInt(mSpCA[0])
    } else if (pSpCA.length == 2 && parseInt(pSpCA[0]) == pSpCA[0] && pSpCA[1] == '') {
      minCA = parseInt(pSpCA[0])
    } else if (CA){
      return res.status(500).json({success: false, message: `Invalid parameter ${CA}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpCHOCDF.length == 2 && parseInt(mSpCHOCDF[1]) == mSpCHOCDF[1] && parseInt(mSpCHOCDF[0]) == mSpCHOCDF[0]) {
      minCHOCDF = parseInt(mSpCHOCDF[0])
      maxCHOCDF = parseInt(mSpCHOCDF[1])
    } else if (mSpCHOCDF.length == 2 && parseInt(mSpCHOCDF[0]) == mSpCHOCDF[0] && mSpCHOCDF[1] == '') {
      maxCHOCDF = parseInt(mSpCHOCDF[0])
    } else if (pSpCHOCDF.length == 2 && parseInt(pSpCHOCDF[0]) == pSpCHOCDF[0] && pSpCHOCDF[1] == '') {
      minCHOCDF = parseInt(pSpCHOCDF[0])
    } else if (CHOCDF){
      return res.status(500).json({success: false, message: `Invalid parameter ${CHOCDF}`, params: 'MIN-MAX, MIN+, MAX-'})
    }
    if(mSpCHOCDFNET.length == 2 && parseInt(mSpCHOCDFNET[1]) == mSpCHOCDFNET[1] && parseInt(mSpCHOCDFNET[0]) == mSpCHOCDFNET[0]) {
      minCHOCDFNET = parseInt(mSpCHOCDFNET[0])
      maxCHOCDFNET = parseInt(mSpCHOCDFNET[1])
    } else if (mSpCHOCDFNET.length == 2 && parseInt(mSpCHOCDFNET[0]) == mSpCHOCDFNET[0] && mSpCHOCDFNET[1] == '') {
      maxCHOCDFNET = parseInt(mSpCHOCDFNET[0])
    } else if (pSpCHOCDFNET.length == 2 && parseInt(pSpCHOCDFNET[0]) == pSpCHOCDFNET[0] && pSpCHOCDFNET[1] == '') {
      minCHOCDFNET = parseInt(pSpCHOCDFNET[0])
    } else if (CHOCDFNET){
      return res.status(500).json({success: false, message: `Invalid parameter ${CHOCDFNET}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpCHOLE.length == 2 && parseInt(mSpCHOLE[1]) == mSpCHOLE[1] && parseInt(mSpCHOLE[0]) == mSpCHOLE[0]) {
      minCHOLE = parseInt(mSpCHOLE[0])
      maxCHOLE = parseInt(mSpCHOLE[1])
    } else if (mSpCHOLE.length == 2 && parseInt(mSpCHOLE[0]) == mSpCHOLE[0] && mSpCHOLE[1] == '') {
      maxCHOLE = parseInt(mSpCHOLE[0])
    } else if (pSpCHOLE.length == 2 && parseInt(pSpCHOLE[0]) == pSpCHOLE[0] && pSpCHOLE[1] == '') {
      minCHOLE = parseInt(pSpCHOLE[0])
    } else if (CHOLE){
      return res.status(500).json({success: false, message: `Invalid parameter ${CHOLE}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpENERC_KCAL.length == 2 && parseInt(mSpENERC_KCAL[1]) == mSpENERC_KCAL[1] && parseInt(mSpENERC_KCAL[0]) == mSpENERC_KCAL[0]) {
      minENERC_KCAL = parseInt(mSpENERC_KCAL[0])
      maxENERC_KCAL = parseInt(mSpENERC_KCAL[1])
    } else if (mSpENERC_KCAL.length == 2 && parseInt(mSpENERC_KCAL[0]) == mSpENERC_KCAL[0] && mSpENERC_KCAL[1] == '') {
      maxENERC_KCAL = parseInt(mSpENERC_KCAL[0])
    } else if (pSpENERC_KCAL.length == 2 && parseInt(pSpENERC_KCAL[0]) == pSpENERC_KCAL[0] && pSpENERC_KCAL[1] == '') {
      minENERC_KCAL = parseInt(pSpENERC_KCAL[0])
    } else if (ENERC_KCAL){
      return res.status(500).json({success: false, message: `Invalid parameter ${ENERC_KCAL}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpFAMS.length == 2 && parseInt(mSpFAMS[1]) == mSpFAMS[1] && parseInt(mSpFAMS[0]) == mSpFAMS[0]) {
      minFAMS = parseInt(mSpFAMS[0])
      maxFAMS = parseInt(mSpFAMS[1])
    } else if (mSpFAMS.length == 2 && parseInt(mSpFAMS[0]) == mSpFAMS[0] && mSpFAMS[1] == '') {
      maxFAMS = parseInt(mSpFAMS[0])
    } else if (pSpFAMS.length == 2 && parseInt(pSpFAMS[0]) == pSpFAMS[0] && pSpFAMS[1] == '') {
      minFAMS = parseInt(pSpFAMS[0])
    } else if (FAMS){
      return res.status(500).json({success: false, message: `Invalid parameter ${FAMS}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpFAPU.length == 2 && parseInt(mSpFAPU[1]) == mSpFAPU[1] && parseInt(mSpFAPU[0]) == mSpFAPU[0]) {
      minFAPU = parseInt(mSpFAPU[0])
      maxFAPU = parseInt(mSpFAPU[1])
    } else if (mSpFAPU.length == 2 && parseInt(mSpFAPU[0]) == mSpFAPU[0] && mSpFAPU[1] == '') {
      maxFAPU = parseInt(mSpFAPU[0])
    } else if (pSpFAPU.length == 2 && parseInt(pSpFAPU[0]) == pSpFAPU[0] && pSpFAPU[1] == '') {
      minFAPU = parseInt(pSpFAPU[0])
    } else if (FAPU){
      return res.status(500).json({success: false, message: `Invalid parameter ${FAPU}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpFASAT.length == 2 && parseInt(mSpFASAT[1]) == mSpFASAT[1] && parseInt(mSpFASAT[0]) == mSpFASAT[0]) {
      minFASAT = parseInt(mSpFASAT[0])
      maxFASAT = parseInt(mSpFASAT[1])
    } else if (mSpFASAT.length == 2 && parseInt(mSpFASAT[0]) == mSpFASAT[0] && mSpFASAT[1] == '') {
      maxFASAT = parseInt(mSpFASAT[0])
    } else if (pSpFASAT.length == 2 && parseInt(pSpFASAT[0]) == pSpFASAT[0] && pSpFASAT[1] == '') {
      minFASAT = parseInt(pSpFASAT[0])
    } else if (FASAT){
      return res.status(500).json({success: false, message: `Invalid parameter ${FASAT}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpFAT.length == 2 && parseInt(mSpFAT[1]) == mSpFAT[1] && parseInt(mSpFAT[0]) == mSpFAT[0]) {
      minFAT = parseInt(mSpFAT[0])
      maxFAT = parseInt(mSpFAT[1])
    } else if (mSpFAT.length == 2 && parseInt(mSpFAT[0]) == mSpFAT[0] && mSpFAT[1] == '') {
      maxFAT = parseInt(mSpFAT[0])
    } else if (pSpFAT.length == 2 && parseInt(pSpFAT[0]) == pSpFAT[0] && pSpFAT[1] == '') {
      minFAT = parseInt(pSpFAT[0])
    } else if (FAT){
      return res.status(500).json({success: false, message: `Invalid parameter ${FAT}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpFATRN.length == 2 && parseInt(mSpFATRN[1]) == mSpFATRN[1] && parseInt(mSpFATRN[0]) == mSpFATRN[0]) {
      minFATRN = parseInt(mSpFATRN[0])
      maxFATRN = parseInt(mSpFATRN[1])
    } else if (mSpFATRN.length == 2 && parseInt(mSpFATRN[0]) == mSpFATRN[0] && mSpFATRN[1] == '') {
      maxFATRN = parseInt(mSpFATRN[0])
    } else if (pSpFATRN.length == 2 && parseInt(pSpFATRN[0]) == pSpFATRN[0] && pSpFATRN[1] == '') {
      minFATRN = parseInt(pSpFATRN[0])
    } else if (FATRN){
      return res.status(500).json({success: false, message: `Invalid parameter ${FATRN}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpFE.length == 2 && parseInt(mSpFE[1]) == mSpFE[1] && parseInt(mSpFE[0]) == mSpFE[0]) {
      minFE = parseInt(mSpFE[0])
      maxFE = parseInt(mSpFE[1])
    } else if (mSpFE.length == 2 && parseInt(mSpFE[0]) == mSpFE[0] && mSpFE[1] == '') {
      maxFE = parseInt(mSpFE[0])
    } else if (pSpFE.length == 2 && parseInt(pSpFE[0]) == pSpFE[0] && pSpFE[1] == '') {
      minFE = parseInt(pSpFE[0])
    } else if (FE){
      return res.status(500).json({success: false, message: `Invalid parameter ${FE}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpFIBTG.length == 2 && parseInt(mSpFIBTG[1]) == mSpFIBTG[1] && parseInt(mSpFIBTG[0]) == mSpFIBTG[0]) {
      minFIBTG = parseInt(mSpFIBTG[0])
      maxFIBTG = parseInt(mSpFIBTG[1])
    } else if (mSpFIBTG.length == 2 && parseInt(mSpFIBTG[0]) == mSpFIBTG[0] && mSpFIBTG[1] == '') {
      maxFIBTG = parseInt(mSpFIBTG[0])
    } else if (pSpFIBTG.length == 2 && parseInt(pSpFIBTG[0]) == pSpFIBTG[0] && pSpFIBTG[1] == '') {
      minFIBTG = parseInt(pSpFIBTG[0])
    } else if (FIBTG){
      return res.status(500).json({success: false, message: `Invalid parameter ${FIBTG}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpFOLAC.length == 2 && parseInt(mSpFOLAC[1]) == mSpFOLAC[1] && parseInt(mSpFOLAC[0]) == mSpFOLAC[0]) {
      minFOLAC = parseInt(mSpFOLAC[0])
      maxFOLAC = parseInt(mSpFOLAC[1])
    } else if (mSpFOLAC.length == 2 && parseInt(mSpFOLAC[0]) == mSpFOLAC[0] && mSpFOLAC[1] == '') {
      maxFOLAC = parseInt(mSpFOLAC[0])
    } else if (pSpFOLAC.length == 2 && parseInt(pSpFOLAC[0]) == pSpFOLAC[0] && pSpFOLAC[1] == '') {
      minFOLAC = parseInt(pSpFOLAC[0])
    } else if (FOLAC){
      return res.status(500).json({success: false, message: `Invalid parameter ${FOLAC}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpFOLDFE.length == 2 && parseInt(mSpFOLDFE[1]) == mSpFOLDFE[1] && parseInt(mSpFOLDFE[0]) == mSpFOLDFE[0]) {
      minFOLDFE = parseInt(mSpFOLDFE[0])
      maxFOLDFE = parseInt(mSpFOLDFE[1])
    } else if (mSpFOLDFE.length == 2 && parseInt(mSpFOLDFE[0]) == mSpFOLDFE[0] && mSpFOLDFE[1] == '') {
      maxFOLDFE = parseInt(mSpFOLDFE[0])
    } else if (pSpFOLDFE.length == 2 && parseInt(pSpFOLDFE[0]) == pSpFOLDFE[0] && pSpFOLDFE[1] == '') {
      minFOLDFE = parseInt(pSpFOLDFE[0])
    } else if (FOLDFE){
      return res.status(500).json({success: false, message: `Invalid parameter ${FOLDFE}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpFOLFD.length == 2 && parseInt(mSpFOLFD[1]) == mSpFOLFD[1] && parseInt(mSpFOLFD[0]) == mSpFOLFD[0]) {
      minFOLFD = parseInt(mSpFOLFD[0])
      maxFOLFD = parseInt(mSpFOLFD[1])
    } else if (mSpFOLFD.length == 2 && parseInt(mSpFOLFD[0]) == mSpFOLFD[0] && mSpFOLFD[1] == '') {
      maxFOLFD = parseInt(mSpFOLFD[0])
    } else if (pSpFOLFD.length == 2 && parseInt(pSpFOLFD[0]) == pSpFOLFD[0] && pSpFOLFD[1] == '') {
      minFOLFD = parseInt(pSpFOLFD[0])
    } else if (FOLFD){
      return res.status(500).json({success: false, message: `Invalid parameter ${FOLFD}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpK.length == 2 && parseInt(mSpK[1]) == mSpK[1] && parseInt(mSpK[0]) == mSpK[0]) {
      minK = parseInt(mSpK[0])
      maxK = parseInt(mSpK[1])
    } else if (mSpK.length == 2 && parseInt(mSpK[0]) == mSpK[0] && mSpK[1] == '') {
      maxK = parseInt(mSpK[0])
    } else if (pSpK.length == 2 && parseInt(pSpK[0]) == pSpK[0] && pSpK[1] == '') {
      minK = parseInt(pSpK[0])
    } else if (K){
      return res.status(500).json({success: false, message: `Invalid parameter ${K}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpMG.length == 2 && parseInt(mSpMG[1]) == mSpMG[1] && parseInt(mSpMG[0]) == mSpMG[0]) {
      minMG = parseInt(mSpMG[0])
      maxMG = parseInt(mSpMG[1])
    } else if (mSpMG.length == 2 && parseInt(mSpMG[0]) == mSpMG[0] && mSpMG[1] == '') {
      maxMG = parseInt(mSpMG[0])
    } else if (pSpMG.length == 2 && parseInt(pSpMG[0]) == pSpMG[0] && pSpMG[1] == '') {
      minMG = parseInt(pSpMG[0])
    } else if (MG){
      return res.status(500).json({success: false, message: `Invalid parameter ${MG}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpNA.length == 2 && parseInt(mSpNA[1]) == mSpNA[1] && parseInt(mSpNA[0]) == mSpNA[0]) {
      minNA = parseInt(mSpNA[0])
      maxNA = parseInt(mSpNA[1])
    } else if (mSpNA.length == 2 && parseInt(mSpNA[0]) == mSpNA[0] && mSpNA[1] == '') {
      maxNA = parseInt(mSpNA[0])
    } else if (pSpNA.length == 2 && parseInt(pSpNA[0]) == pSpNA[0] && pSpNA[1] == '') {
      minNA = parseInt(pSpNA[0])
    } else if (NA){
      return res.status(500).json({success: false, message: `Invalid parameter ${NA}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpNIA.length == 2 && parseInt(mSpNIA[1]) == mSpNIA[1] && parseInt(mSpNIA[0]) == mSpNIA[0]) {
      minNIA = parseInt(mSpNIA[0])
      maxNIA = parseInt(mSpNIA[1])
    } else if (mSpNIA.length == 2 && parseInt(mSpNIA[0]) == mSpNIA[0] && mSpNIA[1] == '') {
      maxNIA = parseInt(mSpNIA[0])
    } else if (pSpNIA.length == 2 && parseInt(pSpNIA[0]) == pSpNIA[0] && pSpNIA[1] == '') {
      minNIA = parseInt(pSpNIA[0])
    } else if (NIA){
      return res.status(500).json({success: false, message: `Invalid parameter ${NIA}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpP.length == 2 && parseInt(mSpP[1]) == mSpP[1] && parseInt(mSpP[0]) == mSpP[0]) {
      minP = parseInt(mSpP[0])
      maxP = parseInt(mSpP[1])
    } else if (mSpP.length == 2 && parseInt(mSpP[0]) == mSpP[0] && mSpP[1] == '') {
      maxP = parseInt(mSpP[0])
    } else if (pSpP.length == 2 && parseInt(pSpP[0]) == pSpP[0] && pSpP[1] == '') {
      minP = parseInt(pSpP[0])
    } else if (P){
      return res.status(500).json({success: false, message: `Invalid parameter ${P}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpPROCNT.length == 2 && parseInt(mSpPROCNT[1]) == mSpPROCNT[1] && parseInt(mSpPROCNT[0]) == mSpPROCNT[0]) {
      minPROCNT = parseInt(mSpPROCNT[0])
      maxPROCNT = parseInt(mSpPROCNT[1])
    } else if (mSpPROCNT.length == 2 && parseInt(mSpPROCNT[0]) == mSpPROCNT[0] && mSpPROCNT[1] == '') {
      maxPROCNT = parseInt(mSpPROCNT[0])
    } else if (pSpPROCNT.length == 2 && parseInt(pSpPROCNT[0]) == pSpPROCNT[0] && pSpPROCNT[1] == '') {
      minPROCNT = parseInt(pSpPROCNT[0])
    } else if (PROCNT){
      return res.status(500).json({success: false, message: `Invalid parameter ${PROCNT}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpRIBF.length == 2 && parseInt(mSpRIBF[1]) == mSpRIBF[1] && parseInt(mSpRIBF[0]) == mSpRIBF[0]) {
      minRIBF = parseInt(mSpRIBF[0])
      maxRIBF = parseInt(mSpRIBF[1])
    } else if (mSpRIBF.length == 2 && parseInt(mSpRIBF[0]) == mSpRIBF[0] && mSpRIBF[1] == '') {
      maxRIBF = parseInt(mSpRIBF[0])
    } else if (pSpRIBF.length == 2 && parseInt(pSpRIBF[0]) == pSpRIBF[0] && pSpRIBF[1] == '') {
      minRIBF = parseInt(pSpRIBF[0])
    } else if (RIBF){
      return res.status(500).json({success: false, message: `Invalid parameter ${RIBF}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpSUGAR.length == 2 && parseInt(mSpSUGAR[1]) == mSpSUGAR[1] && parseInt(mSpSUGAR[0]) == mSpSUGAR[0]) {
      minSUGAR = parseInt(mSpSUGAR[0])
      maxSUGAR = parseInt(mSpSUGAR[1])
    } else if (mSpSUGAR.length == 2 && parseInt(mSpSUGAR[0]) == mSpSUGAR[0] && mSpSUGAR[1] == '') {
      maxSUGAR = parseInt(mSpSUGAR[0])
    } else if (pSpSUGAR.length == 2 && parseInt(pSpSUGAR[0]) == pSpSUGAR[0] && pSpSUGAR[1] == '') {
      minSUGAR = parseInt(pSpSUGAR[0])
    } else if (SUGAR){
      return res.status(500).json({success: false, message: `Invalid parameter ${SUGAR}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpTHIA.length == 2 && parseInt(mSpTHIA[1]) == mSpTHIA[1] && parseInt(mSpTHIA[0]) == mSpTHIA[0]) {
      minTHIA = parseInt(mSpTHIA[0])
      maxTHIA = parseInt(mSpTHIA[1])
    } else if (mSpTHIA.length == 2 && parseInt(mSpTHIA[0]) == mSpTHIA[0] && mSpTHIA[1] == '') {
      maxTHIA = parseInt(mSpTHIA[0])
    } else if (pSpTHIA.length == 2 && parseInt(pSpTHIA[0]) == pSpTHIA[0] && pSpTHIA[1] == '') {
      minTHIA = parseInt(pSpTHIA[0])
    } else if (THIA){
      return res.status(500).json({success: false, message: `Invalid parameter ${THIA}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpSUGARADDED.length == 2 && parseInt(mSpSUGARADDED[1]) == mSpSUGARADDED[1] && parseInt(mSpSUGARADDED[0]) == mSpSUGARADDED[0]) {
      minSUGARADDED = parseInt(mSpSUGARADDED[0])
      maxSUGARADDED = parseInt(mSpSUGARADDED[1])
    } else if (mSpSUGARADDED.length == 2 && parseInt(mSpSUGARADDED[0]) == mSpSUGARADDED[0] && mSpSUGARADDED[1] == '') {
      maxSUGARADDED = parseInt(mSpSUGARADDED[0])
    } else if (pSpSUGARADDED.length == 2 && parseInt(pSpSUGARADDED[0]) == pSpSUGARADDED[0] && pSpSUGARADDED[1] == '') {
      minSUGARADDED = parseInt(pSpSUGARADDED[0])
    } else if (SUGARADDED){
      return res.status(500).json({success: false, message: `Invalid parameter ${SUGARADDED}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpSugarAlcohol.length == 2 && parseInt(mSpSugarAlcohol[1]) == mSpSugarAlcohol[1] && parseInt(mSpSugarAlcohol[0]) == mSpSugarAlcohol[0]) {
      minSugarAlcohol = parseInt(mSpSugarAlcohol[0])
      maxSugarAlcohol = parseInt(mSpSugarAlcohol[1])
    } else if (mSpSugarAlcohol.length == 2 && parseInt(mSpSugarAlcohol[0]) == mSpSugarAlcohol[0] && mSpSugarAlcohol[1] == '') {
      maxSugarAlcohol = parseInt(mSpSugarAlcohol[0])
    } else if (pSpSugarAlcohol.length == 2 && parseInt(pSpSugarAlcohol[0]) == pSpSugarAlcohol[0] && pSpSugarAlcohol[1] == '') {
      minSugarAlcohol = parseInt(pSpSugarAlcohol[0])
    } else if (SugarAlcohol){
      return res.status(500).json({success: false, message: `Invalid parameter ${SugarAlcohol}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpTOCPHA.length == 2 && parseInt(mSpTOCPHA[1]) == mSpTOCPHA[1] && parseInt(mSpTOCPHA[0]) == mSpTOCPHA[0]) {
      minTOCPHA = parseInt(mSpTOCPHA[0])
      maxTOCPHA = parseInt(mSpTOCPHA[1])
    } else if (mSpTOCPHA.length == 2 && parseInt(mSpTOCPHA[0]) == mSpTOCPHA[0] && mSpTOCPHA[1] == '') {
      maxTOCPHA = parseInt(mSpTOCPHA[0])
    } else if (pSpTOCPHA.length == 2 && parseInt(pSpTOCPHA[0]) == pSpTOCPHA[0] && pSpTOCPHA[1] == '') {
      minTOCPHA = parseInt(pSpTOCPHA[0])
    } else if (TOCPHA){
      return res.status(500).json({success: false, message: `Invalid parameter ${TOCPHA}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpVITA_RAE.length == 2 && parseInt(mSpVITA_RAE[1]) == mSpVITA_RAE[1] && parseInt(mSpVITA_RAE[0]) == mSpVITA_RAE[0]) {
      minVITA_RAE = parseInt(mSpVITA_RAE[0])
      maxVITA_RAE = parseInt(mSpVITA_RAE[1])
    } else if (mSpVITA_RAE.length == 2 && parseInt(mSpVITA_RAE[0]) == mSpVITA_RAE[0] && mSpVITA_RAE[1] == '') {
      maxVITA_RAE = parseInt(mSpVITA_RAE[0])
    } else if (pSpVITA_RAE.length == 2 && parseInt(pSpVITA_RAE[0]) == pSpVITA_RAE[0] && pSpVITA_RAE[1] == '') {
      minVITA_RAE = parseInt(pSpVITA_RAE[0])
    } else if (VITA_RAE){
      return res.status(500).json({success: false, message: `Invalid parameter ${VITA_RAE}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpVITB12.length == 2 && parseInt(mSpVITB12[1]) == mSpVITB12[1] && parseInt(mSpVITB12[0]) == mSpVITB12[0]) {
      minVITB12 = parseInt(mSpVITB12[0])
      maxVITB12 = parseInt(mSpVITB12[1])
    } else if (mSpVITB12.length == 2 && parseInt(mSpVITB12[0]) == mSpVITB12[0] && mSpVITB12[1] == '') {
      maxVITB12 = parseInt(mSpVITB12[0])
    } else if (pSpVITB12.length == 2 && parseInt(pSpVITB12[0]) == pSpVITB12[0] && pSpVITB12[1] == '') {
      minVITB12 = parseInt(pSpVITB12[0])
    } else if (VITB12){
      return res.status(500).json({success: false, message: `Invalid parameter ${VITB12}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpVITB6A.length == 2 && parseInt(mSpVITB6A[1]) == mSpVITB6A[1] && parseInt(mSpVITB6A[0]) == mSpVITB6A[0]) {
      minVITB6A = parseInt(mSpVITB6A[0])
      maxVITB6A = parseInt(mSpVITB6A[1])
    } else if (mSpVITB6A.length == 2 && parseInt(mSpVITB6A[0]) == mSpVITB6A[0] && mSpVITB6A[1] == '') {
      maxVITB6A = parseInt(mSpVITB6A[0])
    } else if (pSpVITB6A.length == 2 && parseInt(pSpVITB6A[0]) == pSpVITB6A[0] && pSpVITB6A[1] == '') {
      minVITB6A = parseInt(pSpVITB6A[0])
    } else if (VITB6A){
      return res.status(500).json({success: false, message: `Invalid parameter ${VITB6A}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpVITC.length == 2 && parseInt(mSpVITC[1]) == mSpVITC[1] && parseInt(mSpVITC[0]) == mSpVITC[0]) {
      minVITC = parseInt(mSpVITC[0])
      maxVITC = parseInt(mSpVITC[1])
    } else if (mSpVITC.length == 2 && parseInt(mSpVITC[0]) == mSpVITC[0] && mSpVITC[1] == '') {
      maxVITC = parseInt(mSpVITC[0])
    } else if (pSpVITC.length == 2 && parseInt(pSpVITC[0]) == pSpVITC[0] && pSpVITC[1] == '') {
      minVITC = parseInt(pSpVITC[0])
    } else if (VITC){
      return res.status(500).json({success: false, message: `Invalid parameter ${VITC}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpVITD.length == 2 && parseInt(mSpVITD[1]) == mSpVITD[1] && parseInt(mSpVITD[0]) == mSpVITD[0]) {
      minVITD = parseInt(mSpVITD[0])
      maxVITD = parseInt(mSpVITD[1])
    } else if (mSpVITD.length == 2 && parseInt(mSpVITD[0]) == mSpVITD[0] && mSpVITD[1] == '') {
      maxVITD = parseInt(mSpVITD[0])
    } else if (pSpVITD.length == 2 && parseInt(pSpVITD[0]) == pSpVITD[0] && pSpVITD[1] == '') {
      minVITD = parseInt(pSpVITD[0])
    } else if (VITD){
      return res.status(500).json({success: false, message: `Invalid parameter ${VITD}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpVITK1.length == 2 && parseInt(mSpVITK1[1]) == mSpVITK1[1] && parseInt(mSpVITK1[0]) == mSpVITK1[0]) {
      minVITK1 = parseInt(mSpVITK1[0])
      maxVITK1 = parseInt(mSpVITK1[1])
    } else if (mSpVITK1.length == 2 && parseInt(mSpVITK1[0]) == mSpVITK1[0] && mSpVITK1[1] == '') {
      maxVITK1 = parseInt(mSpVITK1[0])
    } else if (pSpVITK1.length == 2 && parseInt(pSpVITK1[0]) == pSpVITK1[0] && pSpVITK1[1] == '') {
      minVITK1 = parseInt(pSpVITK1[0])
    } else if (VITK1){
      return res.status(500).json({success: false, message: `Invalid parameter ${VITK1}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpWATER.length == 2 && parseInt(mSpWATER[1]) == mSpWATER[1] && parseInt(mSpWATER[0]) == mSpWATER[0]) {
      minWATER = parseInt(mSpWATER[0])
      maxWATER = parseInt(mSpWATER[1])
    } else if (mSpWATER.length == 2 && parseInt(mSpWATER[0]) == mSpWATER[0] && mSpWATER[1] == '') {
      maxWATER = parseInt(mSpWATER[0])
    } else if (pSpWATER.length == 2 && parseInt(pSpWATER[0]) == pSpWATER[0] && pSpWATER[1] == '') {
      minWATER = parseInt(pSpWATER[0])
    } else if (WATER){
      return res.status(500).json({success: false, message: `Invalid parameter ${WATER}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(mSpZN.length == 2 && parseInt(mSpZN[1]) == mSpZN[1] && parseInt(mSpZN[0]) == mSpZN[0]) {
      minZN = parseInt(mSpZN[0])
      maxZN = parseInt(mSpZN[1])
    } else if (mSpZN.length == 2 && parseInt(mSpZN[0]) == mSpZN[0] && mSpZN[1] == '') {
      maxZN = parseInt(mSpZN[0])
    } else if (pSpZN.length == 2 && parseInt(pSpZN[0]) == pSpZN[0] && pSpZN[1] == '') {
      minZN = parseInt(pSpZN[0])
    } else if (ZN){
      return res.status(500).json({success: false, message: `Invalid parameter ${ZN}`, params: 'MIN-MAX, MIN+, MAX-'})
    }

    if(!(dietLabel.toUpperCase() == '' || dietLabel.toUpperCase() == 'high-fiber'.toUpperCase() || dietLabel.toUpperCase().toUpperCase() == 'high-protein'.toUpperCase() || dietLabel.toUpperCase().toUpperCase() == 'low-carb'.toUpperCase() || dietLabel.toUpperCase().toUpperCase() == 'low-fat'.toUpperCase() || dietLabel.toUpperCase().toUpperCase() == 'low-sodium'.toUpperCase() || dietLabel.toUpperCase().toUpperCase() == 'balanced'.toUpperCase())) {
      return res.status(500).json({ success: false, message: `Invalid parameter ${dietLabel}`, params: 'high-fiber, high-protein, low-carb, low-fat, low-sodium'  })
    }

    if(!(healthLabel == '' || healthLabel.toUpperCase() == 'alcohol-cocktail'.toUpperCase() || healthLabel.toUpperCase() == 'alcohol-free'.toUpperCase() || healthLabel.toUpperCase() == 'celery-free'.toUpperCase() || healthLabel.toUpperCase() == 'crustacean-free'.toUpperCase() || healthLabel.toUpperCase() == 'dairy-free'.toUpperCase() ||
    healthLabel.toUpperCase() == 'dash'.toUpperCase() || healthLabel.toUpperCase() == 'egg-free'.toUpperCase() || healthLabel.toUpperCase() == 'fish-free'.toUpperCase() || healthLabel.toUpperCase() == 'fodmap-free'.toUpperCase() || healthLabel.toUpperCase() == 'gluten-free'.toUpperCase() || healthLabel.toUpperCase() == 'immuno-supportive'.toUpperCase() || healthLabel.toUpperCase() == 'keto-friendly'.toUpperCase() || 
    healthLabel.toUpperCase() == 'kidney-friendly'.toUpperCase() || healthLabel.toUpperCase() == 'kosher'.toUpperCase() || healthLabel.toUpperCase() == 'low-fat-abs'.toUpperCase() || healthLabel.toUpperCase() == 'low-potassium'.toUpperCase() || healthLabel.toUpperCase() == 'low-sugar'.toUpperCase() || healthLabel.toUpperCase() == 'lupine-free'.toUpperCase() || healthLabel.toUpperCase() == 'mediterranean'.toUpperCase() || 
    healthLabel.toUpperCase() == 'mollusk-free'.toUpperCase() || healthLabel.toUpperCase() == 'mustard-free'.toUpperCase() || healthLabel.toUpperCase() == 'no-oil-added'.toUpperCase() || healthLabel.toUpperCase() == 'paleo'.toUpperCase() || healthLabel.toUpperCase() == 'peanut-free'.toUpperCase() || healthLabel.toUpperCase() == 'pescatarian'.toUpperCase() || healthLabel.toUpperCase() == 'pork-free'.toUpperCase() || 
    healthLabel.toUpperCase() == 'red-meat-free'.toUpperCase() || healthLabel.toUpperCase() == 'sesame-free'.toUpperCase() || healthLabel.toUpperCase() == 'shellfish-free'.toUpperCase() || healthLabel.toUpperCase() == 'soy-free'.toUpperCase() || healthLabel.toUpperCase() == 'sugar-conscious'.toUpperCase() || healthLabel.toUpperCase() == 'sulfite-free'.toUpperCase() || healthLabel.toUpperCase() == 'tree-nut-free'.toUpperCase() || 
    healthLabel.toUpperCase() == 'vegan'.toUpperCase() || healthLabel.toUpperCase() == 'vegetarian'.toUpperCase() || healthLabel.toUpperCase() == 'wheat-free'.toUpperCase())) {
      return res.status(500).json({ success: false, message: `Invalid parameter ${healthLabel}`, 
      params: 'alcohol-cocktail, alcohol-free, celery-free, crustacean-free, dairy-free, dash, egg-free, fish-free, fodmap-free, gluten-free, immuno-supportive, keto-friendly, kidney-friendly, kosher, low-fat-abs, low-potassium, low-sugar, lupine-free, mediterranean, mollusk-free, mustard-free, no-oil-added, paleo, peanut-free, pescatarian, pork-free, red-meat-free, sesame-free, shellfish-free, soy-free, sugar-conscious, sulfite-free, tree-nut-free, vegan, vegetarian, wheat-free'})
    }

    if (!(cuisineTypeLabel == '' || cuisineTypeLabel.toUpperCase() == 'American'.toUpperCase() || cuisineTypeLabel.toUpperCase() == 'Asian'.toUpperCase() || cuisineTypeLabel.toUpperCase() == 'British'.toUpperCase() || cuisineTypeLabel.toUpperCase() == 'Central Europe'.toUpperCase() || cuisineTypeLabel.toUpperCase() == 'Chinese'.toUpperCase() || 
    cuisineTypeLabel.toUpperCase() == 'Eastern Europe'.toUpperCase() || cuisineTypeLabel.toUpperCase() == 'French'.toUpperCase() || cuisineTypeLabel.toUpperCase() == 'Indian'.toUpperCase() || cuisineTypeLabel.toUpperCase() == 'Italian'.toUpperCase() || cuisineTypeLabel.toUpperCase() == 'Japanese'.toUpperCase() || cuisineTypeLabel.toUpperCase() == 'Kosher'.toUpperCase() || 
    cuisineTypeLabel.toUpperCase() == 'Mediterranean'.toUpperCase() || cuisineTypeLabel.toUpperCase() == 'Mexican'.toUpperCase() || cuisineTypeLabel.toUpperCase() == 'Middle Eastern'.toUpperCase() || cuisineTypeLabel.toUpperCase() == 'Nordic'.toUpperCase() || cuisineTypeLabel.toUpperCase() == 'South American'.toUpperCase() || cuisineTypeLabel.toUpperCase() == 'South East Asian'.toUpperCase())) {
      return res.status(500).json({ success: false, message: `Invalid parameter ${cuisineTypeLabel}`, 
      params: 'American, Asian, British, Central Europe, Chinese, Eastern Europe, French, Indian, Italian, Japanese, Kosher, Mediterranean, Mexican, Middle Eastern, Nordic, South American, South East Asian'})
    }

    if(!(mealTypeLabel == '' || mealTypeLabel.toUpperCase() == 'BREAKFAST' || mealTypeLabel.toUpperCase() == 'LUNCH' || mealTypeLabel.toUpperCase() == 'DINNER')) {
      return res.status(500).json({ success: false, message: `Invalid parameter ${mealTypeLabel}`, 
      params: 'Breakfast, Lunch, Dinner'})
    }

    if(!(dishTypeLabel == '' || dishTypeLabel.toUpperCase() == 'BISCUITS AND COOKIES' || dishTypeLabel.toUpperCase() == 'BREAD' || dishTypeLabel.toUpperCase() == 'CEREALS' || dishTypeLabel.toUpperCase() == 'CONDIMENTS AND SAUCES' || dishTypeLabel.toUpperCase() == 'DESSERTS' || dishTypeLabel.toUpperCase() == 'DRINKS' || dishTypeLabel.toUpperCase() == 'MAIN COURSE' || dishTypeLabel.toUpperCase() == 'PANCAKE' || dishTypeLabel.toUpperCase() == 'PREPS' || 
    dishTypeLabel.toUpperCase() == 'PRESERVE' || dishTypeLabel.toUpperCase() == 'SALAD' || dishTypeLabel.toUpperCase() == 'SANDWICHES' || dishTypeLabel.toUpperCase() == 'SIDE DISH' || dishTypeLabel.toUpperCase() == 'SOUP' || dishTypeLabel.toUpperCase() == 'STARTER' || dishTypeLabel.toUpperCase() == 'SWEETS')) {
      return res.status(500).json({ success: false, message: `Invalid parameter ${dishTypeLabel}`, 
      params: 'Biscuits and cookies, Bread, Cereals, Condiments and sauces, Desserts, Drinks, Main Course, Pancake, Preps, Preserve, Salad, Sandwiches, Side dish, Soup, Starter, Sweets'})
    }

    const count = await db.countDocuments({$or: [
                          {"totalNutrients": {"$elemMatch": {"tag" : "CA", "quantity" : { $gte: minCA, $lte: maxCA }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FAT", "quantity" : { $gte: minFAT, $lte: maxFAT }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "CHOCDF", "quantity" : { $gte: minCHOCDF, $lte: maxCHOCDF }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "PROCNT", "quantity" : { $gte: minPROCNT, $lte: maxPROCNT }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "CHOLE", "quantity" : { $gte: minCHOLE, $lte: maxCHOLE }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "NA", "quantity" : { $gte: minNA, $lte: maxNA }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "MG", "quantity" : { $gte: minMG, $lte: maxMG }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "K", "quantity" : { $gte: minK, $lte: maxK }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FE", "quantity" : { $gte: minFE, $lte: maxFE }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "ZN", "quantity" : { $gte: minZN, $lte: maxZN }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "P", "quantity" : { $gte: minP, $lte: maxP }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "VITA_RAE", "quantity" : { $gte: minVITA_RAE, $lte: maxVITA_RAE }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "VITC", "quantity" : { $gte: minVITC, $lte: maxVITC }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "THIA", "quantity" : { $gte: minTHIA, $lte: maxTHIA }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "RIBF", "quantity" : { $gte: minRIBF, $lte: maxRIBF }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "NIA", "quantity" : { $gte: minNIA, $lte: maxNIA }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "VITB6A", "quantity" : { $gte: minVITB6A, $lte: maxVITB6A }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FOLDFE", "quantity" : { $gte: minFOLDFE, $lte: maxFOLDFE }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FOLFD", "quantity" : { $gte: minFOLFD, $lte: maxFOLFD }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FOLAC", "quantity" : { $gte: minFOLAC, $lte: maxFOLAC }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "VITB12", "quantity" : { $gte: minVITB12, $lte: maxVITB12 }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "VITD", "quantity" : { $gte: minVITD, $lte: maxVITD }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "TOCPHA", "quantity" : { $gte: minTOCPHA, $lte: maxTOCPHA }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "VITK1", "quantity" : { $gte: minVITK1, $lte: maxVITK1 }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "Sugar.alcohol", "quantity" : { $gte: minSugarAlcohol, $lte: maxSugarAlcohol }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "WATER", "quantity" : { $gte: minWATER, $lte: maxWATER }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FASAT", "quantity" : { $gte: minFASAT, $lte: maxFASAT }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FATRN", "quantity" : { $gte: minFATRN, $lte: maxFATRN }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FAMS", "quantity" : { $gte: minFAMS, $lte: maxFAMS }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FAPU", "quantity" : { $gte: minFAPU, $lte: maxFAPU }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "CHOCDF.net", "quantity" : { $gte: minCHOCDFNET, $lte: maxCHOCDFNET }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FIBTG", "quantity" : { $gte: minFIBTG, $lte: maxFIBTG }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "SUGAR", "quantity" : { $gte: minSUGAR, $lte: maxSUGAR }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "SUGAR.added", "quantity" : { $gte: minSUGARADDED, $lte: maxSUGARADDED }}}},
                        ]}
                      )
                      .where({label: {$regex: searchLabel, $options: 'i'}})
                      .where({dietLabels : {$regex: dietLabel, $options: 'i'}})
                      .where({healthLabels : {$regex: healthLabel, $options: 'i'}})
                      .where({calories: { $gte: minCal }})
                      .where({calories: { $lte: maxCal }})
                      .where({$or: [{healthLabels: {$regex: tagLabel, $options: 'i'}}, { aharaTags: {$regex: tagLabel, $options: 'i'}}]})
          
                       
    const recipes = await db.find({$or: [
                          {"totalNutrients": {"$elemMatch": {"tag" : "CA", "quantity" : { $gte: minCA, $lte: maxCA }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FAT", "quantity" : { $gte: minFAT, $lte: maxFAT }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "CHOCDF", "quantity" : { $gte: minCHOCDF, $lte: maxCHOCDF }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "PROCNT", "quantity" : { $gte: minPROCNT, $lte: maxPROCNT }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "CHOLE", "quantity" : { $gte: minCHOLE, $lte: maxCHOLE }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "NA", "quantity" : { $gte: minNA, $lte: maxNA }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "MG", "quantity" : { $gte: minMG, $lte: maxMG }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "K", "quantity" : { $gte: minK, $lte: maxK }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FE", "quantity" : { $gte: minFE, $lte: maxFE }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "ZN", "quantity" : { $gte: minZN, $lte: maxZN }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "P", "quantity" : { $gte: minP, $lte: maxP }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "VITA_RAE", "quantity" : { $gte: minVITA_RAE, $lte: maxVITA_RAE }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "VITC", "quantity" : { $gte: minVITC, $lte: maxVITC }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "THIA", "quantity" : { $gte: minTHIA, $lte: maxTHIA }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "RIBF", "quantity" : { $gte: minRIBF, $lte: maxRIBF }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "NIA", "quantity" : { $gte: minNIA, $lte: maxNIA }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "VITB6A", "quantity" : { $gte: minVITB6A, $lte: maxVITB6A }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FOLDFE", "quantity" : { $gte: minFOLDFE, $lte: maxFOLDFE }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FOLFD", "quantity" : { $gte: minFOLFD, $lte: maxFOLFD }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FOLAC", "quantity" : { $gte: minFOLAC, $lte: maxFOLAC }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "VITB12", "quantity" : { $gte: minVITB12, $lte: maxVITB12 }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "VITD", "quantity" : { $gte: minVITD, $lte: maxVITD }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "TOCPHA", "quantity" : { $gte: minTOCPHA, $lte: maxTOCPHA }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "VITK1", "quantity" : { $gte: minVITK1, $lte: maxVITK1 }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "Sugar.alcohol", "quantity" : { $gte: minSugarAlcohol, $lte: maxSugarAlcohol }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "WATER", "quantity" : { $gte: minWATER, $lte: maxWATER }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FASAT", "quantity" : { $gte: minFASAT, $lte: maxFASAT }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FATRN", "quantity" : { $gte: minFATRN, $lte: maxFATRN }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FAMS", "quantity" : { $gte: minFAMS, $lte: maxFAMS }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FAPU", "quantity" : { $gte: minFAPU, $lte: maxFAPU }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "CHOCDF.net", "quantity" : { $gte: minCHOCDFNET, $lte: maxCHOCDFNET }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "FIBTG", "quantity" : { $gte: minFIBTG, $lte: maxFIBTG }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "SUGAR", "quantity" : { $gte: minSUGAR, $lte: maxSUGAR }}}},
                          {"totalNutrients": {"$elemMatch": {"tag" : "SUGAR.added", "quantity" : { $gte: minSUGARADDED, $lte: maxSUGARADDED }}}},
                        ]})
                          .where({label: {$regex: searchLabel, $options: 'i'}})
                          .where({dietLabels : {$regex: dietLabel, $options: 'i'}})
                          .where({healthLabels : {$regex: healthLabel, $options: 'i'}})
                          .where({calories: { $gte: minCal }})
                          .where({calories: { $lte: maxCal }})
                          .where({$or: [{healthLabels: {$regex: tagLabel, $options: 'i'}}, { aharaTags: {$regex: tagLabel, $options: 'i'}}]})
                          .skip(skip)
                          .limit(limit)
    res.json({ 
        success: true ,
        list: {
            from: skip,
            to: skip + limit - 1 < count  ? skip + limit - 1 : count,
            count: count,
            hits: recipes
        }
    })  
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message })
  }
}
