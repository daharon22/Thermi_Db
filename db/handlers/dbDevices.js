const appRoot = require("app-root-path");
const Devices = appRoot.require('db/models/Devices');
const Device_events = appRoot.require('db/models/Device_events');
const dbUsers = appRoot.require('db/handlers/dbUsers');
var bcryptjs = require("bcryptjs");



async function addDevice(deviceinfo){
    let u = null;
    u=await Devices.query().insert(deviceinfo);
    return u;
}
async function updateDevice(deviceInfo){
    deviceInfo.last_seen = new Date();
    let u = await Devices.query().findById(deviceInfo.id).patch(deviceInfo);
    return u;
}

async function getLastTempForDevice(device_id){
    
    let e = await Device_events.query().
        where("device_id", device_id).orderBy('event_time', 'desc').limit(1);
    
    
    if(e[0])
    {
        return e[0];

    }
    return null;

}

async function addDeviceEvent(deviceEvent){
    
    let e = null;
    e=await Device_events.query().insert(deviceEvent);
    return e;
}

async function getDeviceByToken(token){
    let d = await Devices.query().where('token', token);
    if(d.length > 0){
        return d[0];
    }
    return null;
}

module.exports = {addDevice, getDeviceByToken, addDeviceEvent, updateDevice, getLastTempForDevice}