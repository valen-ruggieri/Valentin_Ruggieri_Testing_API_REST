require('dotenv').config()
const loggers = require('log4js')

const logger = loggers.getLogger(`${ process.env.NODE_ENV}`);

loggers.configure({

    appenders:{
        console:{type:"console"},
        debugProduction:{type:"file",filename:'logs/PRODUCTION.log'}

    },
    categories:{
        default: { appenders: ["console"], level: "all" },
        DEV: { appenders: ["console"], level: "all" },
        PROD: { appenders: ["debugProduction"], level: "info" },

    }
})


module.exports= logger