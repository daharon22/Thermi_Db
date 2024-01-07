const appRoot = require("app-root-path");
const User = appRoot.require('db/models/User');
var bcryptjs = require("bcryptjs");

async function getUserById(userid)
{
    let u = await User.query().where('userid', userid);
    if(u.length > 0){
        return u[0];
    }
    return null;
}

async function addUser(userinfo){
    let u = null;
    userinfo.created_at=new Date();
    userinfo.password = bcryptjs.hashSync(userinfo.password, process.env.ENCRYPTION_SALT | 0);
    u=await User.query().insert(userinfo);
    return u;
}

async function updateUser(userInfo){
    userInfo.updated_at = new Date();
    let u = await User.query().findById(userInfo.id).patch(userInfo);
    return u;
}


async function deleteUser(userid){
    let u = await User.query().delete().whereIn('userid',[userid]);
}

module.exports = {getUserById, addUser, updateUser,deleteUser}