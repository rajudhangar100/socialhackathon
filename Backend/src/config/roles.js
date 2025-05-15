const allRoles = {
  admin: [],
  patient: ['patient'],
  doctor: ['doctor'],
  hospital: ['hospital'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
