const express = require('express');
const app = express();
const http = require('http');
const httpServer = http.createServer(app);
const cors = require('cors');
const dayjs = require('dayjs');
const BrigadesData = require('./data').brigadesData;
const Departments = require('./data').departments;
const ConnectionState = require('./data').connectionState;

const port = 3000; // http server port
const Min = Math.ceil(0);
const Max = Math.floor(999);

const getPointsFast = (value) => {
    const createPoints = (points) => {
        const AllPoints = [];

        const getRandomIntInclusive = () => {
            return Math.floor(Math.random() * (Max - Min + 1)) + Min;
        };

        for (let i = 0; i < points; i++) {
            AllPoints.push({
                x: dayjs(1672531200000 + i * 1000 * 60).format('YYYY-MM-DD HH:mm:ss'),
                y: getRandomIntInclusive()
            });
        }

        return AllPoints;
    };

    if (value && !isNaN(value) && value <= 1000000) { 
        return createPoints(value);
    } else {
        return null;
    }
};

app.use(cors({ origin: '*'}));

app.get('/getBrigadesData', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(BrigadesData);
});

app.get('/getDepartments', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(Departments);
});

app.get('/getConnectionState', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(ConnectionState);
});

app.get('/getPointsFast', (req, res) => {
    const GetPoints = (req.url).split('points=');
    const ParcePoints = Number(GetPoints[1])
    res.setHeader("Content-Type", "application/json");
    res.send(getPointsFast(ParcePoints));
});

httpServer.listen(port, () => {
    console.log(`server start at http://localhost:${port}`);
});
