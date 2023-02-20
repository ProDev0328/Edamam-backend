const moment = require('moment')

const HOST = `http://localhost:${process.env.PORT}/`

exports.convertNormalDate = (date) => {
    let arr = date.split('.')
    if (arr.length != 3) {
        return null
    }

    return `${arr[2]}-${arr[1]}-${arr[0]}`
}

exports.convertFormatDate = (date) => {
    return date ? moment(date).format('DD.MM.YYYY') : ''
}

exports.getExcelFileName = (username) => {
    return `${moment().format('YYYYMMDD_HHmmss')}(${username}).xlsx`
}

exports.getDownloadPath = () => {
    return HOST + 'api/exports/download_excel/'
}
