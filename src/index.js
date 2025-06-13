import express from "express"
import cookieParser from "cookie-parser"
import cors from 'cors'
import dotenv from 'dotenv'
import cluster from 'cluster'
import os from 'os'
import Router from "./routes/index.js"

if (process.env.NODE_ENV == 'dev') {
    import('source-map-support/register.js').catch(err => {
        console.warn('Source map support could not be enabled:', err.message)
    })
}

dotenv.config()
const PORT = process.env.PORT || 80
const numCPUs = process.env.NODE_ENV == 'dev' ? 1 : os.cpus().length

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
        console.log('Starting a new worker');
        cluster.fork();
    })

    cluster.on('online', (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    })
} else {
    const app = express()

    app.use((req, res, next) => {
        console.log(`Worker ${process.pid} handling request: ${req.method} ${req.url}`);
        next();
    })

    app.use(cors({
        credentials: true,
        origin: function (origin, callback) {
            callback(null, true);
        }
    }))

    app.use('/api',
        Router
    )

    const server = app.listen(PORT, async () => {
        console.log(`Worker ${process.pid} listening on port ${PORT} at ${new Date()}`);
    }).setTimeout(240000)
}