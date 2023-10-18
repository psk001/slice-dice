const verifyCreateEmployeePayload = (req, res, next) => {
  const { 
    name, 
    salary, 
    currency, 
    department, 
    sub_department, 
    on_contract 
  } = req.body;

  // Check if required fields are present
  if (!name || !salary || !currency || !department || !sub_department) {
    return res
      .status(400)
      .json({ error: "Missing required fields in the payload" });
  }

  // Check the types of the fields
  if (
    typeof name !== "string" ||
    typeof salary !== "string" ||
    typeof currency !== "string" ||
    typeof department !== "string" ||
    typeof sub_department !== "string"
  ) {
    return res
      .status(400)
      .json({ error: "Invalid field types in the payload" });
  }

  // on_contract may or may not be null
  // If "on_contract" is provided, check its type
  if (on_contract !== undefined && typeof on_contract !== "boolean") {
    return res
      .status(400)
      .json({ error: 'Invalid type for "on_contract" field' });
  }

  // If everything is valid, move to the next middleware
  next();
};

module.exports = { 
  verifyCreateEmployeePayload 
};
