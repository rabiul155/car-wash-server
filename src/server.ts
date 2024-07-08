import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join((process.cwd(), '.env')) });
import app from './app';

async function main() {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    app.listen(process.env.PORT, () => {
      console.log(
        `Car wash services app listening on port ${process.env.PORT}`,
      );
    });
  } catch (error) {
    console.log('DB connection error', error);
  }
}

main();
