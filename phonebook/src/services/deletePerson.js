const deletePerson = async (id) => {
  try {
    await fetch(`http://localhost:3001/persons/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default deletePerson;
