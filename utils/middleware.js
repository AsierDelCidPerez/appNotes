const morgan = require('morgan')
const express = require('express')

const getAgent = req => {
    return {
        agent: req.get('User-Agent'),
        ip: req.ip
    }
}

const errorHandler = (error, req, res, next) => {
    const myError = {
        errorCode: 400,
        time: new Date(),
        error: {
            name: error.name,
            message: error.message,
            requestedUrl: req.path
        },
        agent: getAgent(req)
    }
    res.status(400).send(myError)
    
}

const maintenanceEndpoint = (req, res, next) => {
    const error = {
        errorCode: 503,
        time: new Date(),
        errorDetails: {
            description: 'Service is under maintenance',
            requestedUrl: req.path
        },
        agent: getAgent(req)
    }
    res.status(503).send(error)
}

const closeEndpoint = (req, res, next) => {
    const error = {
        errorCode: 503,
        time: new Date(),
        errorDetails: {
            description: 'Service Closed',
            requestedUrl: req.path
        },
        agent: getAgent(req)
    }
    res.status(503).send(error)
}

const unknownEndpoint = (req, res, next) => {
    const error = {
        errorCode: 404,
        time: new Date(),
        errorDetails: {
            description: 'Not found',
            requestedUrl: req.path
        },
        helping: {
            causes: [
                'URL hard-writed',
                'This page was deleted'
            ],
            possibleSolutions: [
                'Review the URL written'
            ]
        },
        agent: getAgent(req)
    }
    res.status(404).send(error)
}

module.exports = {errorHandler, unknownEndpoint, maintenanceEndpoint, closeEndpoint}