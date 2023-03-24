import express from "express";
import { Sequelize, DataTypes } from "sequelize";

const app = express();

const sequelize = new Sequelize("Bloggy", "hicoders", "hicoders_12", {
    host: "localhost",
    dialect: "mysql",
});

// Define the "hello_world" table
const HelloWorld = sequelize.define("hello_world",{
        message: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        paranoid: true,
    }
);

(async () => {
    try {
        // Sync the table with the database
        await sequelize.sync();

        // Add a new row to the table
        const result = await HelloWorld.create({ message: "Hello, world!" });
        console.log(result.toJSON());
    } catch (error) {
        console.error(error);
    } finally {
    }
})();
app.get("/", async (req, res) => {
    res.send("Hello World 1 deleted!");
    await HelloWorld.destroy({ where: { id: 1 } });
});

app.get("/hello", async (req, res) => {
    const allHelloWorlds = await HelloWorld.findAll({ paranoid: false });
    res.send(allHelloWorlds);
});
//normally you would not use get method, this is just an example about paranoid
app.get("/restore", async (req, res) => {
    await HelloWorld.restore({
        where: {
            id: 1,
        },
    });
    res.send("hello world 1 restored")
});

app.listen(3005, () => {
    console.log("Server is running on port 3000");
});
