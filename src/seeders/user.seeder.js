import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../db/models/users.model.js";
import { faker } from "@faker-js/faker";
import Address from "../db/models/addresses.model.js";

const usersSeed = asyncHandler(async (count) => {
  const userDocumentsCount = await User.estimatedDocumentCount();
  const addressDocumentsCount = await Address.estimatedDocumentCount();

  if (userDocumentsCount > 0 ) {
    await User.deleteMany({});
  }

  if(addressDocumentsCount > 0) {
    await Address.deleteMany({})
  }

  let generatedUsersArray = [];
  let generatedAddresses = [];

  for (let i = 0; i <= count; i++) {
    generatedUsersArray.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      username: faker.internet.username(),
      isActive: faker.helpers.arrayElement([true, false]),
      password: faker.internet.password(),
    });
  }

  const users = await User.create(generatedUsersArray, {
    validateBeforeSave: false,
  });

  const userIds = users.map(user => user._id);

  for (let i = 0; i <= count; i++) {
    generatedAddresses.push({
       user_id: faker.helpers.arrayElement(userIds),
       apartement_number: faker.location.buildingNumber(),
       street: faker.location.street(),
       city: faker.location.city(),
       state: faker.location.state(),
       country: faker.location.country()
    });
  }

  await Address.create(generatedAddresses)
});
export default usersSeed;
