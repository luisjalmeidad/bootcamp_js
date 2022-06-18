const postPerson = async (newPerson) => {
  try {
    await fetch("http://localhost:3001/api/persons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    });
  } catch (error) {
    console.log(error);
  }
};

export default postPerson;
