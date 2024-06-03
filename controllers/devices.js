const { __ } = require("i18n");
const { body, validationResult } = require('express-validator');
const appRoot = require("app-root-path");
const dbDevices = appRoot.require('/db/handlers/dbDevices')
const dbUsers = appRoot.require('/db/handlers/dbUsers')
const { v4: uuidv4 } = require('uuid');
const firebase = appRoot.require('/firebase/firebase');

async function getLastTemp(req, res, next){
    let d = await dbDevices.getDeviceByToken(req.body.token);
    if(d)
    {
        let lastTemp = await dbDevices.getLastTempForDevice(d.id);
        let t1 = lastTemp.temperature_t1;
        let t2 = lastTemp.temperature_t2;
        return res.json({"works":true, "temperature_t1":t1, "temperature_t2":t2});
    }
    
    return res.status(200).json({works:false});
}

async function getMaxTemp(req, res, next){
    let d = await dbDevices.getDeviceByToken(req.body.token);
    return res.json({"maxTemp1":d.maxTemp1, "maxTemp2":d.maxTemp2});
}
async function setMaxTemp(req, res, next){
    let d = await dbDevices.getDeviceByToken(req.body.token)
    let max1 = parseFloat(req.body.max1);
    let max2 = parseFloat(req.body.max2);
    d.maxTemp1 = max1;
    d.maxTemp2 = max2;
    let f = await dbDevices.updateDevice(d);
    return res.json({"works":"true"});
}

async function showTempPage(req, res, next)
{
    let e = await dbDevices.getLastTempForDevice(1);
    let t = e.temperature_t1;
    res.render("temps", {title: __("temperature_page_title"), temp: t});
}

async function processDeviceEvent(req, res, next){
    //TODO: use timestamp from device
    let d =    await dbDevices.getDeviceByToken(req.body.token);
    if(d)
    {
        //below done for new last_seen timestamp
        await dbDevices.updateDevice(d);

        let deviceEvent = await dbDevices.addDeviceEvent({
            device_id: d.id, 
            temperature_t1: req.body.temperature_t1,
            temperature_t2: req.body.temperature_t2,
            temperature_t3: req.body.temperature_t3, 
            event_time: new Date(),
            event_type: req.body.event_type,
        })

        let user = await dbUsers.getUserByid(d.owner_id);
        let tok = user.fcm_token;
        let update = "update";
        if(req.body.event_type===update){

        }
        else{
            firebase.sendNotif(req.body.event_type, tok);

        }
        

        return res.status(200).json({});
        
    }
    return res.status(404).end();


}

let loginValidation = 
[
    body("email").notEmpty().withMessage(__("fieldIsRequired")).isEmail(),
    body("password").notEmpty().withMessage(__("fieldIsRequired")).isLength({min:8})
]

async function registerNewDevice(req, res, next)
{
    let d = ({
        name: "Thermi " + req.body.serial_number, 
        serial_number: req.body.serial_number, 
        mac_address: req.body.mac_address,
        last_seen: new Date(),
        firmware_version: req.body.firmware_version, 
        model: req.body.model,
        token: req.body.tok,
        owner_id: req.body.owner_id
    })
    /*table.string('name').notNullable();
      table.string('serial_number');
      table.string('mac_address');
      table.string('last_seen');
      table.string('firmware_version');
      table.string('model');
      table.string('token').unique;
      table.integer('owner_id').references("users.id");

    */
   let u = await dbDevices.addDevice(d);
   return u;


}

module.exports = {processDeviceEvent, registerNewDevice, getLastTemp, showTempPage, getMaxTemp, setMaxTemp}