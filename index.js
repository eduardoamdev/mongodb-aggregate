const VipPass = require("./database/models/VipPass");

const { dbConnection } = require("./database/connection");

dbConnection();

const findVipPassWithoutDni = async () => {
  const notDniAssigned = await VipPass.aggregate([
    {
      $sort: { expirationDate: -1 },
    },
    {
      $lookup: {
        from: "customers",
        localField: "customerDni",
        foreignField: "dni",
        as: "matchedCustomers",
      },
    },
    {
      $match: {
        matchedCustomers: [],
      },
    },
  ]);

  return notDniAssigned;
};

const init = async () => {
  console.log(await findVipPassWithoutDni());
};

init();
