require('dotenv').config();
import connectDB from './config/db';
import app from './app';

const port = process.env.PORT;

app.listen(port, () => {
    try {
        console.log(`Server is listening on http://localhost:${port}`);
        connectDB();
    } catch (err: any) {
        console.log(err.message);
    }
});
