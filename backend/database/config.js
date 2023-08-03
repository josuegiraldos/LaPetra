const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('DB IS WORKING');
    } catch (error) {
        console.log(error);
        throw new Error('DB CAN NOT INITIALIZE');
    }
}

module.exports = {
    dbConnection
}