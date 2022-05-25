const whitelist = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://localhost:8000',
];
// const methods = ["GET", "POST", "OPTIONS", "PUT", "DELETE"];


const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    // methods: methods
}

export default corsOptions;