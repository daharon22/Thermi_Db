const appRoot = require("app-root-path");
const User = appRoot.require('db/models/User');

async function getUsersbyid(userid)
{
    let u = await User.query().where('userid', userid);
    if(u.length > 0){
        return u[0];
    }
    return null;
}

async function addUser(userinfo){
    let u = null;
    u=await User.query().insert(userinfo);
    return u;
}

async function updateUser(userInfo){
    let u = await User.query().findById(userInfo.id).patch(userInfo);
    return u;
}

async function deleteUser(userid){
    let u = await User.query().delete().whereIn('userid',[userid]);
}

module.exports = {getUsersbyid, addUser, updateUser,deleteUser}