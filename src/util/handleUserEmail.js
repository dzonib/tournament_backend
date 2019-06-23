module.exports = function handleEmail(email) {
  if (!email) {
    return { msg: "Please enter a valid email" };
  }

  const afterMonkey = email.split("@");
  const isWaySevenEmployee = afterMonkey[1];

  const dataBeforeMonkey = email.split("@")[0].split(".");

  const nameSurameRegex = /^[a-zA-Z]+(\.)([a-zA-Z]+)/;
  const emailRegex = /wayseven\.com$/;

  // checks if email ends with starts with string(first name).string(last name) and ents with wayseven.com
  if (
    !emailRegex.test(isWaySevenEmployee) ||
    !nameSurameRegex.test(email.split("@")[0])
  ) {
    return { error: "You must use company email" };
  }

  // takes the first name and last name from email
  return { firstName: dataBeforeMonkey[0], lastName: dataBeforeMonkey[1] };
};
