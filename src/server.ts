import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join((process.cwd(), ".env")) });
import app from "./app";

async function main() {
  try {
    app.listen(process.env.PORT, () => {
      console.log(
        `Car wash services app listening on port ${process.env.PORT}`
      );
    });
  } catch (error) {
    console.log("DB connection error", error);
  }
}

main();
