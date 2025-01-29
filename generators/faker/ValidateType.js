module.exports = {
    validate: (data) => {
        let size = data.size
        if (size > 10) {
            size = 10
        }
        let smallData = data.slice(0, size)
        let columns = Object.keys(data[0])
        let validate = {}
        columns.forEach((column) => {
            let types = []
            let subData = []
            smallData.forEach((row) => {
                types.push(typeof row[column])
                subData.push(row[column])
            })

            if (types.every(a => types[0] === a)) {
                if (types[0] === 'string') {
                    validate[column] = 'TEXT'
                } else if (types[0] === 'number') {
                    validate[column] = 'INTEGER'
                    if (subData[0].toString().includes('.')) {
                        validate[column] = 'DECIMAL'
                    }
                } else {
                    validate[column] = 'TEXT'
                }
            }else{
                validate[column] = 'TEXT'
            }

        })
        return validate
    }
}