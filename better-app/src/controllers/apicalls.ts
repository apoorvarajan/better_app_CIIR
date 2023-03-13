const api = "https://goulburn.cs.umass.edu:9300" //https://cessnock.cs.umass.edu:9300
async function getTasks_api() {
    try {
      const response = await fetch(api+'/tasks');
      const data = await response.json();
      console.log(data)
      return data;
    } catch (err) {
      console.error(err);
      throw new Error('Error retrieving data');
    }
  }
  async function postTasks_api(body:any) {
      console.log(JSON.stringify(body))
    try {
      const response = await fetch(api+'/tasks',{
          'method':'POST',
          'body':JSON.stringify(body),
          'headers':{
            'Content-Type':'application/json'
          }
      });
      const data = await response.json();
      console.log(data)
      return data;
    } catch (err) {
      console.error(err);
      throw new Error('Error retrieving data');
    }
  }

  async function postRequest_api(body:any,taskNum:string) {
    console.log(JSON.stringify(body))
  try {
    const response = await fetch(api+'/tasks/'+taskNum+'/requests',{
        'method':'POST',
        'body':JSON.stringify(body),
        'headers':{
          'Content-Type':'application/json'
        }
    });
    const data = await response.json();
    console.log(data)
    return data;
  } catch (err) {
    console.error(err);
    throw new Error('Error retrieving data');
  }
}

  async function submission_api(taskNum:string,reqNum:string) {
    try {
        const reqBody = {
                            "taskNum":taskNum,
                            "reqNum":reqNum
                        }
        const response = await fetch(api+'/submissions',{
            'body':JSON.stringify(reqBody),
            'method':'POST',
            'headers':{
            'Content-Type':'application/json'
            }
        });
        const data = await response.json();
        console.log(data)
        return data;
    } catch (err) {
      console.error(err);
      throw new Error('Error retrieving data');
    }
  }
  

export {getTasks_api,postTasks_api,submission_api,postRequest_api}