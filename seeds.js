const { dbConnection } = require("./database/connection");

const Customer = require("./database/models/Customer");
const VipPass = require("./database/models/VipPass");

const customers = [
  {
    name: "Manuel García López",
    dni: "43567654F",
  },
  {
    name: "Luis Fernandez Pérez",
    dni: "13767654F",
  },
  {
    name: "Manuel García López",
    dni: "43567654Z",
  },
  {
    name: "Miriam Delgado Martín",
    dni: "13527634P",
  },
  {
    name: "Alberto Gómez Salgado",
    dni: "33465654P",
  },
];

const vipPasses = [
  {
    customerDni: "43567654F",
    expirationDate: "2020-03-01",
  },
  {
    customerDni: "13767654F",
    expirationDate: "2021-02-05",
  },
  {
    customerDni: "43567654Z",
    expirationDate: "2022-06-16",
  },
  {
    customerDni: "",
    expirationDate: "2023-03-19",
  },
  {
    customerDni: "",
    expirationDate: "2023-03-25",
  },
];

const updateDB = async () => {
  const deletedUsers = await Customer.deleteMany();

  console.log(`${deletedUsers.deletedCount} users have been deleted`);

  const createdUsers = await Customer.create(customers);

  console.log("The following users have been created:");

  console.log(createdUsers);

  const deletedVipPasses = await VipPass.deleteMany();

  console.log(`${deletedVipPasses.deletedCount} users have been deleted`);

  const createdVipPasses = await VipPass.create(vipPasses);

  console.log("The following vip passes have been created:");

  console.log(createdVipPasses);

  process.exit(0);
};

dbConnection();

updateDB();
