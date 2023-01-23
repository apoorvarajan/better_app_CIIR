async function getTasks_api() {
    try {
      const response = await fetch('https://cessnock.cs.umass.edu:9300/tasks');
      const data = await response.json();
      console.log(data)
      return data;
    } catch (err) {
      console.error(err);
      throw new Error('Error retrieving data');
    }
  }
  

export {getTasks_api}