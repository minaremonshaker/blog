const feildsMapping = (array, term) =>
  array.map((feild) => {
    return { [feild]: new RegExp(`^${term}`, "i") };
  });


  export default feildsMapping;